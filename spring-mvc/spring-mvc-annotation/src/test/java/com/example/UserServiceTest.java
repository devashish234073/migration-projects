package com.example;

import com.example.entity.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import com.example.config.RootConfig;
import com.example.config.PersistenceConfig;
import com.example.service.UserService;

import static org.junit.Assert.*;

/**
 * Integration tests for UserService
 * Tests the annotation-based configuration with Spring Test
 */
@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {RootConfig.class, PersistenceConfig.class})
@Transactional
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    public void testCreateAndRetrieveUser() {
        // Create a new user
        User user = new User("testuser", "test@example.com", "password123");
        userService.createUser(user);

        // Retrieve all users
        int userCount = userService.getAllUsers().size();
        assertTrue("User should be created", userCount > 0);
    }

    @Test
    public void testGetAllUsers() {
        // Create test data
        User user1 = new User("user1", "user1@example.com", "pass1");
        User user2 = new User("user2", "user2@example.com", "pass2");
        
        userService.createUser(user1);
        userService.createUser(user2);

        // Verify
        int userCount = userService.getAllUsers().size();
        assertTrue("Should have at least 2 users", userCount >= 2);
    }

    @Test
    public void testDeleteUser() {
        // Create a user
        User user = new User("deletetest", "delete@example.com", "password");
        userService.createUser(user);
        
        int countBefore = userService.getAllUsers().size();
        
        // Delete the user
        userService.deleteUser(user);
        
        int countAfter = userService.getAllUsers().size();
        assertTrue("User count should decrease", countAfter < countBefore);
    }
}
