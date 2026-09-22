# Using the Decorator Pattern to Keep Infra Logic Out of My Service Layer

When I was building the student management feature for one of my Spring Boot projects, I ran into a familiar problem: my `StudentServiceImpl` was supposed to hold pure business logic, but it kept accumulating "infrastructure" concerns too — logging, caching, auditing, validation glue, that sort of thing. Every time I added one of these, `StudentServiceImpl` got a little messier and a little harder to test.

The fix I landed on was the **Decorator pattern**, and it turned out to be one of those small design decisions that made the rest of the codebase noticeably cleaner.

## The problem

Here's roughly what the call chain looked like before:

```
StudentController → StudentServiceImpl (business logic + infra logic, mixed together)
```

Every `create`, `update`, or `delete` method in `StudentServiceImpl` had to do two jobs at once: the actual domain work (validating a student, saving it, whatever), and the surrounding infra work (logging that it happened, maybe checking a cache, maybe recording an audit entry). That mixing is exactly what the Single Responsibility Principle warns you about — and it made the class harder to reason about and harder to unit test in isolation.

## The pattern

The Decorator pattern solves this by wrapping the real implementation in another object that implements the *same interface*, intercepts the calls, does its own work, and then delegates to the wrapped object for the actual logic. Here's the shape of it:

- **`StudentService`** — the interface. Both the real implementation and the decorator depend on this, not on each other.
- **`StudentServiceImpl`** — the "main object." This is where the real business logic lives, and nothing else.
- **`Decorator`** — implements `StudentService` (an **is-a** relationship), and internally holds a reference to a `StudentService` (a **has-a** relationship — in this case, pointing at `StudentServiceImpl`).
- **`StudentController`** — never talks to `StudentServiceImpl` directly. It only ever calls `studentService.createStudent()` against the interface, so it has no idea whether it's hitting the decorator or the raw implementation.

```
StudentController --calls--> StudentService (interface)
                                   ^                 ^
                                   |                 |
                              inherits           inherits
                                   |                 |
                              Decorator ---has-a---> StudentServiceImpl (main object)
```

The key insight is that the controller is decoupled from *which* concrete class actually runs. As far as it's concerned, it's just calling a method on `StudentService`. Whether that call goes straight into `StudentServiceImpl` or gets intercepted first is an implementation detail hidden behind the interface.

## What the decorator actually does

The decorator's method looks something like this:

```java
public class StudentServiceDecorator implements StudentService {

    private final StudentService wrapped; // has-a StudentServiceImpl

    public StudentServiceDecorator(StudentService wrapped) {
        this.wrapped = wrapped;
    }

    @Override
    public Student createStudent(StudentDto dto) {
        // infra logic — logging, auditing, caching, whatever's needed
        return wrapped.createStudent(dto); // delegate to the real logic
    }
}
```

That `// infra logic` comment is doing a lot of work. It's the whole point of the pattern: everything that *isn't* core business logic gets pulled out into this wrapper, while `StudentServiceImpl` stays focused purely on the "what," not the "how it's observed or supported."

## Why this was worth it

A few concrete wins came out of this refactor:

- **`StudentServiceImpl` stayed lean.** It only ever changes when the actual business rules change — not when I want to add a log line or tweak caching behavior.
- **Infra logic became composable.** Since the decorator is just another `StudentService`, I can stack decorators (logging decorator wrapping a caching decorator wrapping the real impl) without touching the core class at all.
- **Testing got easier.** I can unit test `StudentServiceImpl` with zero mocking of infra concerns, and separately test the decorator's behavior in isolation.
- **The controller didn't change at all.** Because everything routes through the `StudentService` interface, swapping in a decorator was a wiring change (in the Spring config / bean setup), not a rewrite.

## Where this pattern fits

The Decorator pattern is a good match any time you want to *add* responsibilities to an object without touching its class definition or violating the open/closed principle. Classic use cases: logging, caching, rate limiting, access control checks, retry logic — anything that "wraps around" a core behavior rather than being part of it.

It's not the right tool if the added behavior is actually core business logic — in that case it just belongs in the implementation itself. The test I use: if I'd still want this behavior even if the underlying implementation were swapped out entirely, it probably belongs in a decorator.

---

*This pattern is a small piece of a larger refactor I'm doing across my Spring Boot services — happy to write up the rest of the setup (bean wiring, stacking multiple decorators) if that'd be useful.*