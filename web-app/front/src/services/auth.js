import api from './api'

export const loginUser = (email, password) =>
  api.post('/usuarios/login/', { email, password }).then(r => r.data)

export const registerUser = (userData) =>
  api.post('/usuarios/', userData).then(r => r.data)

export const getProfile = () =>
  api.get('/usuarios/profile/').then(r => r.data)
