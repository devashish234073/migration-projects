# spring-mvc-xml

This repository contains a Spring MVC application configured using XML files (Spring, Spring Security, and Hibernate XML configuration). The README below lists the project's contents, run instructions, features, auth details, database, and dependencies.

## Contents

| Path | Description |
|---|---|
| `pom.xml` | Maven build file and plugin configuration |
| `src/main/webapp/WEB-INF/web.xml` | Web application deployment descriptor and servlet/filter setup |
| `src/main/resources/applicationContext.xml` | Spring application context: component-scan, view resolver, datasource, beans |
| `src/main/resources/spring-security.xml` | Spring Security configuration: http rules and in-memory users |
| `src/main/resources/hibernate.cfg.xml` | Hibernate configuration for database connection and properties |
| `src/main/resources/hibernate-mappings/User.hbm.xml` | Hibernate XML mapping for `com.example.entity.User` |
| `src/main/java/com/example/controller/HomeController.java` | MVC controller handling web requests |
| `src/main/java/com/example/service/UserService.java` | Service layer with transaction support |
| `src/main/java/com/example/dao/UserDao.java` | DAO using Hibernate SessionFactory |
| `src/main/java/com/example/entity/User.java` | Domain model class for users |
| `src/main/webapp/WEB-INF/views/index.jsp` | Home page JSP |
| `src/main/webapp/WEB-INF/views/dashboard.jsp` | Dashboard JSP (secure) |
| `src/main/webapp/WEB-INF/views/login.jsp` | Login page JSP |

## Run with Maven
```bash
mvn -U org.apache.tomcat.maven:tomcat9-maven-plugin:2.3:run
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
- **DDL**: Auto-created on startup (`hbm2ddl.auto` / `hibernate.hbm2ddl.auto` configured as `create-drop`)
- **Table**: `users` with columns: id, username, email, password

## Dependencies

Key dependencies (see `pom.xml`):
- Spring Framework: `spring-core`, `spring-context`, `spring-web`, `spring-webmvc`, `spring-orm`
- Spring Security: `spring-security-core`, `spring-security-web`, `spring-security-config`
- Hibernate: `hibernate-core`
- H2 Database: `com.h2database:h2`
- Connection pool: `commons-dbcp` (or other as configured in `applicationContext.xml`)
- Servlet/JSP: `javax.servlet-api`, `javax.servlet.jsp-api`, `jstl`
- Logging: `slf4j`

## Notes

- All application wiring (beans, security, ORM) is performed via the XML configuration files listed above.
- To change server/plugin behavior, edit `pom.xml` plugin configuration.