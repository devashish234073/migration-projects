package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Spring Security Configuration with Java Annotations
 * Replaces the XML configuration from spring-security.xml
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Configure HTTP Security
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Authorization configuration
            .authorizeRequests()
                .antMatchers("/login", "/resources/**").permitAll()
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/user/**").hasRole("USER")
                .anyRequest().authenticated()
                .and()
            // Form login configuration
            .formLogin()
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard")
                .and()
            // Logout configuration
            .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login")
                .and()
            // CSRF disabled (same as XML configuration)
            .csrf().disable();
        
        return http.build();
    }

    /**
     * Configure in-memory user details service
     * Admin: admin / admin123 (ROLE_ADMIN, ROLE_USER)
     * User: user / user123 (ROLE_USER)
     */
    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails admin = User.builder()
            .username("admin")
            .password("admin123")
            .roles("ADMIN", "USER")
            .build();

        UserDetails user = User.builder()
            .username("user")
            .password("user123")
            .roles("USER")
            .build();

        return new InMemoryUserDetailsManager(admin, user);
    }

    /**
     * Configure password encoder (using NoOp encoder to match XML configuration)
     * Note: In production, use BCryptPasswordEncoder or similar
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }
}
