import api from './api'

export const getOrders = () =>
  api.get('/pedidos/').then(r => r.data)

export const getOrder = (id) =>
  api.get(`/pedidos/${id}/`).then(r => r.data)

export const createOrder = (data) =>
  api.post('/pedidos/', data).then(r => r.data)

export const updateOrder = (id, data) =>
  api.put(`/pedidos/${id}/`, data).then(r => r.data)

export const deleteOrder = (id) =>
  api.delete(`/pedidos/${id}/`).then(r => r.data)

export const getOrderDetails = (orderId) =>
  api.get(`/detalles-pedido/?pedido=${orderId}`).then(r => r.data)

export const changeOrderStatus = (id, estado) =>
  api.post(`/pedidos/${id}/cambiar_estado/`, { estado }).then(r => r.data)
