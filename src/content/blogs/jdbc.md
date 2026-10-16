# JDBC from Scratch: How Java Actually Talks to a Database

When I started building apps with Spring Boot, database access felt like magic. Add a dependency, write a repository interface, and data just appears. But I wanted to know what happens underneath. I watched a video that builds the whole picture from zero using plain Java, Maven and MySQL, and this post is what I learned from the first part of it.

## The problem: two programs on two machines

A Java application runs on a **JVM**, usually on one server. Your database (MySQL, PostgreSQL, Oracle) runs as a separate program, often on a different server.

Those two programs need a structured way to talk: connect, send a query, and get results back. Every database has its own internal rules, so without a common standard you would have to rewrite your data-access code for each one.

## Enter JDBC

**JDBC (Java Database Connectivity)** is the standard API that solves this. It gives Java one consistent way to work with many relational databases. Your code talks to the JDBC interfaces, and it doesn't need to care which database sits behind them.

Think of JDBC as a universal power adapter. Your code always plugs into the same socket, and the adapter handles the differences.

## But who does the real work? The driver

JDBC itself is mostly a set of **interfaces**, which are contracts with no database-specific logic. The actual work is done by a **JDBC driver**.

A driver is a library from the database vendor (or community) that implements those interfaces for one specific database. For MySQL, that driver is **MySQL Connector/J**. When your code calls a JDBC method, the driver's implementation translates it into whatever MySQL understands.

So the flow looks like this:

```
Your Java code  →  JDBC API (interfaces)  →  JDBC Driver  →  Database
```

Switching databases mostly means swapping the driver and the connection details, not rewriting your application logic.

## Setting up the project

The video's setup is simple, and you can follow along:

1. **Create a Maven-based Java project.** Maven manages dependencies for you.
2. **Add the MySQL driver to `pom.xml`.** Maven downloads it and puts it on your classpath:

```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <version><!-- use the latest version --></version>
</dependency>
```

3. **Install MySQL Server.** This is the database your app will talk to.
4. **Install a GUI client such as DBeaver.** It lets you browse tables, run queries and check that your Java code actually changed something.

Once these pieces are in place, you have everything needed to connect.

## Why learn this before Spring Boot?

Spring Boot and Spring Data JPA hide a lot of this plumbing. That's great for productivity, but when something breaks (a connection failure, a driver mismatch, a strange SQL error) you debug much faster if you know what is going on underneath. Starting with plain JDBC means that when Spring later does it for you, you'll know what it's doing.

## What comes next

The part of the video I've covered ends at the setup. The rest moves into the hands-on material:

- **CRUD operations** (Create, Read, Update, Delete) with JDBC
- Working with the core objects: **`Connection`**, **`Statement`** and **`ResultSet`**
- Preventing **SQL injection** with **`PreparedStatement`**
- Managing resources cleanly with **try-with-resources**

I'll cover those in a follow-up post once I've worked through them.

## Key takeaways

- A Java app and its database are separate programs that need a standard way to communicate.
- **JDBC** is that standard: a common API for relational databases.
- A **JDBC driver** (like MySQL Connector/J) supplies the database-specific implementation behind the API.
- Setup is just Maven, a dependency in `pom.xml`, MySQL Server and a client like DBeaver.
- Knowing JDBC makes frameworks like Spring Boot much less mysterious.