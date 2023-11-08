import authHeader from '../services/auth-header'
import { apiClient } from './ApiClient'

export const getAllUsers
    = () => apiClient.get(`users/all`, { headers: authHeader() })

export const deleteUserById
    = (userId) => apiClient.delete(`users/${userId}`, { headers: authHeader() })

export const getUserById
    = (userId) => apiClient.get(`users/${userId}`, { headers: authHeader() })

export const updateUser
    = (userId, user) => apiClient.put(`users/${userId}`, user, { headers: authHeader() })

export const createUser
    = (user) => apiClient.post(`users`, user, { headers: authHeader() }) 