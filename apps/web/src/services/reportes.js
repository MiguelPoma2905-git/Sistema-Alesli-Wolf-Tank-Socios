import api from './api'

export const getFinancialTransactions = () =>
  api.get('/transacciones-financieras/').then(r => r.data)

export const getCampanas = () =>
  api.get('/campanas-marketing/').then(r => r.data)

export const getCupones = () =>
  api.get('/cupones/').then(r => r.data)

export const getEntregas = () =>
  api.get('/entregas-logistica/').then(r => r.data)

export const getMateriales = () =>
  api.get('/materiales/').then(r => r.data)

export const getTransaccionesPuntos = () =>
  api.get('/transacciones-puntos/').then(r => r.data)
