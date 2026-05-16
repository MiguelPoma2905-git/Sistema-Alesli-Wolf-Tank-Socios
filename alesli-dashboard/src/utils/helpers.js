/**
 * Formatea precio → "$1,200"
 */
export const formatPrice = (amount, symbol = '$') => {
  const n = Number(amount)
  if (isNaN(n)) return symbol + '0'
  return symbol + n.toLocaleString('es-BO')
}

/**
 * Formatea fecha → "Jueves, 14 de mayo de 2026"
 */
export const formatDateLong = (date = new Date()) => {
  const str = date.toLocaleDateString('es-BO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Formatea hora → "Hoy, 14:00" / "Mañana, 10:00" / "Ayer, 11:00"
 */
export const formatRelativeTime = (str) => str

/**
 * Clase CSS del badge según estado
 */
export const statusBadgeClass = (status) => {
  const map = {
    'En Proceso': 'badge-proceso',
    'Pendiente':  'badge-pendiente',
    'Listo':      'badge-listo',
    'Entregado':  'badge-entregado',
    'Cancelado':  'badge-cancelado',
  }
  return map[status] ?? 'badge-proceso'
}

/**
 * Color del dot del badge
 */
export const statusDotColor = (status) => {
  const map = {
    'En Proceso': '#3B82F6',
    'Pendiente':  '#F59E0B',
    'Listo':      '#10B981',
    'Entregado':  '#10B981',
    'Cancelado':  '#EF4444',
  }
  return map[status] ?? '#94A3B8'
}

/**
 * Clamp número
 */
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

/**
 * Truncar texto
 */
export const truncate = (str, n = 30) => str.length > n ? str.slice(0, n) + '…' : str

/**
 * Generar ID de orden
 */
export const genOrderId = () => `ORD-${String(Math.floor(Math.random() * 900) + 100)}`

/**
 * Saludo según hora
 */
export const getGreeting = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Buenos días'
  if (h < 18) return 'Buenas tardes'
  return 'Buenas noches'
}