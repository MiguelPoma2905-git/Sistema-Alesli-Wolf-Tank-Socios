import api from './api'

export const getProducts = () =>
  api.get('/productos/').then(r => r.data)

export const getProduct = (id) =>
  api.get(`/productos/${id}/`).then(r => r.data)

export const getCategories = () =>
  api.get('/categorias/').then(r => r.data)

export const createProduct = (data) =>
  api.post('/productos/', data).then(r => r.data)

export const updateProduct = (id, data) =>
  api.put(`/productos/${id}/`, data).then(r => r.data)

export const deleteProduct = (id) =>
  api.delete(`/productos/${id}/`).then(r => r.data)
