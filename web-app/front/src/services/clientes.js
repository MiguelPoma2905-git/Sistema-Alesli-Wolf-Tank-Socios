import api from './api'

export const getClients = () =>
  api.get('/clientes/').then(r => r.data)

export const getClient = (id) =>
  api.get(`/clientes/${id}/`).then(r => r.data)

export const createClient = (data) =>
  api.post('/clientes/', data).then(r => r.data)

export const updateClient = (id, data) =>
  api.put(`/clientes/${id}/`, data).then(r => r.data)

export const getClientPoints = (id) =>
  api.get(`/clientes/${id}/puntos/`).then(r => r.data)

export const getClientInteractions = (id) =>
  api.get(`/clientes/${id}/interacciones/`).then(r => r.data)

export const getClientNotifications = (id) =>
  api.get(`/clientes/${id}/notificaciones/`).then(r => r.data)
