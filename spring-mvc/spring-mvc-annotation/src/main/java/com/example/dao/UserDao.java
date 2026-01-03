package com.example.dao;

import com.example.entity.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * User Data Access Object with Annotation-based Dependency Injection
 * Uses SessionFactory injected via @Autowired annotation
 */
@Repository
public class UserDao {

    @Autowired
    private SessionFactory sessionFactory;

    /**
     * Get the current Hibernate Session
     */
    private Session getSession() {
        return sessionFactory.getCurrentSession();
    }

    /**
     * Save a new user to the database
     */
    public void save(User user) {
        getSession().save(user);
    }

    /**
     * Find a user by ID
     */
    public User findById(Long id) {
        return getSession().get(User.class, id);
    }

    /**
     * Find all users
     */
    @SuppressWarnings("unchecked")
    public List<User> findAll() {
        return getSession()
                .createQuery("from User")
                .list();
    }

    /**
     * Update an existing user
     */
    public void update(User user) {
        getSession().update(user);
    }

    /**
     * Delete a user
     */
    public void delete(User user) {
        getSession().delete(user);
    }
}
