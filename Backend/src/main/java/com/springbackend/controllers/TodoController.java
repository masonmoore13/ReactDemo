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
import com.springbackend.models.Todo;
import com.springbackend.repository.TodoRepository;
import com.springbackend.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
@RestController
@RequestMapping("/todos")
public class TodoController {

	@Autowired
	private TodoRepository todoRepository;

	@Autowired
	private UserRepository userRepository;

	public TodoController(TodoRepository todoRepository) {
		this.todoRepository = todoRepository;
	}

	@GetMapping("/all")
	public List<Todo> getAllTodos() {
		return todoRepository.findAll();
	}

	@GetMapping("/{userId}")
	public ResponseEntity<List<Todo>> getAllCommentsByTutorialId(@PathVariable(value = "userId") Long userId) {
		if (!userRepository.existsById(userId)) {
			throw new ResourceNotFoundException("Did not find user with id = " + userId);
		}

		List<Todo> todo = todoRepository.getTodosByUserId(userId);
		return new ResponseEntity<>(todo, HttpStatus.OK);
	}

	@GetMapping("/{userId}/{todoId}")
	public ResponseEntity<Todo> getCommentsByTutorialId(@PathVariable(value = "todoId") Long todoId,
			@PathVariable(value = "userId") Long userId) {
		Todo todo = todoRepository.findById(todoId)
				.orElseThrow(() -> new ResourceNotFoundException("Did not find todo with todoId = " + todoId));

		return new ResponseEntity<>(todo, HttpStatus.OK);
	}

	@PostMapping("/{userId}")
	public ResponseEntity<Todo> createTodo(@PathVariable(value = "userId") Long userId, @RequestBody Todo todoRequest) {
		Todo todo = userRepository.findById(userId).map(user -> {
			todoRequest.setUser(user);
			return todoRepository.save(todoRequest);
		}).orElseThrow(() -> new ResourceNotFoundException("Did not find todo from userId = " + userId));

		return new ResponseEntity<>(todo, HttpStatus.CREATED);
	}

	@PutMapping("/{userId}/{todoId}")
	public ResponseEntity<Todo> updateTodo(@PathVariable("todoId") long todoId, @RequestBody Todo todoRequest) {
		Todo todo = todoRepository.findById(todoId)
				.orElseThrow(() -> new ResourceNotFoundException("todoId " + todoId + "not found"));

		todo.setDescription(todoRequest.getDescription());
		todo.setDone(todoRequest.isDone());
		todo.setTargetDate(todoRequest.getTargetDate());

		return new ResponseEntity<>(todoRepository.save(todo), HttpStatus.OK);
	}

	@DeleteMapping("/{userId}/{todoId}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String userId, @PathVariable int todoId) {
		todoRepository.deleteById(todoId);
		return ResponseEntity.noContent().build();
	}
}