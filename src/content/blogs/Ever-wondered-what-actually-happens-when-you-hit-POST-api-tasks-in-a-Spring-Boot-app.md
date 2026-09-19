

## Introduction

Ever wondered what actually happens between the moment a client sends a request and the moment it gets a response? I traced one request from start to finish, and the biggest surprise was that Spring MVC isn't a straight line. It's a hub, and every step is a two-way conversation.

## The Request

Our visitor knocks on the door with this:

```http
POST /api/tasks
Host: localhost:8080

{
  "id": 1,
  "name": "Learn Spring MVC"
}
```


## The Journey

### 1. Tomcat, the Gatekeeper 🏰
Tomcat is the embedded server listening on port 8080. It receives the raw HTTP request and passes it to the manager.

### 2. DispatcherServlet, the Manager 🧭
`DispatcherServlet` is the front controller, and every request goes through it. What surprised me is that it never does the work itself. It calls the right components one by one, and each of them reports back to it. Every arrow in the flow is two-way: a call goes out, a result comes back.

### 3. HandlerMapping, the Map 🗺️
`DispatcherServlet` asks, "Who handles `POST /api/tasks`?" `HandlerMapping` answers with the right controller method.

### 4. `preHandle()`, the Checkpoint 🛂
Before the controller runs, the interceptor's `preHandle()` gets a chance to act. It's the place for authentication checks and logging. It answers "go ahead", or returns `false`, which stops the request right there.

### 5. HandlerAdapter and Controller, the Translator and the Worker 🔌🎯
`HandlerAdapter` turns the JSON body into a Java object and calls the Controller. The Controller does the real work of creating the task, and the result travels back up the chain to `DispatcherServlet`.

### 6. `postHandle()`, the Follow-up 📝
Once the controller finishes, `postHandle()` looks over the result. It's skipped if the controller throws an exception.

### 7. `afterCompletion()`, the Cleanup 🧹
This one always runs, even after an error. It's the place for cleanup and final logging.

### 8. The Return Trip 🔙
`DispatcherServlet` hands the response to Tomcat, and Tomcat carries it back to the client.

## The Flow at a Glance

```
Client ⇄ Tomcat ⇄ DispatcherServlet ⇄ 1. HandlerMapping
                                    ⇄ 2. preHandle()
                                    ⇄ 3. HandlerAdapter ⇄ Controller
                                    ⇄ 4. postHandle()
                                    ⇄ 5. afterCompletion()
```

`⇄` means a call goes out and a result comes back.

## Key Takeaways

- `DispatcherServlet` is the hub, so every request goes through it.
- Every step is a two-way conversation: the manager calls and the helper answers.
- Interceptors guard both sides of the controller with `preHandle()`, `postHandle()`, and `afterCompletion()`.
- `HandlerAdapter` is the translator that turns JSON into a Java object and calls the controller.
- Every component has exactly one job, and knowing the order makes debugging much easier.

## Conclusion

Spring MVC looks like magic until you follow one request through it. Once you see the hub and its two-way conversations, the framework becomes far easier to reason about. I'm still learning Spring Boot, one layer at a time. 🚀

**Which part of this flow surprised you the most? Let me know in the comments.**

`#SpringBoot` `#Java` `#SpringMVC` `#BackendDevelopment` `#LearningInPublic` `#WebDevelopment`
