// ============================================================================
// CONFIGURACIÓN CENTRALIZADA DEL SISTEMA "FLORERÍA ALESLI"
// ============================================================================

// ─── Paleta Dual de Colores (Soporte Light / Dark Mode) ─────────────────────
export const COLORS = {
  light: {
    pink:        '#d0439d',
    pinkHover:   '#ec1b91',
    pinkLight:   '#f9e5ed', // Fondo rosa pastel crema
    pinkSoft:    '#dfb6cf',
    purple:      '#9f54a0',
    bg:          '#f9e5ed',
    card:        '#FFFFFF', // Tarjetas blancas limpias
    dark:        '#262626', // Texto principal refinado
    muted:       '#d05893', // Rosa viejo para secundarios
    muted2:      '#d689b5',
    accent:      '#b50357', // Fucsia profundo de marca
    blue:        '#2596be', // Turquesa interactivo y de éxito
  },
  dark: {
    pink:        '#ec1b91',
    pinkHover:   '#d0439d',
    pinkLight:   '#374151',
    pinkSoft:    '#4b5563',
    purple:      '#a855f7',
    bg:          '#262626', // Fondo Gris carbón puro
    card:        '#1f2937', // Contenedores oscuros medios
    dark:        '#ffffff', // Texto principal blanco para legibilidad
    muted:       '#dfb6cf',
    muted2:      '#94a3b8',
    accent:      '#d0439d', // Magenta eléctrico
    blue:        '#2596be', // Turquesa de alto contraste
  }
};

// ─── Enrutamiento Centralizado de la Aplicación ─────────────────────────────
export const ROUTES = {
  DASHBOARD:        '/',
  FINANZAS:         '/finanzas',
  OPERACIONES:      '/operaciones',
  PEDIDOS_CLIENTES: '/pedidos-clientes',
  ENTREGAS:         '/entregas',
  INVENTARIO:       '/inventario',
  PRODUCTOS:        '/productos',
  PRODUCTO_DETALLE: '/productos/:id',
  CATALOGO:         '/catalogo',
  CUIDADO_FLORES:   '/cuidado-flores',
  MARKETING:        '/marketing',
  CAMPANIAS:        '/campanias',
  CONFIGURACION:    '/configuracion',
  NOTIFICACIONES:   '/notificaciones',
  PERFIL:           '/perfil',
};

// ─── Estructura de Navegación del Sidebar por Secciones ─────────────────────
export const NAV_SECTIONS = [
  {
    label: 'Principal',
    items: [
      { id: 'dashboard',  label: 'Dashboard', icon: 'LayoutDashboard', route: ROUTES.DASHBOARD, badge: null },
      { id: 'finanzas',   label: 'Finanzas',  icon: 'DollarSign',      route: ROUTES.FINANZAS,  badge: null },
    ],
  },
  {
    label: 'Operaciones',
    items: [
      { id: 'pedidos-clientes', label: 'Pedidos Clientes', icon: 'ShoppingBag', route: ROUTES.PEDIDOS_CLIENTES, badge: 5 },
      { id: 'entregas',         label: 'Entregas',         icon: 'Truck',       route: ROUTES.ENTREGAS,         badge: null },
      { id: 'inventario',       label: 'Inventario',       icon: 'Package',     route: ROUTES.INVENTARIO,       badge: null },
    ],
  },
  {
    label: 'Catálogo',
    items: [
      { id: 'productos', label: 'Productos', icon: 'Tag',      route: ROUTES.PRODUCTOS, badge: null },
      { id: 'catalogo',  label: 'Catálogo',  icon: 'BookOpen', route: ROUTES.CATALOGO,  badge: null },
    ],
  },
  {
    label: 'Crecimiento',
    items: [
      { id: 'marketing', label: 'Marketing', icon: 'TrendingUp',   route: ROUTES.MARKETING, badge: null },
      { id: 'campanias', label: 'Campañas',  icon: 'Megaphone',    route: ROUTES.CAMPANIAS,  badge: 3 },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { id: 'notificaciones', label: 'Notificaciones', icon: 'Bell',     route: ROUTES.NOTIFICACIONES, badge: 8 },
      { id: 'configuracion',  label: 'Configuración',  icon: 'Settings', route: ROUTES.CONFIGURACION,  badge: null },
    ],
  },
];

// ─── Ítems de la Barra de Navegación Superior (TopNav) ──────────────────────
export const TOP_NAV = [
  { step: '01', label: 'Dashboard',      route: ROUTES.DASHBOARD,      hasChevron: false },
  { step: '8₊', label: 'Finanzas',       route: ROUTES.FINANZAS,       hasChevron: false },
  { step: '03', label: 'Operaciones',    route: ROUTES.OPERACIONES,    hasChevron: true  },
  { step: '04', label: 'Productos',      route: ROUTES.PRODUCTOS,      hasChevron: true  },
  { step: '05', label: 'Crecimiento',    route: ROUTES.MARKETING,      hasChevron: true  },
  { step: '06', label: 'Perfil',         route: ROUTES.PERFIL,         hasChevron: true  },
  { step: '07', label: 'Notificaciones', route: ROUTES.NOTIFICACIONES, hasChevron: false },
];

// ─── Hub de Redes Sociales (Para Integración en el Footer) ──────────────────
export const SOCIAL_NETWORKS = [
  { id: 'instagram', label: 'Instagram', icon: 'Instagram', count: '12.4K seguidores', color: '#9f54a0', url: 'https://instagram.com/alesli' },
  { id: 'facebook',  label: 'Facebook',  icon: 'Facebook',  count: '8.2K amigos',       color: '#ec1b91', url: 'https://facebook.com/alesli' },
  { id: 'whatsapp',  label: 'WhatsApp',  icon: 'MessageCircle', count: '18% conversión', color: '#2596be', url: 'https://wa.me/59177793200' },
];

// ─── Rejilla Completa de Módulos del Sistema (Grid Inferior) ────────────────
export const MODULES = [
  { step: '01', name: 'Dashboard',           icon: 'LayoutDashboard', route: ROUTES.DASHBOARD },
  { step: '02', name: 'Finanzas',            icon: 'DollarSign',      route: ROUTES.FINANZAS },
  { step: '03', name: 'Pedidos Proveedores', icon: 'Truck',           route: '/pedidos-prov' },
  { step: '04', name: 'Pedidos Clientes',    icon: 'ShoppingBag',     route: ROUTES.PEDIDOS_CLIENTES },
  { step: '05', name: 'Entregas',            icon: 'MapPin',          route: ROUTES.ENTREGAS },
  { step: '06', name: 'Delivery',            icon: 'Bike',            route: '/delivery' },
  { step: '07', name: 'Inventario',          icon: 'Package',         route: ROUTES.INVENTARIO },
  { step: '08', name: 'Productos',           icon: 'Tag',             route: ROUTES.PRODUCTOS },
  { step: '09', name: 'Catálogo',            icon: 'BookOpen',        route: ROUTES.CATALOGO },
  { step: '10', name: 'Cuidado de Flores',   icon: 'Flower2',         route: ROUTES.CUIDADO_FLORES },
  { step: '11', name: 'Marketing',           icon: 'TrendingUp',      route: ROUTES.MARKETING },
  { step: '12', name: 'Campañas',            icon: 'Megaphone',       route: ROUTES.CAMPANIAS },
  { step: '13', name: 'Configuraciones',     icon: 'Settings',        route: ROUTES.CONFIGURACION },
  { step: '14', name: 'Inicio de Sesión',    icon: 'LogIn',           route: '/login' },
  { step: '15', name: 'Preferencias',        icon: 'SlidersHorizontal',route: '/preferencias' },
  { step: '16', name: 'Notificaciones',      icon: 'Bell',            route: ROUTES.NOTIFICACIONES },
];