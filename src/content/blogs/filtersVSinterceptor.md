# Filters vs Interceptors in Spring Boot: The Gate and the Reception Desk

![](blogImage/springConcept01.png)

Every Spring Boot developer hits the same moment. You write a logging line in one controller. Then you paste it into a second one. By the fifth endpoint you are copy-pasting `checkAuthToken(request)` like it's a personality trait.

There's a better way. Spring gives you two tools for running code around your controllers: **Filters** and **Interceptors**. They look similar, they solve similar problems, and people mix them up constantly. Let's fix that.

---

## The problem they both solve

Some logic doesn't belong in your controllers, but it needs to run for many of them:

- logging every request
- checking authentication
- measuring how long an API call takes
- adding headers, handling encoding, and so on

This kind of logic is called a **cross-cutting concern**. Filters and interceptors let you write it once and apply it everywhere.

The difference is **where** in the request journey they sit, and that changes what each one can do.

---

## The request's journey

Here's what happens when a request hits your Spring Boot app:

```
Client -> Filter -> DispatcherServlet -> Interceptor -> Controller
```

And on the way back, it unwinds in reverse. Filters live **before** Spring MVC even wakes up. Interceptors live **inside** Spring MVC, after it has figured out which controller method will handle the request.

Think of a building:

- The **Filter** is the security guard at the **front gate**. They see everyone who arrives, but they have no idea which office you're visiting.
- The **Interceptor** is the **reception desk inside**. By then, someone has already worked out which room you're heading to, so the desk knows exactly where you're going and can act on that.

Hold onto this picture. Every difference below comes from it.

---

## What is a Filter?

A **Filter** is part of the **Servlet specification**, not Spring itself. It wraps the request before it reaches the `DispatcherServlet`.

It has one method, `doFilter()`. You run code before calling `chain.doFilter(...)` to pass the request along, and code after it to handle the response on the way back.

```java
@Component
public class RequestIdFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws ServletException, IOException {

        response.setHeader("X-Request-Id", UUID.randomUUID().toString());
        chain.doFilter(request, response); // pass it on
    }
}
```

Spring Boot registers any `Filter` bean automatically. Extending `OncePerRequestFilter` guarantees it runs once per request.

**Filters are great at:**

- CORS, character encoding, compression
- Security (Spring Security is itself a chain of filters)
- Wrapping the request or response (`HttpServletRequestWrapper`), for example to read a body twice
- Anything that must apply to *every* request, including ones that never reach a controller

**Filters can't:**

- Tell which controller method will handle the request
- Read annotations on that method
- Touch the `ModelAndView`

The guard at the gate doesn't know which room you want.

---

## What is an Interceptor?

An **Interceptor** belongs to **Spring MVC**. It runs after the `DispatcherServlet` has mapped the request to a handler, and it gives you **three hooks** instead of one:

| Hook | When it runs |
|---|---|
| `preHandle()` | Before the controller method. Return `false` to stop the request. |
| `postHandle()` | After the controller, before the view is rendered. |
| `afterCompletion()` | After everything is done. Runs even if something blew up. |

```java
@Component
public class TimingInterceptor implements HandlerInterceptor {

    private static final Logger log = LoggerFactory.getLogger(TimingInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) {
        request.setAttribute("start", System.currentTimeMillis());
        return true; // let the request continue
    }

    @Override
    public void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response,
                                Object handler,
                                Exception ex) {
        long took = System.currentTimeMillis() - (Long) request.getAttribute("start");

        if (handler instanceof HandlerMethod hm) {
            log.info("{}.{}() took {} ms",
                    hm.getBeanType().getSimpleName(), hm.getMethod().getName(), took);
        }
    }
}
```

Creating the class isn't enough. You must register it:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final TimingInterceptor timingInterceptor;

    public WebConfig(TimingInterceptor timingInterceptor) {
        this.timingInterceptor = timingInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(timingInterceptor)
                .addPathPatterns("/api/**")
                .excludePathPatterns("/api/public/**");
    }
}
```

Notice the log line names the exact controller and method. A filter could never do that. That's the reception desk knowing which room you're going to.

**Interceptors are great at:**

- Timing specific API calls
- Authorization based on **annotations on controller methods** (for example a custom `@RequireRole("ADMIN")`)
- Controller-aware logging
- Fine-grained URL rules with `addPathPatterns()` and `excludePathPatterns()`

**Interceptors can't:**

- Run for requests that never reach `DispatcherServlet`
- Swap out the request or response objects for wrapped versions

---

## Side by side

| | **Filter** | **Interceptor** |
|---|---|---|
| Belongs to | Servlet spec | Spring MVC |
| Runs | Before `DispatcherServlet` | After the handler is mapped |
| Knows the target controller | No | Yes (`HandlerMethod`) |
| Hooks | `doFilter()` | `preHandle`, `postHandle`, `afterCompletion` |
| Can wrap request/response | Yes | No |
| Errors handled by `@ControllerAdvice` | No | Yes |
| Registered via | `@Component`, `FilterRegistrationBean` | `WebMvcConfigurer.addInterceptors()` |
| Best for | Global, infrastructure-level work | Controller-specific logic |

That `@ControllerAdvice` row is a sneaky one. If your filter throws an exception, your nice global exception handler never sees it, because the request never made it into Spring MVC. An exception thrown from an interceptor is handled normally.

---

## So which one should you use?

Ask one question: **does this logic need to know which controller method is being called?**

- **No, and it applies to everything** (CORS, encoding, security, request wrapping): use a **Filter**.
- **Yes, or it's specific to your API layer** (timing endpoints, role checks via annotations, per-controller logging): use an **Interceptor**.

And you don't have to pick one. Real apps use both. A typical setup has Spring Security's filters at the gate, and a small logging and timing interceptor at the reception desk.

---

## Mistakes to avoid

1. **Forgetting to register the interceptor.** No `addInterceptors()`, no execution, and no error message either.
2. **Returning `false` without writing a response.** The client gets an empty reply. Set the status and body yourself first.
3. **Storing per-request data in a field.** Both are singletons shared across requests. Use `request.setAttribute()`.
4. **Casting `handler` to `HandlerMethod` blindly.** Check `instanceof` first, since static resources use a different handler type.
5. **Doing timing in `postHandle()`.** It's skipped when the controller throws. Use `afterCompletion()`.
6. **Rolling your own auth in production.** Interceptor-based auth is fine for learning and small projects. For real apps, use Spring Security.

---

## The takeaway

> **Filter = infrastructure for every request. Interceptor = Spring MVC logic that needs to know where the request is going.**

Filters guard the gate, interceptors run the reception desk, and your controllers get to do what they were meant to do: handle business logic without a wall of copy-pasted boilerplate.

If you found yourself pasting the same three lines into a fourth controller, this is your sign.