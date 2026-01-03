# Spring MVC Annotation Configuration

This project is a migration of the `spring-mvc-xml` application from XML-based configuration to annotation-based Java configuration.

## Overview

This is a fully functional Spring MVC application using:
- **Spring Framework 5.3.20**: Core framework
- **Spring MVC**: Web framework with annotation-based controllers
- **Spring Security 5.7.3**: Authentication and authorization
- **Hibernate 5.6.11**: ORM with JPA annotations
- **H2 Database**: In-memory relational database
- **HikariCP**: Connection pooling
- **JSP**: Server-side templating

## Key Configuration Changes

### 1. **Replaced XML with Java Configuration**

#### Old Approach (spring-mvc-xml):
- `applicationContext.xml`: Spring beans configuration
- `spring-security.xml`: Security configuration
- `hibernate.cfg.xml`: Hibernate settings
- `User.hbm.xml`: Entity mapping

#### New Approach (spring-mvc-annotation):
- `RootConfig.java`: Root application context configuration
- `WebConfig.java`: Web/Dispatcher servlet context configuration
- `PersistenceConfig.java`: Database and ORM configuration (DataSource, SessionFactory, TransactionManager)
- `SecurityConfig.java`: Spring Security configuration
- `User.java`: Entity with JPA/Hibernate annotations

### 2. **Web Configuration**

**web.xml changes:**
- Uses `AnnotationConfigWebApplicationContext` instead of default XMLWebApplicationContext
- References Java configuration classes instead of XML files:
  - Root Context: `com.example.config.RootConfig`
  - Dispatcher Servlet: `com.example.config.WebConfig`

### 3. **Spring Security Configuration**

**SecurityConfig.java** replaces `spring-security.xml`:
```java
- HTTP security rules (URL patterns, roles, authentication)
- Form login with custom login page
- Logout configuration
- CSRF disabled
- In-memory user authentication:
  - Admin: admin/admin123 (ROLE_ADMIN, ROLE_USER)
  - User: user/user123 (ROLE_USER)
```

### 4. **Database Configuration**

**PersistenceConfig.java** replaces `applicationContext.xml` and `hibernate.cfg.xml`:
```java
- HikariCP DataSource: H2 in-memory database
- LocalSessionFactoryBean: Scans com.example.entity package for @Entity classes
- Hibernate Properties: DDL generation, SQL logging, dialect
- HibernateTransactionManager: Transaction management
- @EnableTransactionManagement: Enables @Transactional annotation support
```

### 5. **Entity Mapping**

**User.java** uses JPA annotations instead of Hibernate mapping XML:
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "username", nullable = false)
    private String username;
    // ... more fields
}
```

### 6. **Dependency Injection**

All classes now use `@Autowired` annotation for dependency injection:
- `HomeController`: Injects `UserService`
- `UserService`: Injects `UserDao`
- `UserDao`: Injects `SessionFactory`
- `PersistenceConfig`: Receives `DataSource` as parameter

### 7. **Stereotype Annotations**

- `@Controller`: HomeController
- `@Service`: UserService
- `@Repository`: UserDao
- `@Configuration`: RootConfig, WebConfig, PersistenceConfig, SecurityConfig

## Project Structure

```
spring-mvc-annotation/
├── src/main/
│   ├── java/com/example/
│   │   ├── config/
│   │   │   ├── RootConfig.java
│   │   │   ├── WebConfig.java
│   │   │   ├── PersistenceConfig.java
│   │   │   └── SecurityConfig.java
│   │   ├── controller/
│   │   │   └── HomeController.java
│   │   ├── service/
│   │   │   └── UserService.java
│   │   ├── dao/
│   │   │   └── UserDao.java
│   │   └── entity/
│   │       └── User.java
│   ├── webapp/
│   │   └── WEB-INF/
│   │       ├── web.xml
│   │       └── views/
│   │           ├── index.jsp
│   │           ├── dashboard.jsp
│   │           └── login.jsp
│   └── resources/
├── pom.xml
└── README.md
```

## Building and Running

### Prerequisites
- JDK 11+
- Maven 3.6+

### Build
```bash
mvn clean compile
```

### Package as WAR
```bash
mvn clean package
```

### Run with Maven
```bash
mvn tomcat9:run
```

The application will be available at: `http://localhost:8080`

## Application Features

1. **Home Page** (`/`): Displays welcome message and list of users with form to create new users
2. **Dashboard** (`/dashboard`): Secured page showing all users (requires authentication)
3. **Login** (`/login`): Public login page with form
4. **Create User** (`/createUser`): Form submission to create new users in database

## Authentication

Default users (in-memory):
- **Admin**: Username: `admin` | Password: `admin123` | Roles: ADMIN, USER
- **User**: Username: `user` | Password: `user123` | Roles: USER

## Database

- **Type**: H2 (in-memory)
- **Connection URL**: `jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE`
- **DDL**: Auto-created on startup (`hibernate.hbm2ddl.auto=create-drop`)
- **Table**: `users` with columns: id, username, email, password

## Dependencies

Key dependencies defined in `pom.xml`:
- `spring-core`, `spring-context`, `spring-web`, `spring-webmvc`, `spring-orm`: Spring Framework
- `spring-security-core`, `spring-security-web`, `spring-security-config`: Spring Security
- `hibernate-core`: Hibernate ORM
- `javax.persistence-api`: JPA API
- `com.h2database:h2`: H2 Database
- `com.zaxxer:HikariCP`: Connection pooling
- `javax.servlet:javax.servlet-api`, `javax.servlet.jsp:javax.servlet.jsp-api`: Servlet/JSP API
- `javax.servlet:jstl`: JSTL for JSP
- `org.slf4j:slf4j-api`, `org.slf4j:slf4j-simple`: Logging

## Migration Summary

| Aspect | Old (XML) | New (Annotation) |
|--------|-----------|------------------|
| Context Loading | XML files | Java configuration classes |
| Servlet Config | DispatcherServlet init-param with XML | DispatcherServlet init-param with Java class |
| Bean Definition | `<bean>` elements in XML | `@Bean` methods in `@Configuration` classes |
| Component Scanning | `<context:component-scan>` | `@ComponentScan` annotation |
| Transaction Management | `<tx:annotation-driven>` | `@EnableTransactionManagement` |
| Security Config | `<security:*>` XML elements | SecurityFilterChain bean with `HttpSecurity` |
| Entity Mapping | Hibernate XML files | JPA annotations in Java |
| Dependency Injection | Setter injection via `<property>` | `@Autowired` constructor/field injection |
| MVC Config | `<mvc:annotation-driven>` | `@EnableWebMvc` |

## Notes

1. The application uses Java 11 as the target version (compiler source and target)
2. HikariCP is used instead of Apache Commons DBCP for better performance
3. Spring Security 5.7.3 uses the new `SecurityFilterChain` bean approach
4. The application maintains full feature parity with the XML-based version
5. No XML configuration files are used in the application classpath
