# Spring AOP Pointcuts Explained: Choosing *Where* Your Aspect Runs

When I first learned Spring AOP, advice felt easy: write a method, add `@Before`, done. The part that confused me was the string inside the annotation:

```java
@Before("execution(* in.strikes.aopDemo.service.StudentService.*Student(*))")
```

That string is a **pointcut expression**. It answers one question: *which methods should this aspect intercept?* If advice is the "what" and "when", the pointcut is the "where". In this post I'll break it down piece by piece and then use it on a real-life example.

---

## The real-life problem

Imagine an online shop with an `OrderService`:

```java
@Service
public class OrderService {
    public Order placeOrder(Order order) { ... }
    public Order cancelOrder(Long orderId) { ... }
    public Order findById(Long orderId) { ... }
}
```

Your manager asks: *"Log every time an order is placed or cancelled, so we can debug customer complaints."*

You could add `log.info(...)` inside every method. But then logging is mixed into business code, you will forget it in new methods, and changing the log format means editing everything. This is a **cross-cutting concern**, which is exactly what AOP is for.

---

## Setup

Add the AOP starter:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

Then create an aspect. It must be a Spring bean, so it needs `@Component` as well as `@Aspect`:

```java
@Component
@Aspect
public class LoggingAspect {

    @Before("execution(* com.shop.service.OrderService.*(..))")
    public void logBeforeMethod() {
        System.out.println("Method Intercepted");
    }
}
```

Now every method in `OrderService` is intercepted. Let's decode that expression.

---

## Anatomy of `execution()`

`execution()` is the most commonly used pointcut designator. Its shape is:

```
execution(modifiers? return-type declaring-type? method-name(parameters) throws?)
```

Parts marked `?` are optional. Here is the earlier expression split up:

| Part | Example | Meaning |
|------|---------|---------|
| Return type | `*` | any return type |
| Class path | `com.shop.service.OrderService` | the exact class |
| Method name | `placeOrder` | the exact method |
| Parameters | `(com.shop.dto.Order)` | exactly one `Order` argument |

An exact expression looks like this:

```java
@Before("execution(com.shop.dto.Order com.shop.service.OrderService.placeOrder(com.shop.dto.Order))")
```

It works, but it is long and matches only one method. Wildcards fix that.

---

## Wildcards: `*` and `..`

Two symbols do most of the work.

**`*`** matches exactly one element: any return type, any part of a name, or any single parameter.

**`..`** matches zero or more elements: any number of parameters, or any number of sub-packages.

| Expression | What it matches |
|-----------|-----------------|
| `execution(* com.shop.service.OrderService.*(..))` | every method in `OrderService` |
| `execution(* com.shop.service.*.*(..))` | every method of every class in the `service` package |
| `execution(* com.shop.service..*.*(..))` | the same, including sub-packages |
| `execution(* com.shop.service.OrderService.*Order(*))` | methods ending in `Order` (`placeOrder`, `cancelOrder`) that take exactly one argument of any type |
| `execution(* com.shop.service.OrderService.get*(..))` | methods starting with `get` |
| `execution(Order com.shop.service.OrderService.*(..))` | methods that return `Order` |

The fourth row is the same pattern as the one in the video's `*Student(*)` example: it matches by *naming convention*. If your team names methods consistently, one pattern covers many methods.

---

## Solving the shop problem

We only want to log placing and cancelling, not reads:

```java
@Component
@Aspect
public class OrderAuditAspect {

    @Before("execution(* com.shop.service.OrderService.*Order(*))")
    public void auditOrderChange(JoinPoint joinPoint) {
        System.out.println("Order action: " + joinPoint.getSignature().getName()
                + " with args " + Arrays.toString(joinPoint.getArgs()));
    }
}
```

When someone calls `placeOrder(order)`, the console prints:

```
Order action: placeOrder with args [Order{id=42, ...}]
```

`findById(...)` doesn't end in `Order`, so reads stay quiet. We changed no business code. (This is also why consistent naming matters: a read method called `getOrder` would have been caught by this pattern too.)

---

## Combining pointcuts

You can combine expressions with `&&`, `||` and `!`:

```java
// all service methods EXCEPT getters
@Before("execution(* com.shop.service.*.*(..)) && !execution(* com.shop.service.*.get*(..))")
```

For anything you reuse, name it with `@Pointcut`:

```java
@Aspect
@Component
public class ShopPointcuts {

    @Pointcut("execution(* com.shop.service.*.*(..))")
    public void allServiceMethods() {}

    @Pointcut("execution(* com.shop.service.*.get*(..))")
    public void getters() {}

    @Pointcut("allServiceMethods() && !getters()")
    public void writeOperations() {}
}
```

Advice can then reference `@Before("ShopPointcuts.writeOperations()")`. Your intent becomes readable, and you change the pattern in one place.

---

## Other designators worth knowing

- **`within(com.shop.service.*)`** matches by class or package, with no method detail.
- **`@annotation(com.shop.annotation.Audited)`** matches any method carrying your own annotation. This is often the cleanest approach: annotate the methods you care about and skip fragile name patterns.

```java
@Before("@annotation(com.shop.annotation.Audited)")
public void audit(JoinPoint jp) { ... }
```

---

## Pitfalls to watch for

1. **Too-broad patterns cause errors.** Something like `execution(* *(..))` targets every bean, including classes Spring can't proxy (for example `final` classes), and the app can fail at startup with proxy creation errors. Always scope to your own package.
2. **Only Spring beans are intercepted.** Objects created with `new` are invisible to AOP.
3. **Self-invocation is not intercepted.** If `placeOrder()` calls `this.cancelOrder()`, the call bypasses the proxy, so the aspect doesn't run for it.
4. **Spring AOP targets method execution on beans.** It doesn't intercept field access or constructors the way full AspectJ can.
5. **Typos fail quietly.** A pattern that matches nothing raises no error. If your advice never fires, check the package name first.

---

## Quick cheat sheet

```
execution(* com.shop.service.*.*(..))      → all methods in a package
execution(* *..OrderService.*(..))         → OrderService in any package
execution(* *.get*(..))                    → name starts with "get"
execution(* *.*(*))                        → exactly one argument
execution(* *.*(..))                       → any arguments
within(com.shop.service..*)                → everything under a package
@annotation(Audited)                       → methods with your annotation
```

---

## Wrapping up

A pointcut is a filter over your application's methods. Start with exact signatures to understand the pieces, then generalize with `*` and `..`, name the useful ones with `@Pointcut`, and reach for `@annotation` when naming conventions get fragile. Keep patterns narrow, because a pointcut that matches too much is as problematic as one that matches nothing.

In the next post, I'll look at the different advice types (`@Around`, `@After`, `@AfterReturning`) and how to measure method execution time.