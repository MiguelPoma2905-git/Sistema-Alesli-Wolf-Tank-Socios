// src/utils/constants.js
export const COLORS = {
  pink: '#FF4DB8', purple: '#A855F7', pinkLight: '#FFF0F8', bg: '#FFF7FC',
  white: '#ffffff', dark: '#1F2937', muted: '#64748B', green: '#10B981',
  yellow: '#F59E0B', red: '#EF4444',
}

export const ROUTES = {
  INICIO: '/', FLORES: '/flores', DETALLE_PRODUCTO: '/flores/:id',
  REGALOS: '/regalos', PELUCHES: '/peluches', CHOCOLATES: '/chocolates',
  OCASIONES: '/ocasiones', PERSONALIZAR: '/personalizar', CURSOS: '/cursos',
  PEDIDOS: '/pedidos', DETALLE_PEDIDO: '/pedidos/:id', RECOMPENSAS: '/recompensas',
  CUPONES: '/cupones', RESENAS: '/resenas', FAVORITOS: '/favoritos',
  CONTACTO: '/contacto', LOGIN: '/login', REGISTRO: '/registro',
  RECUPERAR: '/recuperar', CARRITO: '/carrito', CHECKOUT: '/checkout',
  CONFIRMACION: '/confirmacion',
}

// ─── Menú Limpio y Combinado ───
export const SIDEBAR_ITEMS = [
  { id: 'inicio',       label: 'Inicio',       icon: 'Home',         route: '/'            },
  { id: 'flores',       label: 'Flores',       icon: 'Flower2',      route: '/flores'      },
  { id: 'regalos',      label: 'Regalos',      icon: 'Gift',         route: '/regalos'     },
  { id: 'peluches',     label: 'Peluches',     icon: 'Heart',        route: '/peluches'    },
  { id: 'chocolates',   label: 'Chocolates',   icon: 'Candy',        route: '/chocolates'  },
  { id: 'ocasiones',    label: 'Ocasiones',    icon: 'Star',         route: '/ocasiones'   },
  { id: 'personalizar', label: 'Personalizar', icon: 'Palette',      route: '/personalizar'},
  { id: 'pedidos',      label: 'Mis Pedidos',  icon: 'Package',      route: '/pedidos'     },
  { id: 'beneficios',   label: 'Beneficios',   icon: 'Trophy',       route: '/recompensas' }, // Combinado Cupones + Recompensas
  { id: 'favoritos',    label: 'Favoritos',    icon: 'Heart',        route: '/favoritos'   },
  { id: 'contacto',     label: 'Contacto',     icon: 'Phone',        route: '/contacto'    },
]

export const HERO_SLIDES = [
  { tag: 'Rosas Rojas', title: ['Rosas rojas,', 'amor eterno.'], sub: 'El símbolo del amor más puro. Regala pasión con nuestros ramos frescos.', bg: 'linear-gradient(135deg,#7f1d1d,#be123c,#e11d48)', emoji: '🌹' },
  { tag: 'Ramo Mixto', title: ['Cada detalle', 'cuenta ♡'], sub: 'Ramos, regalos y detalles únicos para cada ocasión especial.', bg: 'linear-gradient(135deg,#4c1d95,#7c3aed,#db2777)', emoji: '💐' },
  { tag: 'Tulipanes', title: ['Tulipanes', 'en flor.'], sub: 'Elegancia y color en cada pétalo. Directo a tu puerta.', bg: 'linear-gradient(135deg,#1e3a5f,#2563eb,#7c3aed)', emoji: '🌷' },
  { tag: 'Girasoles', title: ['Luz y alegría,', 'cada día.'], sub: 'Girasoles frescos para iluminar cualquier espacio.', bg: 'linear-gradient(135deg,#78350f,#d97706,#f59e0b)', emoji: '🌻' },
  { tag: 'Orquídeas', title: ['Elegancia', 'pura.'], sub: 'El regalo más sofisticado para quienes aprecian la belleza exquisita.', bg: 'linear-gradient(135deg,#2e1065,#6d28d9,#a855f7)', emoji: '🌺' },
]

export const FEATURES = [
  { icon: '', bg: '#EDE9FE', title: 'Envíos el mismo día', sub: 'La Paz y El Alto, Bolivia' },
  { icon: '', bg: '#D1FAE5', title: 'Pago 100% seguro', sub: 'Múltiples métodos de pago' },
  { icon: '', bg: '#FEF3C7', title: 'Personaliza tu regalo', sub: 'Hazlo único y especial' },
  { icon: '', bg: '#DBEAFE', title: 'Atención por WhatsApp', sub: '¡Estamos para ayudarte!' },
]

export const OCCASIONS = [
  { name: 'San Valentín',         bg: 'linear-gradient(135deg,#1a1a2e,#16213e)', emoji: '💕' },
  { name: 'Día de la Mujer',      bg: 'linear-gradient(135deg,#831843,#be185d)', emoji: '👑' },
  { name: 'Día del Padre',        bg: 'linear-gradient(135deg,#1e3a8a,#1d4ed8)', emoji: '👔' },
  { name: 'Día del Niño',         bg: 'linear-gradient(135deg,#fbbf24,#ea580c)', emoji: '🎈' },
  { name: 'Día de la Madre',      bg: 'linear-gradient(135deg,#fce4ec,#f48fb1)', emoji: '🌸' },
  { name: 'Día del Maestro',      bg: 'linear-gradient(135deg,#14532d,#166534)', emoji: '🍎' },
  { name: 'Día de la Amistad',    bg: 'linear-gradient(135deg,#fef08a,#facc15)', emoji: '🤝' },
  { name: 'Día de la Primavera',  bg: 'linear-gradient(135deg,#dcfce7,#4ade80)', emoji: '🌻' },
  { name: 'Todos Santos',         bg: 'linear-gradient(135deg,#4b5563,#1f2937)', emoji: '🕯️' },
  { name: 'Navidad',              bg: 'linear-gradient(135deg,#7f1d1d,#b91c1c)', emoji: '🎄' },
  { name: 'Cumpleaños',           bg: 'linear-gradient(135deg,#6B21A8,#A855F7)', emoji: '🎂' },
  { name: 'Aniversario',          bg: 'linear-gradient(135deg,#be123c,#e11d48)', emoji: '💍' },
  { name: 'Nacimiento',           bg: 'linear-gradient(135deg,#f59e0b,#d97706)', emoji: '👶' },
  { name: 'Condolencias',         bg: 'linear-gradient(135deg,#4c1d95,#7e22ce)', emoji: '🕊️' },
  { name: 'Recuperación',         bg: 'linear-gradient(135deg,#312e81,#4338ca)', emoji: '💪' },
  { name: 'Graduación',           bg: 'linear-gradient(135deg,#064e3b,#059669)', emoji: '🎓' },
]