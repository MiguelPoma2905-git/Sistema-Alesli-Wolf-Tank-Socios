// src/utils/constants.js
export const COLORS = {
<<<<<<< HEAD
  pink: '#FF4DB8', purple: '#A855F7', pinkLight: '#FFF0F8', bg: '#FFF7FC',
  white: '#ffffff', dark: '#1F2937', muted: '#64748B', green: '#10B981',
  yellow: '#F59E0B', red: '#EF4444',
=======
  primary: '#d0439d', primaryDark: '#b50357', secondary: '#9f54a0',
  accent: '#ec1b91', accentLight: '#d05893',
  cream: '#f9e5ed', bg: '#fcf5f3', border: '#dfb6cf',
  white: '#ffffff', dark: '#262626', muted: '#7a5a6e',
  green: '#2a7a4b', yellow: '#b8860b', red: '#b50357',
  blue: '#2596be',
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
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
<<<<<<< HEAD
  { tag: 'Rosas Rojas', title: ['Rosas rojas,', 'amor eterno.'], sub: 'El símbolo del amor más puro. Regala pasión con nuestros ramos frescos.', bg: 'linear-gradient(135deg,#7f1d1d,#be123c,#e11d48)', emoji: '🌹' },
  { tag: 'Ramo Mixto', title: ['Cada detalle', 'cuenta ♡'], sub: 'Ramos, regalos y detalles únicos para cada ocasión especial.', bg: 'linear-gradient(135deg,#4c1d95,#7c3aed,#db2777)', emoji: '💐' },
  { tag: 'Tulipanes', title: ['Tulipanes', 'en flor.'], sub: 'Elegancia y color en cada pétalo. Directo a tu puerta.', bg: 'linear-gradient(135deg,#1e3a5f,#2563eb,#7c3aed)', emoji: '🌷' },
  { tag: 'Girasoles', title: ['Luz y alegría,', 'cada día.'], sub: 'Girasoles frescos para iluminar cualquier espacio.', bg: 'linear-gradient(135deg,#78350f,#d97706,#f59e0b)', emoji: '🌻' },
  { tag: 'Orquídeas', title: ['Elegancia', 'pura.'], sub: 'El regalo más sofisticado para quienes aprecian la belleza exquisita.', bg: 'linear-gradient(135deg,#2e1065,#6d28d9,#a855f7)', emoji: '🌺' },
=======
  { tag: 'Rosas Rojas', title: ['Rosas rojas,', 'amor eterno.'], sub: 'El símbolo del amor más puro. Regala pasión con nuestros ramos frescos.', bg: 'linear-gradient(135deg,#7f1d1d,#be123c,#e11d48)', image: '/images/carrusel_1.jpg' },
  { tag: 'Ramo Mixto', title: ['Cada detalle', 'cuenta ♡'], sub: 'Ramos, regalos y detalles únicos para cada ocasión especial.', bg: 'linear-gradient(135deg,#4c1d95,#7c3aed,#db2777)', image: '/images/carrusel_2.jpg' },
  { tag: 'Tulipanes', title: ['Tulipanes', 'en flor.'], sub: 'Elegancia y color en cada pétalo. Directo a tu puerta.', bg: 'linear-gradient(135deg,#1e3a5f,#2563eb,#7c3aed)', image: '/images/carrusel_3.jpg' },
  { tag: 'Girasoles', title: ['Luz y alegría,', 'cada día.'], sub: 'Girasoles frescos para iluminar cualquier espacio.', bg: 'linear-gradient(135deg,#78350f,#d97706,#f59e0b)', image: '/images/carrusel_4.jpg' },
  { tag: 'Orquídeas', title: ['Elegancia', 'pura.'], sub: 'El regalo más sofisticado para quienes aprecian la belleza exquisita.', bg: 'linear-gradient(135deg,#2e1065,#6d28d9,#a855f7)', image: '/images/carrusel_5.jpg' },
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
]

export const FEATURES = [
  { icon: '', bg: '#EDE9FE', title: 'Envíos el mismo día', sub: 'La Paz y El Alto, Bolivia' },
  { icon: '', bg: '#D1FAE5', title: 'Pago 100% seguro', sub: 'Múltiples métodos de pago' },
  { icon: '', bg: '#FEF3C7', title: 'Personaliza tu regalo', sub: 'Hazlo único y especial' },
  { icon: '', bg: '#DBEAFE', title: 'Atención por WhatsApp', sub: '¡Estamos para ayudarte!' },
]

export const OCCASIONS = [
<<<<<<< HEAD
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
=======
  { name: 'San Valentín',         bg: 'linear-gradient(135deg,#1a1a2e,#16213e)', image: '/images/ocasion_1.jpg' },
  { name: 'Día de la Mujer',      bg: 'linear-gradient(135deg,#831843,#be185d)', image: '/images/ocasion_2.jpg' },
  { name: 'Día del Padre',        bg: 'linear-gradient(135deg,#1e3a8a,#1d4ed8)', image: '/images/ocasion_3.jpg' },
  { name: 'Día del Niño',         bg: 'linear-gradient(135deg,#fbbf24,#ea580c)', image: '/images/ocasion_4.jpg' },
  { name: 'Día de la Madre',      bg: 'linear-gradient(135deg,#fce4ec,#f48fb1)', image: '/images/ocasion_5.jpg' },
  { name: 'Día del Maestro',      bg: 'linear-gradient(135deg,#14532d,#166534)', image: '/images/ocasion_6.jpg' },
  { name: 'Día de la Amistad',    bg: 'linear-gradient(135deg,#fef08a,#facc15)', image: '/images/ocasion_7.jpg' },
  { name: 'Día de la Primavera',  bg: 'linear-gradient(135deg,#dcfce7,#4ade80)', image: '/images/ocasion_8.jpg' },
  { name: 'Todos Santos',         bg: 'linear-gradient(135deg,#4b5563,#1f2937)', image: '/images/ocasion_9.jpg' },
  { name: 'Navidad',              bg: 'linear-gradient(135deg,#7f1d1d,#b91c1c)', image: '/images/ocasion_10.jpg' },
  { name: 'Cumpleaños',           bg: 'linear-gradient(135deg,#6B21A8,#9f54a0)', image: '/images/ocasion_11.jpg' },
  { name: 'Aniversario',          bg: 'linear-gradient(135deg,#be123c,#e11d48)', image: '/images/ocasion_12.jpg' },
  { name: 'Nacimiento',           bg: 'linear-gradient(135deg,#f59e0b,#d97706)', image: '/images/ocasion_13.jpg' },
  { name: 'Condolencias',         bg: 'linear-gradient(135deg,#4c1d95,#7e22ce)', image: '/images/ocasion_14.jpg' },
  { name: 'Recuperación',         bg: 'linear-gradient(135deg,#312e81,#4338ca)', image: '/images/ocasion_15.jpg' },
  { name: 'Graduación',           bg: 'linear-gradient(135deg,#064e3b,#059669)', image: '/images/ocasion_16.jpg' },
]

// ─── Admin Dashboard Routes ─────────────────────────────────────────────────
export const ROUTES_ADMIN = {
  DASHBOARD:        '/admin',
  PRODUCTOS:        '/admin/productos',
  PRODUCTO_DETALLE: '/admin/productos/:id',
  INVENTARIO:       '/admin/inventario',
  CATALOGO:         '/admin/catalogo',
  CUIDADO_FLORES:   '/admin/cuidado-flores',
  PEDIDOS_CLIENTES: '/admin/pedidos',
  ENTREGAS:         '/admin/entregas',
  DELIVERY:         '/admin/delivery',
  PEDIDOS_PROV:     '/admin/proveedores',
  FINANZAS:         '/admin/finanzas',
  MARKETING:        '/admin/marketing',
  CAMPANIAS:        '/admin/campanias',
  NOTIFICACIONES:   '/admin/notificaciones',
  CONFIGURACION:    '/admin/configuracion',
  PREFERENCIAS:     '/admin/preferencias',
}

// ─── Admin Sidebar Navigation ────────────────────────────────────────────────
export const ADMIN_NAV_SECTIONS = [
  {
    label: 'Principal',
    items: [
      { id: 'dashboard',  label: 'Dashboard', icon: 'LayoutDashboard', route: ROUTES_ADMIN.DASHBOARD,        badge: null },
      { id: 'finanzas',   label: 'Finanzas',  icon: 'DollarSign',      route: ROUTES_ADMIN.FINANZAS,         badge: null },
    ],
  },
  {
    label: 'Operaciones',
    items: [
      { id: 'pedidos',    label: 'Pedidos',    icon: 'ShoppingBag',     route: ROUTES_ADMIN.PEDIDOS_CLIENTES, badge: null },
      { id: 'entregas',   label: 'Entregas',   icon: 'Truck',           route: ROUTES_ADMIN.ENTREGAS,         badge: null },
      { id: 'delivery',   label: 'Delivery',   icon: 'Bike',            route: ROUTES_ADMIN.DELIVERY,         badge: null },
      { id: 'inventario', label: 'Inventario', icon: 'Package',         route: ROUTES_ADMIN.INVENTARIO,       badge: null },
    ],
  },
  {
    label: 'Catálogo',
    items: [
      { id: 'productos',  label: 'Productos',  icon: 'Tag',             route: ROUTES_ADMIN.PRODUCTOS,        badge: null },
      { id: 'catalogo',   label: 'Catálogo',   icon: 'BookOpen',        route: ROUTES_ADMIN.CATALOGO,         badge: null },
    ],
  },
  {
    label: 'Crecimiento',
    items: [
      { id: 'marketing',  label: 'Marketing',  icon: 'TrendingUp',      route: ROUTES_ADMIN.MARKETING,        badge: null },
      { id: 'campanias',  label: 'Campañas',   icon: 'Megaphone',       route: ROUTES_ADMIN.CAMPANIAS,        badge: null },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { id: 'notificaciones', label: 'Notificaciones', icon: 'Bell',     route: ROUTES_ADMIN.NOTIFICACIONES,  badge: null },
      { id: 'configuracion',  label: 'Configuración',  icon: 'Settings', route: ROUTES_ADMIN.CONFIGURACION,   badge: null },
    ],
  },
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
]