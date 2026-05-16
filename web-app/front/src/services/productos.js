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

export const saveProductWithImage = (data, file, id) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value)
    }
  })
  if (file) {
    formData.append('imagen', file)
  }
  if (id) {
    return api.put(`/productos/${id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(r => r.data)
  }
  return api.post('/productos/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(r => r.data)
}
