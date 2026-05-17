import api from './api'

export const getSuppliers = () =>
  api.get('/proveedores/').then(r => r.data)

export const getSupplier = (id) =>
  api.get(`/proveedores/${id}/`).then(r => r.data)

export const createSupplier = (data) =>
  api.post('/proveedores/', data).then(r => r.data)

export const updateSupplier = (id, data) =>
  api.put(`/proveedores/${id}/`, data).then(r => r.data)
