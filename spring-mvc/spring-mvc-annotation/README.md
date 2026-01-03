 # spring-mvc-annotation

 This is annotation based migration for the https://github.com/devashish234073/migration-projects/tree/main/spring-mvc/spring-mvc-xml

 here are some of the changes done from xml to java

 ## XML → Java mapping

 | XML file (original) | Equivalent Java file(s) (annotation-based) |
 |---|---|
 | `applicationContext.xml` | `com.example.config.RootConfig.java` (component scanning for services/DAOs) |
 | `spring-security.xml` | `com.example.config.SecurityConfig.java` (SecurityFilterChain, in-memory users) |
 | `hibernate.cfg.xml` | `com.example.config.PersistenceConfig.java` (DataSource, SessionFactory, TransactionManager) |
 | `hibernate-mappings/User.hbm.xml` | `com.example.entity.User.java` (@Entity JPA mapping) |
 | `web.xml` (dispatcher/loader setup in XML) | `src/main/webapp/WEB-INF/web.xml` (updated to use AnnotationConfigWebApplicationContext) and `com.example.config.WebConfig.java` (Dispatcher servlet context) |
 | `applicationContext.xml` bean definitions for `UserDao`, `UserService` | Discovered via `@Repository` (`UserDao`) and `@Service` (`UserService`) plus `@ComponentScan` in `RootConfig` |

 ## Changes made to `web.xml`

 - Replaced XML-based context loading with an annotation-capable context:
   - Set `contextClass` to `org.springframework.web.context.support.AnnotationConfigWebApplicationContext` so the root context loads Java `@Configuration` classes instead of XML files.
   - Set the `contextConfigLocation` root param to `com.example.config.RootConfig` so the `ContextLoaderListener` initializes the root context from `RootConfig`.
 - Kept the `ContextLoaderListener` but it now boots an `AnnotationConfigWebApplicationContext`.
 - Kept `DelegatingFilterProxy` for Spring Security (`springSecurityFilterChain`) but the security filter chain is now defined in `com.example.config.SecurityConfig`.
 - Configured the `DispatcherServlet` to use `AnnotationConfigWebApplicationContext` by setting its `contextClass` init-param and pointing `contextConfigLocation` to `com.example.config.WebConfig` (the servlet-specific configuration).
 - As a result, all servlet and root beans are loaded from Java `@Configuration` classes instead of XML resource locations.

 ### Run with Maven
 ```bash
 mvn -U org.eclipse.jetty:jetty-maven-plugin:9.4.50.v20221201:run
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

 1. The project was migrated to use Java 11 target and modern libraries where appropriate.
 2. `RootConfig` uses `@ComponentScan` to discover `@Service`, `@Repository`, and other components.
 3. `SecurityConfig` provides the in-memory users and HTTP security rules.
 4. `PersistenceConfig` configures HikariCP, `LocalSessionFactoryBean`, and transaction manager for Hibernate.
