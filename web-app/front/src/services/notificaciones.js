import api from './api'

export const getNotifications = () =>
  api.get('/notificaciones/').then(r => r.data)

export const getUnreadNotifications = () =>
  api.get('/notificaciones/no_leidas/').then(r => r.data)

export const markAsRead = (id) =>
  api.post(`/notificaciones/${id}/marcar_leida/`).then(r => r.data)

export const createNotification = (data) =>
  api.post('/notificaciones/', data).then(r => r.data)
