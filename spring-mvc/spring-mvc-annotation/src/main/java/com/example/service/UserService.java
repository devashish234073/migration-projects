package com.example.service;

import com.example.dao.UserDao;
import com.example.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * User Service with Annotation-based Dependency Injection
 * Uses UserDao injected via @Autowired annotation
 */
@Service
@Transactional
public class UserService {

    @Autowired
    private UserDao userDao;

    /**
     * Create a new user
     */
    public void createUser(User user) {
        userDao.save(user);
    }

    /**
     * Get a user by ID
     */
    public User getUserById(Long id) {
        return userDao.findById(id);
    }

    /**
     * Get all users
     */
    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    /**
     * Update an existing user
     */
    public void updateUser(User user) {
        userDao.update(user);
    }

    /**
     * Delete a user
     */
    public void deleteUser(User user) {
        userDao.delete(user);
    }
}
