import api from '../api'

export const getDashboardStats = () =>
  api.get('/transacciones-financieras/resumen/').then(r => r.data)

export const getLowStockMaterials = () =>
  api.get('/materiales/bajo_stock/').then(r => r.data)

export const getDeliveries = () =>
  api.get('/entregas-logistica/').then(r => r.data)

export const updateDeliveryStatus = (id, estado) =>
  api.post(`/entregas-logistica/${id}/cambiar_estado/`, { estado }).then(r => r.data)
