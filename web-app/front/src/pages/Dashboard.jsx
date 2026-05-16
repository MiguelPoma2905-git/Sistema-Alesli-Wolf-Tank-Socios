import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  Package, Users, ShoppingBag, TrendingUp, AlertCircle,
  Clock, CheckCircle, Truck, ArrowRight,
  BarChart3, DollarSign, FileText, Settings, Bell,
  UserPlus, Layers, Star, Gift, Flower2, ShieldCheck,
  LogIn, UserPlus as UserPlusIcon, ChevronRight, ChevronLeft,
  Leaf, Heart, Award, X, Image as ImageIcon
} from 'lucide-react'
import { getProducts } from '../services/productos'
import { getOrders } from '../services/pedidos'
import { getClients } from '../services/clientes'
import { HERO_SLIDES } from '../utils/constants'

function StatCard({ icon: Icon, label, value, sub, color, trend }) {
  return (
    <div className="bg-white dark:bg-[#151522] p-6 border border-border-light/30 dark:border-white/10 shadow-sm hover:shadow-card-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 flex items-center justify-center ${color}`}>
          <Icon size={22} className="text-white" />
        </div>
        {trend && (
          <span className={`text-[12px] font-bold flex items-center gap-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp size={14} /> {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="text-[28px] font-heading font-black text-text-dark dark:text-white leading-none mb-1">{value}</p>
      <p className="text-[13px] font-medium text-text-muted">{label}</p>
      {sub && <p className="text-[11px] text-text-muted/70 mt-1">{sub}</p>}
    </div>
  )
}

function StatusBadge({ status }) {
  const map = {
    Pendiente: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-400',
    'En camino': 'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400',
    Entregado: 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400',
    Cancelado: 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-400',
    Preparando: 'bg-purple-100 text-purple-800 dark:bg-purple-500/10 dark:text-purple-400',
  }
  return (
    <span className={`inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${map[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, isAuth, isAdmin, isEncargado, isCliente, roleLabel, roleBadge } = useApp()

  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ users: 0, orders: 0, products: 0, clients: 0 })
  const [recentOrders, setRecentOrders] = useState([])
  const [pendingOrders, setPendingOrders] = useState([])

  useEffect(() => {
    if (!isAuth) {
      setLoading(false)
      setStats({ users: 0, orders: 0, products: 0, clients: 0 })
      return
    }
    async function loadData() {
      try {
        const [products, orders, clients] = await Promise.all([
          getProducts().catch(() => []),
          getOrders().catch(() => []),
          getClients().catch(() => []),
        ])
        const productsArr = Array.isArray(products) ? products : []
        const ordersArr = Array.isArray(orders) ? orders : []
        const clientsArr = Array.isArray(clients) ? clients : []

        setStats({
          products: productsArr.length,
          orders: ordersArr.length,
          clients: clientsArr.length,
          users: clientsArr.length,
        })
        setRecentOrders(ordersArr.slice(0, 5))
        setPendingOrders(ordersArr.filter(o => o.status === 'Pendiente' || o.status === 'Preparando' || o.status === 'En camino'))
      } catch {
        setStats({ users: 0, orders: 0, products: 0, clients: 0 })
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [isAuth])

  return (
    <div className="flex-1 w-full animate-fade-in">
      {/* ─── HERO / LANDING ─── */}
      <section className="relative overflow-hidden border-b border-border-light/30 dark:border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        <div className="absolute top-[-120px] right-[-120px] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-80px] left-[-80px] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT: Brand + Info */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-5 h-0.5 bg-primary" />
                <span className="text-[11px] font-bold text-primary uppercase tracking-[4px]">Bienvenido a</span>
              </div>
              <h1 className="text-[44px] md:text-[56px] font-heading font-black text-text-dark dark:text-white leading-[1.1] mb-4">
                Alesli
                <span className="block text-primary">Floricultura</span>
              </h1>
              <p className="text-[16px] text-text-muted leading-relaxed max-w-lg mb-8 font-medium">
                Sistema integral de gestión para pedidos, clientes, catálogo e inventario.
                Flores, regalos y momentos especiales al alcance de un clic.
              </p>
              {!isAuth ? (
                <div className="flex flex-wrap gap-4 mb-10">
                  <button onClick={() => navigate('/login')} className="flex items-center gap-2.5 px-8 py-3.5 bg-primary text-white text-[13px] font-bold uppercase tracking-wider hover:bg-accent transition-all shadow-md">
                    <LogIn size={17} /> Iniciar Sesión
                  </button>
                  <button onClick={() => { navigate('/login'); setTimeout(() => window.dispatchEvent(new Event('toggle-auth')), 100) }} className="flex items-center gap-2.5 px-8 py-3.5 border-2 border-primary text-primary text-[13px] font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all">
                    <UserPlusIcon size={17} /> Registrarse
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-4 mb-10">
                  <div className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-[#151522] border border-border-light/30 dark:border-white/10">
                    <div className={`w-10 h-10 flex items-center justify-center text-white font-bold text-[15px] ${roleBadge}`}>
                      {user?.nombre?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-text-dark dark:text-white">{user?.nombre}</p>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{roleLabel}</p>
                    </div>
                  </div>
                  {isAdmin && (
                    <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 px-6 py-3 bg-secondary text-white text-[12px] font-bold uppercase tracking-wider hover:bg-accent transition-all shadow-md">
                      Panel Admin
                    </button>
                  )}
                </div>
              )}
              <div className="flex items-center gap-6 text-[12px] font-bold text-text-muted">
                <div className="flex items-center gap-2"><ShieldCheck size={15} className="text-primary" /> Datos seguros</div>
                <div className="flex items-center gap-2"><Leaf size={15} className="text-primary" /> 100% natural</div>
                <div className="flex items-center gap-2"><Heart size={15} className="text-primary" /> Hecho con amor</div>
              </div>
            </div>

            {/* RIGHT: Logo + Feature Cards */}
            <div className="hidden lg:flex flex-col items-center gap-6">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-[420px] h-[420px] bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
                <img src="/header_logo.jpg" alt="Alesli" className="w-[320px] h-auto object-contain relative z-10 drop-shadow-xl" />
              </div>
              <div className="grid grid-cols-2 gap-3 w-full max-w-[360px]">
                {[
                  { icon: Flower2, text: 'Catálogo completo', color: 'text-primary' },
                  { icon: Truck, text: 'Envíos mismo día', color: 'text-blue-500' },
                  { icon: Award, text: 'Puntos y beneficios', color: 'text-yellow-600' },
                  { icon: Bell, text: 'Notificaciones', color: 'text-secondary' },
                ].map((feat, i) => {
                  const Icon = feat.icon
                  return (
                    <div key={i} className="flex items-center gap-2 p-3 bg-white dark:bg-[#151522] border border-border-light/30 dark:border-white/10">
                      <Icon size={16} className={feat.color} />
                      <span className="text-[11px] font-bold text-text-dark dark:text-white">{feat.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GALERÍA DE LOCALES / DECORACIONES ─── */}
      <GallerySection />

      {/* ─── CARRUSEL DE TARJETITAS (HERO SLIDES) ─── */}
      <section className="py-20 border-b border-border-light/30 dark:border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-center gap-2 mb-12">
            <div className="w-8 h-0.5 bg-primary" />
            <span className="text-[11px] font-bold text-primary uppercase tracking-[4px]">Especialidades</span>
            <div className="w-8 h-0.5 bg-primary" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {HERO_SLIDES.map((slide, i) => (
              <div key={i} className="relative group overflow-hidden shadow-lg animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'backwards' }}>
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{ background: slide.bg }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative z-10 p-8 min-h-[320px] flex flex-col justify-end">
                  <img src={slide.image} alt={slide.tag} className="w-[60px] h-[60px] object-cover rounded-lg mb-4 shadow-lg block animate-fade-in" style={{ animationDelay: `${i * 0.15 + 0.2}s`, animationFillMode: 'backwards' }} />
                  <span className="inline-block w-max px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[3px] mb-3 border border-white/20">{slide.tag}</span>
                  <h3 className="text-[22px] font-heading font-black text-white leading-tight mb-2 drop-shadow-lg">{slide.title[0]}<br />{slide.title[1]}</h3>
                  <p className="text-[13px] text-white/80 leading-relaxed font-medium drop-shadow-md">{slide.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATÁLOGO CARRUSEL ─── */}
      <CatalogCarousel navigate={navigate} />

      {/* ─── DASHBOARD ESPECÍFICO DEL ROL (solo autenticados) ─── */}
      {isAuth && (
        <section className="border-t border-border-light/30 dark:border-white/10 bg-gradient-to-b from-transparent to-primary/[0.02]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
              <div>
                <h1 className="text-[30px] md:text-[36px] font-heading font-black text-text-dark dark:text-white">
                  {isAdmin && 'Panel de Administración'}
                  {isEncargado && 'Panel de Gestión'}
                  {isCliente && 'Mi Cuenta'}
                </h1>
                <p className="text-[14px] text-text-muted font-medium flex items-center gap-2 mt-1">
                  {user?.nombre}
                  <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider ${roleBadge}`}>{roleLabel}</span>
                </p>
              </div>
            </div>

            {isAdmin && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <StatCard icon={Users} label="Usuarios registrados" value={stats.users} sub="Total en el sistema" color="bg-secondary" trend={12} />
                  <StatCard icon={ShoppingBag} label="Pedidos totales" value={stats.orders} sub="Histórico completo" color="bg-blue-accent" trend={8} />
                  <StatCard icon={DollarSign} label="Ingresos del mes" value="Bs. 0" sub="En gestión" color="bg-green-700" />
                  <StatCard icon={Layers} label="Productos" value={stats.products} sub="En catálogo" color="bg-primary" trend={5} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white dark:bg-[#151522] border border-border-light/30 dark:border-white/10 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-[18px] font-heading font-bold text-text-dark dark:text-white">Pedidos Recientes</h2>
                      <button onClick={() => navigate('/pedidos')} className="text-[12px] font-bold text-primary hover:text-accent transition-colors flex items-center gap-1">Ver todos <ArrowRight size={14} /></button>
                    </div>
                    {loading ? (
                      <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-12 bg-cream dark:bg-white/5 animate-pulse" />)}</div>
                    ) : recentOrders.length === 0 ? (
                      <p className="text-text-muted text-center py-8 font-medium">No hay pedidos registrados</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead><tr className="text-[11px] font-bold text-text-muted uppercase tracking-wider border-b border-border-light/30 dark:border-white/10"><th className="pb-3 pr-4">ID</th><th className="pb-3 pr-4">Cliente</th><th className="pb-3 pr-4">Total</th><th className="pb-3 pr-4">Estado</th><th className="pb-3">Fecha</th></tr></thead>
                          <tbody>{recentOrders.map((o, i) => (
                            <tr key={o.id || i} className="border-b border-border-light/20 dark:border-white/5 last:border-0">
                              <td className="py-3 pr-4 text-[13px] font-bold text-text-dark dark:text-white">#{o.id || `ORD-${i+1}`}</td>
                              <td className="py-3 pr-4 text-[13px] text-text-muted">{o.cliente_nombre || 'N/A'}</td>
                              <td className="py-3 pr-4 text-[13px] font-bold text-text-dark dark:text-white">Bs. {o.total || '0.00'}</td>
                              <td className="py-3 pr-4"><StatusBadge status={o.status || 'Pendiente'} /></td>
                              <td className="py-3 text-[12px] text-text-muted">{o.fecha_pedido || '--'}</td>
                            </tr>
                          ))}</tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div className="bg-white dark:bg-[#151522] border border-border-light/30 dark:border-white/10 shadow-sm p-6">
                    <h2 className="text-[18px] font-heading font-bold text-text-dark dark:text-white mb-6">Accesos Rápidos</h2>
                    <div className="space-y-3">
                      <QuickAction icon={UserPlus} label="Nuevo Usuario" color="text-secondary" bg="bg-secondary/10" onClick={() => navigate('/login')} />
                      <QuickAction icon={Package} label="Gestionar Pedidos" color="text-blue-accent" bg="bg-blue-accent/10" onClick={() => navigate('/pedidos')} />
                      <QuickAction icon={Layers} label="Catálogo Productos" color="text-primary" bg="bg-primary/10" onClick={() => navigate('/flores')} />
                      <QuickAction icon={BarChart3} label="Reportes" color="text-green-700" bg="bg-green-700/10" onClick={() => {}} />
                      <QuickAction icon={Settings} label="Configuración" color="text-text-muted" bg="bg-cream dark:bg-white/5" onClick={() => {}} />
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#151522] border border-border-light/30 dark:border-white/10 shadow-sm p-6">
                  <h2 className="text-[18px] font-heading font-bold text-text-dark dark:text-white mb-4">Alertas del Sistema</h2>
                  <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-500/5 border border-yellow-200 dark:border-yellow-500/10">
                    <AlertCircle size={20} className="text-yellow-600 shrink-0" />
                    <p className="text-[13px] font-medium text-yellow-800 dark:text-yellow-400">No hay alertas activas. El sistema funciona con normalidad.</p>
                  </div>
                </div>
              </div>
            )}

            {isEncargado && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <StatCard icon={Clock} label="Pedidos Pendientes" value={pendingOrders.length} sub="Requieren atención" color="bg-yellow-600" />
                  <StatCard icon={Truck} label="En Camino" value={pendingOrders.filter(o => o.status === 'En camino').length} sub="Entregas activas" color="bg-blue-accent" />
                  <StatCard icon={CheckCircle} label="Completados Hoy" value="0" sub="Entregas del día" color="bg-green-700" />
                </div>
                <div className="bg-white dark:bg-[#151522] border border-border-light/30 dark:border-white/10 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[18px] font-heading font-bold text-text-dark dark:text-white">Pedidos por Atender</h2>
                    <button onClick={() => navigate('/pedidos')} className="text-[12px] font-bold text-primary hover:text-accent transition-colors flex items-center gap-1">Ver todos <ArrowRight size={14} /></button>
                  </div>
                  {loading ? (
                    <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-12 bg-cream dark:bg-white/5 animate-pulse" />)}</div>
                  ) : pendingOrders.length === 0 ? (
                    <div className="text-center py-10"><CheckCircle size={40} className="mx-auto text-green-600 mb-4" /><p className="text-[15px] font-bold text-text-dark dark:text-white">¡Todo al día!</p><p className="text-[13px] text-text-muted mt-1">No hay pedidos pendientes.</p></div>
                  ) : (
                    <div className="space-y-3">{pendingOrders.map((o, i) => (
                      <div key={o.id || i} className="flex items-center justify-between p-4 bg-cream dark:bg-white/5 border border-border-light/30 dark:border-white/10">
                        <div className="flex items-center gap-4"><div className="w-10 h-10 bg-blue-accent/10 flex items-center justify-center text-blue-accent"><Package size={18} /></div><div><p className="text-[13px] font-bold text-text-dark dark:text-white">#{o.id || `ORD-${i+1}`}</p><p className="text-[11px] text-text-muted">{o.cliente_nombre || 'Cliente'}</p></div></div>
                        <StatusBadge status={o.status || 'Pendiente'} />
                      </div>
                    ))}</div>
                  )}
                </div>
              </div>
            )}

            {isCliente && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <StatCard icon={Package} label="Mis Pedidos" value={stats.orders} sub="Total de pedidos" color="bg-blue-accent" />
                  <StatCard icon={Star} label="Puntos Acumulados" value="0" sub="Sigue acumulando" color="bg-yellow-600" />
                  <StatCard icon={Gift} label="Beneficios" value="0" sub="Activos" color="bg-primary" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-[#151522] border border-border-light/30 dark:border-white/10 shadow-sm p-6">
                    <h2 className="text-[18px] font-heading font-bold text-text-dark dark:text-white mb-6">Acceso Rápido</h2>
                    <div className="space-y-3">
                      <QuickAction icon={ShoppingBag} label="Ver Catálogo" color="text-primary" bg="bg-primary/10" onClick={() => navigate('/flores')} />
                      <QuickAction icon={Package} label="Mis Pedidos" color="text-blue-accent" bg="bg-blue-accent/10" onClick={() => navigate('/pedidos')} />
                      <QuickAction icon={FileText} label="Mi Perfil" color="text-green-700" bg="bg-green-700/10" onClick={() => navigate('/perfil')} />
                      <QuickAction icon={Star} label="Beneficios y Puntos" color="text-yellow-600" bg="bg-yellow-600/10" onClick={() => navigate('/recompensas')} />
                      <QuickAction icon={Bell} label="Fechas Especiales" color="text-secondary" bg="bg-secondary/10" onClick={() => navigate('/fechas')} />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#151522] border border-border-light/30 dark:border-white/10 shadow-sm p-6">
                    <h2 className="text-[18px] font-heading font-bold text-text-dark dark:text-white mb-4">Resumen de Actividad</h2>
                    {recentOrders.length === 0 ? (
                      <div className="text-center py-10"><ShoppingBag size={40} className="mx-auto text-text-muted/30 mb-4" /><p className="text-[15px] font-bold text-text-dark dark:text-white">Sin actividad aún</p><p className="text-[13px] text-text-muted mt-1 mb-6">Realiza tu primer pedido</p><button onClick={() => navigate('/flores')} className="px-6 py-3 bg-primary text-white font-bold text-[12px] uppercase tracking-widest hover:bg-accent transition-all shadow-md">Explorar catálogo</button></div>
                    ) : (
                      <div className="space-y-3">{recentOrders.map((o, i) => (
                        <div key={o.id || i} className="flex items-center justify-between p-3 bg-cream dark:bg-white/5"><div><p className="text-[13px] font-bold text-text-dark dark:text-white">#{o.id || `ORD-${i+1}`}</p><p className="text-[11px] text-text-muted">Bs. {o.total || '0.00'}</p></div><StatusBadge status={o.status || 'Pendiente'} /></div>
                      ))}</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}

const GALLERY_SLIDES = [
  { src: '/images/galeria/galeria_1.jpg', gradient: 'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)', label: 'Local Central' },
  { src: '/images/galeria/galeria_2.jpg', gradient: 'linear-gradient(135deg,#2d1b69,#512da8,#7c4dff)', label: 'Sucursal Sopocachi' },
  { src: '/images/galeria/galeria_3.jpg', gradient: 'linear-gradient(135deg,#1b4332,#2d6a4f,#40916c)', label: 'Decoración Bodas' },
  { src: '/images/galeria/galeria_4.jpg', gradient: 'linear-gradient(135deg,#7f1d1d,#b91c1c,#ef4444)', label: 'Evento Empresarial' },
  { src: '/images/galeria/galeria_5.jpg', gradient: 'linear-gradient(135deg,#5b1e4a,#9d4edd,#e040a0)', label: 'Taller Creativo' },
  { src: '/images/galeria/galeria_6.jpg', gradient: 'linear-gradient(135deg,#1e3a5f,#2563eb,#60a5fa)', label: 'Tienda Calacoto' },
]

function GallerySection() {
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState({})

  const next = useCallback(() => setCurrent(i => (i + 1) % GALLERY_SLIDES.length), [])
  const prev = useCallback(() => setCurrent(i => (i - 1 + GALLERY_SLIDES.length) % GALLERY_SLIDES.length), [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative w-full overflow-hidden bg-gray-100 dark:bg-[#0a0a14] border-b border-border-light/30 dark:border-white/10">
      <div className="relative max-w-[1400px] mx-auto h-[300px] md:h-[420px] lg:h-[480px]">
        {GALLERY_SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              i === current
                ? 'opacity-100 scale-100 pointer-events-auto'
                : 'opacity-0 scale-[1.02] pointer-events-none'
            }`}
          >
            <div className="absolute inset-0" style={{ background: slide.gradient }} />
            <img
              src={slide.src}
              alt={slide.label}
              onLoad={() => setLoaded(s => ({ ...s, [i]: true }))}
              onError={(e) => { e.target.style.display = 'none' }}
              className={`w-full h-full object-cover transition-opacity duration-700 ${loaded[i] ? 'opacity-100' : 'opacity-0'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[3px] border border-white/20">
                {slide.label}
              </span>
            </div>
          </div>
        ))}

        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md hover:bg-white/30 text-white border border-white/20 flex items-center justify-center transition-all z-10">
          <ChevronLeft size={20} />
        </button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md hover:bg-white/30 text-white border border-white/20 flex items-center justify-center transition-all z-10">
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {GALLERY_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-500 rounded-full ${
                i === current ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CatalogCarousel({ navigate }) {
  const { isAuth, isCliente } = useApp()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const scrollRef = useRef(null)

  const [visibleCards, setVisibleCards] = useState(new Set())

  useEffect(() => {
    getProducts()
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (loading) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set(prev).add(entry.target.dataset.index))
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
    )
    document.querySelectorAll('[data-scroll-card]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [loading, products.length])

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' })
    }
  }

  const handleOrderClick = () => {
    if (!isAuth) {
      setShowLoginModal(true)
    } else if (isCliente) {
      navigate('/carrito')
    }
  }

  return (
    <section className="py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-0.5 bg-primary" />
              <span className="text-[11px] font-bold text-primary uppercase tracking-[4px]">Nuestro Catálogo</span>
            </div>
            <h2 className="text-[32px] md:text-[38px] font-heading font-black text-text-dark dark:text-white leading-tight">
              Explorá nuestra<br />colección completa
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={() => scroll(-1)} className="w-10 h-10 border border-border-light/40 dark:border-white/10 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll(1)} className="w-10 h-10 border border-border-light/40 dark:border-white/10 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex gap-6 overflow-hidden">
            {[1,2,3,4].map(i => <div key={i} className="min-w-[280px] h-[380px] bg-cream dark:bg-white/5 animate-pulse flex-shrink-0" />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 border border-border-light/30 dark:border-white/10">
            <Flower2 size={48} className="mx-auto text-text-muted/30 mb-4" />
            <p className="text-[16px] font-bold text-text-dark dark:text-white mb-1">Catálogo próximo a cargarse</p>
            <p className="text-[13px] text-text-muted">Pronto tendremos productos disponibles.</p>
          </div>
        ) : (
          <div className="relative">
            <div ref={scrollRef} className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {products.map((product, i) => (
                <div key={product.id || i} data-scroll-card={i} className={`min-w-[280px] max-w-[280px] flex-shrink-0 snap-start bg-white dark:bg-[#151522] border border-border-light/30 dark:border-white/10 group hover:shadow-xl hover:-translate-y-2 hover:border-primary/30 transition-all duration-500 ease-out ${
                  visibleCards.has(String(i)) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                  style={{ transitionDuration: '600ms', transitionDelay: `${i * 80}ms`, transitionProperty: 'opacity, transform' }}
                >
                  <div className="h-[260px] overflow-hidden bg-cream dark:bg-white/5 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                    {product.imagen_url ? (
                      <img src={product.imagen_url} alt={product.nombre} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-[1deg]" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-110"><Flower2 size={48} className="text-border-light/50" /></div>
                    )}
                    <div className="absolute bottom-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <span className="px-3 py-1 bg-white/90 dark:bg-black/70 text-[10px] font-bold uppercase tracking-wider text-primary rounded shadow-lg">Ver más</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[2px] group-hover:tracking-[3px] transition-all duration-300">{product.categoria_nombre || 'General'}</span>
                    <h3 className="text-[16px] font-heading font-bold text-text-dark dark:text-white mt-1 leading-tight truncate group-hover:text-primary transition-colors duration-300">{product.nombre || `Producto ${i + 1}`}</h3>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[18px] font-heading font-black text-primary group-hover:scale-105 transition-transform duration-300 inline-block">Bs. {product.precio_venta || '0.00'}</span>
                      <button onClick={handleOrderClick} className="px-5 py-2.5 bg-primary text-white text-[11px] font-bold uppercase tracking-wider hover:bg-accent hover:shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300">Pedir</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-10">
          <button onClick={() => navigate('/flores')} className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary text-[12px] font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all">
            Ver catálogo completo <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowLoginModal(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="bg-white dark:bg-[#151522] w-full max-w-sm shadow-xl border border-border-light/30 dark:border-white/10 relative z-10 animate-fade-in-up p-8" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-text-muted hover:text-text-dark dark:hover:text-white transition-colors"><X size={18} /></button>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mx-auto mb-5"><LogIn size={24} className="text-primary" /></div>
              <h3 className="text-[20px] font-heading font-bold text-text-dark dark:text-white mb-2">Inicia sesión</h3>
              <p className="text-[13px] text-text-muted mb-6 leading-relaxed">Necesitás estar registrado para realizar pedidos. Ingresá o creá tu cuenta.</p>
              <div className="flex flex-col gap-3">
                <button onClick={() => { setShowLoginModal(false); navigate('/login') }} className="w-full py-3 bg-primary text-white text-[12px] font-bold uppercase tracking-wider hover:bg-accent transition-all">Iniciar sesión</button>
                <button onClick={() => { setShowLoginModal(false); navigate('/login'); setTimeout(() => window.dispatchEvent(new Event('toggle-auth')), 100) }} className="w-full py-3 border-2 border-primary text-primary text-[12px] font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all">Crear cuenta</button>
              </div>
              <button onClick={() => setShowLoginModal(false)} className="mt-4 text-[12px] font-bold text-text-muted hover:text-primary transition-colors">Seguir explorando</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function QuickAction({ icon: Icon, label, color, bg, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-4 p-4 hover:bg-cream dark:hover:bg-white/5 transition-all group border border-transparent hover:border-border-light/40 dark:hover:border-white/10">
      <div className={`w-10 h-10 ${bg} flex items-center justify-center ${color}`}>
        <Icon size={18} />
      </div>
      <span className="flex-1 text-left text-[13px] font-bold text-text-dark dark:text-white group-hover:text-primary transition-colors">{label}</span>
      <ArrowRight size={16} className="text-text-muted group-hover:text-primary transition-colors" />
    </button>
  )
}
