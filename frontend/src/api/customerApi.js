import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

// Health check
export const healthCheck = () => api.get('/api/health')

// Customers CRUD
export const getCustomers = (params = {}) =>
  api.get('/api/customers', { params })

export const getCustomerById = (id) =>
  api.get(`/api/customers/${id}`)

export const createCustomer = (data) =>
  api.post('/api/customers', data)

export const updateCustomer = (id, data) =>
  api.put(`/api/customers/${id}`, data)

export const updateStatus = (id, status) =>
  api.patch(`/api/customers/${id}/status`, { status })

export const deleteCustomer = (id) =>
  api.delete(`/api/customers/${id}`)