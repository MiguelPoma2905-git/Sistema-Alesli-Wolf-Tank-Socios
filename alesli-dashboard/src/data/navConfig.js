import {
  LayoutDashboard, Wallet, Briefcase, ClipboardList, MapPin,
  Bike, Package, Archive, BookOpen, Flower2, Megaphone,
  Target, User, Settings, Lock, SlidersHorizontal, Bell,
  ShoppingBag
} from 'lucide-react'

export const navConfig = [
  {
    num: '01',
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    children: [],
  },
  {
    num: '02',
    label: 'Finanzas',
    path: '/finanzas',
    icon: Wallet,
    children: [],
  },
  {
    num: '03',
    label: 'Operaciones',
    path: '/operaciones',
    icon: Briefcase,
    children: [
      { label: 'Pedidos Proveedores', path: '/operaciones/pedidos-proveedores', icon: ShoppingBag },
      { label: 'Pedidos Clientes',    path: '/operaciones/pedidos-clientes',    icon: ClipboardList },
      { label: 'Entregas',            path: '/operaciones/entregas',            icon: MapPin },
      { label: 'Delivery',            path: '/operaciones/delivery',            icon: Bike },
    ],
  },
  {
    num: '04',
    label: 'Productos',
    path: '/productos',
    icon: Package,
    children: [
      { label: 'Inventario',       path: '/productos/inventario',     icon: Archive },
      { label: 'Productos',        path: '/productos/productos',      icon: Package },
      { label: 'Catálogo',         path: '/productos/catalogo',       icon: BookOpen },
      { label: 'Cuidado de Flores', path: '/productos/cuidado-flores', icon: Flower2 },
    ],
  },
  {
    num: '05',
    label: 'Crecimiento',
    path: '/crecimiento',
    icon: Target,
    children: [
      { label: 'Marketing',  path: '/crecimiento/marketing',  icon: Megaphone },
      { label: 'Campaigns',  path: '/crecimiento/campaigns',  icon: Target },
    ],
  },
  {
    num: '06',
    label: 'Perfil',
    path: '/perfil',
    icon: User,
    children: [
      { label: 'Configuraciones', path: '/perfil/configuraciones', icon: Settings },
      { label: 'Inicio de Sesión', path: '/perfil/inicio-sesion',  icon: Lock },
      { label: 'Preferencias',    path: '/perfil/preferencias',    icon: SlidersHorizontal },
    ],
  },
  {
    num: '07',
    label: 'Notificaciones',
    path: '/notificaciones',
    icon: Bell,
    children: [],
  },
]

export const moduleGrid = [
  { num: '01', label: 'Dashboard',             path: '/dashboard',                         icon: LayoutDashboard },
  { label: 'Finanzas',                          path: '/finanzas',                          icon: Wallet },
  { label: 'Pedidos\nProveedores',              path: '/operaciones/pedidos-proveedores',   icon: ShoppingBag },
  { label: 'Pedidos\nClientes',                 path: '/operaciones/pedidos-clientes',      icon: ClipboardList },
  { label: 'Entregas',                          path: '/operaciones/entregas',              icon: MapPin },
  { label: 'Delivery',                          path: '/operaciones/delivery',              icon: Bike },
  { label: 'Inventario',                        path: '/productos/inventario',              icon: Archive },
  { label: 'Productos',                         path: '/productos/productos',               icon: Package },
  { label: 'Catálogo',                          path: '/productos/catalogo',                icon: BookOpen },
  { label: 'Cuidado de\nFlores',                path: '/productos/cuidado-flores',          icon: Flower2 },
  { label: 'Marketing',                         path: '/crecimiento/marketing',             icon: Megaphone },
  { label: 'Campaigns',                         path: '/crecimiento/campaigns',             icon: Target },
  { label: 'Configuraciones',                   path: '/perfil/configuraciones',            icon: Settings },
  { label: 'Inicio de\nSesión',                 path: '/perfil/inicio-sesion',              icon: Lock },
  { label: 'Preferencias',                      path: '/perfil/preferencias',               icon: SlidersHorizontal },
  { label: 'Notificaciones',                    path: '/notificaciones',                    icon: Bell },
]