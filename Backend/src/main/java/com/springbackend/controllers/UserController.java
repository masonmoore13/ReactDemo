package com.springbackend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springbackend.exception.ResourceNotFoundException;
import com.springbackend.models.User;
import com.springbackend.repository.UserRepository;

import jakarta.validation.Valid;

//Need error handling

@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
@PreAuthorize("hasRole('ROLE_ADMIN')")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable(value = "userId") Long userId) {
        User user = userRepository.findById(userId).get();
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping
    public User createUser(@RequestBody @Valid User user) {
        return userRepository.save(user);
    }

    @PutMapping("/{userId}")
    public User updateUser(@PathVariable(value = "userId") Long userId, @RequestBody User updatedUser)
            throws ResourceNotFoundException {
        User user = userRepository.findById(userId).get();

        if (!userRepository.existsById(user.getId())) {
            throw new ResourceNotFoundException("User with id " + user + " not found");
        }

        user.setId(updatedUser.getId());
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        user.setRoles(updatedUser.getRoles());
        user.setEmailVerified(updatedUser.isEmailVerified());

        return userRepository.save(user);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable(value = "userId") Long userId) {
        userRepository.deleteById(userId);
        return ResponseEntity.ok("User deleted successfully!");
    }

}
