package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 * Root Application Context Configuration
 * This configuration is loaded by the ContextLoaderListener and creates beans
 * that are shared across the entire application (services, DAOs, etc.)
 */
@Configuration
@ComponentScan(
    basePackages = "com.example",
    excludeFilters = {
        @ComponentScan.Filter(
            type = FilterType.ANNOTATION,
            value = EnableWebMvc.class
        )
    }
)
public class RootConfig {
    // Root context beans are configured through component scanning
    // Additional beans can be defined here if needed
}
