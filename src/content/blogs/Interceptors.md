# Securing a Spring Boot API with Interceptors: Logging, Authentication and Authorization in the Right Order

When you build your first REST API, security tends to arrive late. Endpoints work, the React frontend talks to them, and then you realize anyone can call anything. Spring Security is the standard answer, but building the checks yourself with interceptors is one of the best ways to understand what it does for you.

This post walks through a three-interceptor chain (logging, authentication, authorization), the mistakes that make it insecure, and how to fix each one.

## The big picture

Every request passes through a chain of checkpoints before it reaches your controller:

```
Request → Logging → Authentication → Authorization → Controller
```

Each checkpoint answers one question:

| Checkpoint | Question | Failure response |
|---|---|---|
| Logging | What request came in? | never blocks |
| Authentication | Who are you? Is your token valid? | `401 Unauthorized` |
| Authorization | Are you allowed to do this? | `403 Forbidden` |

Authentication and authorization are different things. Authentication proves identity. Authorization decides what that identity may do. Mixing them up is the most common source of confusion.

## Registering the chain

In Spring MVC, interceptors are registered in a class that implements `WebMvcConfigurer`:

```java
registry.addInterceptor(authenticationInterceptor)
        .addPathPatterns("/**")
        .excludePathPatterns(PUBLIC_ENDPOINTS)
        .order(2);
```

- `addInterceptor` registers the interceptor.
- `addPathPatterns` says which URLs it runs for. `/**` means every URL, at any depth.
- `excludePathPatterns` says which URLs to skip. Excludes win over includes.
- `order` sets the position in the chain. Lower numbers run first.

If an interceptor's `preHandle` returns `false`, the chain stops and nothing after it runs. That's what makes the order matter.

## Why this order

**Logging first.** If authentication rejects a request, later interceptors never run. Putting logging at order 1 means blocked requests still get recorded, and those are the ones you most want to see.

**Authentication before authorization.** Authorization needs to know who the user is. Authentication verifies the token and stores the identity on the request, and authorization reads it from there. Reverse them and authorization has nobody to check.

## The full configuration

```java
@Configuration
public class WebConfig implements WebMvcConfigurer
{
    private static final String[] PUBLIC_ENDPOINTS = {
        "/api/auth/login",
        "/api/auth/register",
        "/policy/**",
        "/error"
    };

    private final LoggingInterceptor loggingInterceptor;
    private final AuthenticationInterceptor authenticationInterceptor;
    private final AuthorizationInterceptor authorizationInterceptor;

    public WebConfig(LoggingInterceptor loggingInterceptor,
                     AuthenticationInterceptor authenticationInterceptor,
                     AuthorizationInterceptor authorizationInterceptor)
    {
        this.loggingInterceptor = loggingInterceptor;
        this.authenticationInterceptor = authenticationInterceptor;
        this.authorizationInterceptor = authorizationInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry)
    {
        registry.addInterceptor(loggingInterceptor)
                .addPathPatterns("/**")
                .order(1);

        registry.addInterceptor(authenticationInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns(PUBLIC_ENDPOINTS)
                .order(2);

        registry.addInterceptor(authorizationInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns(PUBLIC_ENDPOINTS)
                .order(3);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry)
    {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "https://your-frontend.vercel.app")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("Authorization", "Content-Type")
                .maxAge(3600);
    }
}
```

## Four mistakes that make this insecure

### 1. Protecting only `/api/**`

If you only apply authentication to `/api/**`, anything outside it is open by default. Add `/admin/reports` next month and it has no protection. Instead, apply the interceptors to `/**` and exclude only what must be public. This is called **default deny**: forgetting to protect something locks it instead of exposing it.

### 2. Forgetting login and register in the exclude list

A user logging in doesn't have a token yet. If `/api/auth/login` isn't excluded, the authentication interceptor demands a token from someone trying to get one, and nobody can log in.

### 3. Wildcard public paths

`/api/public/**` is convenient, but everything you ever put under it becomes public. List exact endpoints instead.

### 4. Blocking CORS preflight requests

With a React frontend on a different origin, the browser sends an `OPTIONS` preflight request with no token before many API calls. If your authentication interceptor rejects it, the frontend fails with a confusing CORS error. Let `OPTIONS` through and configure CORS with your real origins, never `*`.

## The authentication interceptor

```java
@Component
public class AuthenticationInterceptor implements HandlerInterceptor
{
    private final JwtService jwtService;

    public AuthenticationInterceptor(JwtService jwtService)
    {
        this.jwtService = jwtService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException
    {
        if (HttpMethod.OPTIONS.matches(request.getMethod()))
        {
            return true; // CORS preflight carries no token
        }

        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer "))
        {
            return reject(response, 401, "Missing token");
        }

        try
        {
            AuthUser user = jwtService.verify(header.substring(7)); // checks signature and expiry
            request.setAttribute("authUser", user);
            return true;
        }
        catch (Exception e)
        {
            return reject(response, 401, "Invalid or expired token");
        }
    }

    private boolean reject(HttpServletResponse response, int status, String message) throws IOException
    {
        response.setStatus(status);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\":\"" + message + "\"}");
        return false; // forgetting this is the classic mistake
    }
}
```

The `return false` is what stops the request. Set the status without returning `false` and the request still reaches your controller.

## The authorization interceptor

```java
@Component
public class AuthorizationInterceptor implements HandlerInterceptor
{
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException
    {
        if (HttpMethod.OPTIONS.matches(request.getMethod()))
        {
            return true;
        }

        AuthUser user = (AuthUser) request.getAttribute("authUser");
        if (user == null)
        {
            return reject(response, 401, "Not authenticated"); // fail closed
        }

        if (request.getRequestURI().startsWith("/api/admin/") && !"ADMIN".equals(user.getRole()))
        {
            return reject(response, 403, "Forbidden");
        }

        return true;
    }

    private boolean reject(HttpServletResponse response, int status, String message) throws IOException
    {
        response.setStatus(status);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\":\"" + message + "\"}");
        return false;
    }
}
```

Two rules matter here. The role must come from the **verified token** (or your database), never from a header or query parameter the client controls. And the `user == null` check makes the interceptor fail closed if authentication is ever skipped by mistake.

## What the login phase should check

Login is not an interceptor's job. It belongs in a controller, and its only purpose is to prove who the user is and hand back a token:

1. Email and password are present and well-formed.
2. The user exists.
3. The password matches, compared with BCrypt (`passwordEncoder.matches`), never as plain text.
4. The account is enabled and not locked.
5. Failed attempts are limited, with rate limiting or temporary lockouts.

If any step fails, return `401` with **one generic message** such as "Invalid email or password". Never reveal which part failed, or attackers can discover which emails have accounts.

Login doesn't decide which endpoints a user can access. That happens on every later request, through the interceptor chain.

## Test it

Check each of these with Postman or curl:

| Test | Expected |
|---|---|
| `POST /api/auth/login`, no token | reaches the controller, returns a token |
| `GET /api/tasks`, no token | `401` |
| `GET /api/tasks`, expired or edited token | `401` |
| `GET /api/admin/users`, normal user's token | `403` |
| `GET /api/admin/users`, admin's token | `200` |
| `GET /admin/anything`, no token | `401` (default deny works outside `/api`) |
| React app calling the API from a browser | no CORS error |

## What interceptors can't do

Interceptors only decide where checks run. Some things they can't cover:

- **Ownership checks.** A logged-in user calling `/api/users/7/tasks` must not see user 7's tasks unless they are user 7. Role checks won't catch this, so it belongs in your service layer. Skipping it is one of the most common security holes (IDOR).
- **Log hygiene.** Never log passwords, tokens or the `Authorization` header.
- **Rate limiting.** Login and register are the first endpoints attackers hit, so protect them with something like Bucket4j.

## Interceptors vs Spring Security

For learning and small projects, this setup works once the fixes above are in. For production, use **Spring Security**. Interceptors run late, inside Spring MVC, so they don't give you CSRF protection, security headers, brute-force protection or battle-tested JWT handling. Its `permitAll()` list works like your exclude list, and its filter chain is the same idea as your interceptor chain. After building it by hand, Spring Security stops looking like magic.

## Key takeaways

- Order the chain as logging, authentication, authorization.
- Default deny: protect `/**`, exclude only exact public endpoints.
- Authentication returns `401` and authorization returns `403`. Always `return false` when rejecting.
- Login and register must be public. Everything else needs a valid token.
- Take roles from the verified token, never from client input.
- Handle CORS preflight (`OPTIONS`) explicitly.
- Check data ownership in your services.