/**
 * Format price  → "Bs. 45.00"
 */
export const formatPrice = (amount) =>
  `Bs. ${Number(amount).toFixed(2)}`

/**
 * Format date  →  "12 May 2026"
 */
export const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-BO', { day: 'numeric', month: 'short', year: 'numeric' })
}

/**
 * Motor Estacional Inteligente: Detecta qué festividad está cerca
 */
export const getOccasionStatus = (occasionName) => {
  const now = new Date();
  const currentMonth = now.getMonth(); 
  
  const seasonalDates = {
    'San Valentín': { month: 1 },         
    'Día de la Mujer': { month: 2 },      
    'Día del Padre': { month: 2 },        
    'Día del Niño': { month: 3 },         
    'Día de la Madre': { month: 4 }, // Mayo
    'Día del Maestro': { month: 5 },      
    'Día de la Amistad': { month: 6 },    
    'Mes de la Patria': { month: 7 },     
    'Día de la Primavera': { month: 8 },  
    'Halloween': { month: 9 },            
    'Todos Santos': { month: 10 },        
    'Navidad': { month: 11 },             
  };

  const occasion = seasonalDates[occasionName];
  if (!occasion) return { active: true, seasonal: false }; 

  const prepMonth = occasion.month === 0 ? 11 : occasion.month - 1;
  const isActive = currentMonth === occasion.month || currentMonth === prepMonth;
  
  return { active: isActive, seasonal: true };
};

export const truncate = (text, n = 60) => text.length > n ? text.slice(0, n) + '…' : text
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
export const generateOrderId = () => `#FLO${Math.floor(10000 + Math.random() * 90000)}`
export const cartTotal = (items) => items.reduce((sum, item) => sum + item.price * item.qty, 0)
export const statusClass = (status) => {
  const map = { Completado: 'badge-completado', Pendiente: 'badge-pendiente', Retrasado: 'badge-retrasado', Cancelado: 'badge-cancelado' }
  return map[status] ?? 'badge-cancelado'
}