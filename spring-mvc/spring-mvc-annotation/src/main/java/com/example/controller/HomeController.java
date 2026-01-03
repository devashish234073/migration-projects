package com.example.controller;

import com.example.entity.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Home Controller with Annotation-based RequestMapping
 * Handles all user-related HTTP requests
 */
@Controller
public class HomeController {

    @Autowired
    private UserService userService;

    /**
     * Home page endpoint
     */
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("message", "Welcome to Spring MVC Annotation Configuration!");
        model.addAttribute("users", userService.getAllUsers());
        return "index";
    }

    /**
     * Dashboard endpoint (requires authentication)
     */
    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        model.addAttribute("users", userService.getAllUsers());
        return "dashboard";
    }

    /**
     * Login page endpoint
     */
    @GetMapping("/login")
    public String login() {
        return "login";
    }

    /**
     * Create user endpoint
     */
    @PostMapping("/createUser")
    public String createUser(@RequestParam String username,
                             @RequestParam String email,
                             @RequestParam String password,
                             Model model) {
        User user = new User(username, email, password);
        userService.createUser(user);
        model.addAttribute("message", "User created successfully!");
        model.addAttribute("users", userService.getAllUsers());
        return "index";
    }
}
