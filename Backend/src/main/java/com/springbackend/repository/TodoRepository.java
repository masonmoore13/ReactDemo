package com.springbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springbackend.models.Todo;

import jakarta.transaction.Transactional;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> getTodosByUserId(Long userId);

    List<Todo> getTodoById(int id);

    @Transactional
    void deleteById(int id);
}