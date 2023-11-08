import authHeader from '../services/auth-header'
import { apiClient } from './ApiClient'

export const getAllTodosForUserId
    = (userId) => apiClient.get(`todos/${userId}`, { headers: authHeader() })

export const deleteTodoApi
    = (userId, todoId) => apiClient.delete(`todos/${userId}/${todoId}`, { headers: authHeader() })

export const retrieveTodoApi
    = (userId, todoId) => apiClient.get(`todos/${userId}/${todoId}`, { headers: authHeader() })

export const updateTodoApi
    = (userId, todoId, todo) => apiClient.put(`todos/${userId}/${todoId}`, todo, { headers: authHeader() })

export const createTodoApi
    = (userId, todo) => apiClient.post(`todos/${userId}`, todo, { headers: authHeader() }) 