import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import {
  Package, Users, ShoppingBag, TrendingUp, AlertCircle,
  Clock, CheckCircle, Truck, ArrowRight, Plus,
  BarChart3, DollarSign, FileText, Settings, Bell,
  UserPlus, Layers, Star, Gift
} from 'lucide-react'
import { getProducts } from '../services/productos'
import { getOrders } from '../services/pedidos'
import { getClients } from '../services/clientes'

function StatCard({ icon: Icon, label, value, sub, color, trend }) {
  return (
    <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={22} className="text-white" />
        </div>
        {trend && (
          <span className={`text-[12px] font-bold flex items-center gap-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            <TrendingUp size={14} /> {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="text-[28px] font-black text-text-dark dark:text-white leading-none mb-1">{value}</p>
      <p className="text-[13px] font-medium text-text-muted">{label}</p>
      {sub && <p className="text-[11px] text-text-muted/70 mt-1">{sub}</p>}
    </div>
  )
}

function StatusBadge({ status }) {
  const map = {
    Pendiente: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400',
    'En camino': 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    Entregado: 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400',
    Cancelado: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
    Preparando: 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400',
  }
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${map[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, isAuth, isAdmin, isEncargado, isCliente, roleLabel } = useApp()

  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ users: 0, orders: 0, products: 0, clients: 0 })
  const [recentOrders, setRecentOrders] = useState([])
  const [pendingOrders, setPendingOrders] = useState([])

  useEffect(() => {
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
  }, [])

  if (!isAuth) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] px-6 animate-fade-in">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mb-8 shadow-xl">
          <ShoppingBag size={36} className="text-white" />
        </div>
        <h1 className="text-[36px] font-black text-text-dark dark:text-white mb-4 text-center">
          Sistema Alesli
        </h1>
        <p className="text-[15px] text-text-muted text-center max-w-md mb-8">
          ERP/CRM para la gestión integral de pedidos, clientes, inventario y más.
        </p>
        <div className="flex gap-4">
          <button onClick={() => navigate('/login')} className="px-8 py-4 bg-text-dark dark:bg-white text-white dark:text-text-dark rounded-xl font-black text-[13px] uppercase tracking-widest hover:-translate-y-0.5 transition-all shadow-md">
            Iniciar Sesión
          </button>
          <button onClick={() => { navigate('/login'); setTimeout(() => window.dispatchEvent(new Event('toggle-auth')), 100) }} className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-black text-[13px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
            Registrarse
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 w-full animate-fade-in">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8">

        {/* ─── HEADER ─── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-[28px] md:text-[32px] font-black text-text-dark dark:text-white">
              {isAdmin && 'Panel de Administración'}
              {isEncargado && 'Panel de Gestión'}
              {isCliente && 'Mi Cuenta'}
            </h1>
            <p className="text-[14px] text-text-muted font-medium flex items-center gap-2 mt-1">
              {user?.nombre}
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black text-white uppercase tracking-wider ${isAdmin ? 'bg-purple-500' : isEncargado ? 'bg-blue-500' : 'bg-green-500'}`}>
                {roleLabel}
              </span>
            </p>
          </div>
        </div>

        {/* ─── ADMIN DASHBOARD ─── */}
        {isAdmin && (
          <div className="space-y-8">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <StatCard icon={Users} label="Usuarios registrados" value={stats.users} sub="Total en el sistema" color="bg-purple-500" trend={12} />
              <StatCard icon={ShoppingBag} label="Pedidos totales" value={stats.orders} sub="Histórico completo" color="bg-blue-500" trend={8} />
              <StatCard icon={DollarSign} label="Ingresos del mes" value="Bs. 0" sub="En gestión" color="bg-green-500" />
              <StatCard icon={Layers} label="Productos" value={stats.products} sub="En catálogo" color="bg-primary" trend={5} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[18px] font-black text-text-dark dark:text-white">Pedidos Recientes</h2>
                  <button onClick={() => navigate('/pedidos')} className="text-[12px] font-bold text-primary hover:text-secondary transition-colors flex items-center gap-1">
                    Ver todos <ArrowRight size={14} />
                  </button>
                </div>
                {loading ? (
                  <div className="space-y-4">
                    {[1,2,3].map(i => <div key={i} className="h-12 bg-gray-100 dark:bg-white/5 rounded-xl animate-pulse" />)}
                  </div>
                ) : recentOrders.length === 0 ? (
                  <p className="text-text-muted text-center py-8 font-medium">No hay pedidos registrados</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[11px] font-black text-text-muted uppercase tracking-wider border-b border-gray-100 dark:border-white/5">
                          <th className="pb-3 pr-4">ID</th>
                          <th className="pb-3 pr-4">Cliente</th>
                          <th className="pb-3 pr-4">Total</th>
                          <th className="pb-3 pr-4">Estado</th>
                          <th className="pb-3">Fecha</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((o, i) => (
                          <tr key={o.id || i} className="border-b border-gray-50 dark:border-white/5 last:border-0">
                            <td className="py-3 pr-4 text-[13px] font-bold text-text-dark dark:text-white">#{o.id || `ORD-${i+1}`}</td>
                            <td className="py-3 pr-4 text-[13px] text-text-muted">{o.cliente_nombre || 'N/A'}</td>
                            <td className="py-3 pr-4 text-[13px] font-bold text-text-dark dark:text-white">Bs. {o.total || '0.00'}</td>
                            <td className="py-3 pr-4"><StatusBadge status={o.status || 'Pendiente'} /></td>
                            <td className="py-3 text-[12px] text-text-muted">{o.fecha_pedido || '--'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm p-6">
                <h2 className="text-[18px] font-black text-text-dark dark:text-white mb-6">Accesos Rápidos</h2>
                <div className="space-y-3">
                  <QuickAction icon={UserPlus} label="Nuevo Usuario" color="text-purple-500" bg="bg-purple-50 dark:bg-purple-500/10" onClick={() => navigate('/login')} />
                  <QuickAction icon={Package} label="Gestionar Pedidos" color="text-blue-500" bg="bg-blue-50 dark:bg-blue-500/10" onClick={() => navigate('/pedidos')} />
                  <QuickAction icon={Layers} label="Catálogo Productos" color="text-primary" bg="bg-pink-50 dark:bg-primary/10" onClick={() => navigate('/flores')} />
                  <QuickAction icon={BarChart3} label="Reportes" color="text-green-500" bg="bg-green-50 dark:bg-green-500/10" onClick={() => {}} />
                  <QuickAction icon={Settings} label="Configuración" color="text-gray-500" bg="bg-gray-50 dark:bg-white/5" onClick={() => {}} />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm p-6">
              <h2 className="text-[18px] font-black text-text-dark dark:text-white mb-4">Alertas del Sistema</h2>
              <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-500/5 rounded-xl border border-yellow-100 dark:border-yellow-500/10">
                <AlertCircle size={20} className="text-yellow-500 shrink-0" />
                <p className="text-[13px] font-medium text-yellow-700 dark:text-yellow-400">
                  No hay alertas activas. El sistema funciona con normalidad.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ─── ENCARGADO DASHBOARD ─── */}
        {isEncargado && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <StatCard icon={Clock} label="Pedidos Pendientes" value={pendingOrders.length} sub="Requieren atención" color="bg-yellow-500" />
              <StatCard icon={Truck} label="En Camino" value={pendingOrders.filter(o => o.status === 'En camino').length} sub="Entregas activas" color="bg-blue-500" />
              <StatCard icon={CheckCircle} label="Completados Hoy" value="0" sub="Entregas del día" color="bg-green-500" />
            </div>

            <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[18px] font-black text-text-dark dark:text-white">Pedidos por Atender</h2>
                <button onClick={() => navigate('/pedidos')} className="text-[12px] font-bold text-primary hover:text-secondary transition-colors flex items-center gap-1">
                  Ver todos <ArrowRight size={14} />
                </button>
              </div>
              {loading ? (
                <div className="space-y-4">
                  {[1,2,3].map(i => <div key={i} className="h-12 bg-gray-100 dark:bg-white/5 rounded-xl animate-pulse" />)}
                </div>
              ) : pendingOrders.length === 0 ? (
                <div className="text-center py-10">
                  <CheckCircle size={40} className="mx-auto text-green-500 mb-4" />
                  <p className="text-[15px] font-bold text-text-dark dark:text-white">¡Todo al día!</p>
                  <p className="text-[13px] text-text-muted mt-1">No hay pedidos pendientes.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingOrders.map((o, i) => (
                    <div key={o.id || i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500">
                          <Package size={18} />
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-text-dark dark:text-white">#{o.id || `ORD-${i+1}`}</p>
                          <p className="text-[11px] text-text-muted">{o.cliente_nombre || 'Cliente'}</p>
                        </div>
                      </div>
                      <StatusBadge status={o.status || 'Pendiente'} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── CLIENTE DASHBOARD ─── */}
        {isCliente && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <StatCard icon={Package} label="Mis Pedidos" value={stats.orders} sub="Total de pedidos" color="bg-blue-500" />
              <StatCard icon={Star} label="Puntos Acumulados" value="0" sub="Sigue acumulando" color="bg-yellow-500" />
              <StatCard icon={Gift} label="Beneficios" value="0" sub="Activos" color="bg-primary" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm p-6">
                <h2 className="text-[18px] font-black text-text-dark dark:text-white mb-6">Acceso Rápido</h2>
                <div className="space-y-3">
                  <QuickAction icon={ShoppingBag} label="Ver Catálogo" color="text-primary" bg="bg-pink-50 dark:bg-primary/10" onClick={() => navigate('/flores')} />
                  <QuickAction icon={Package} label="Mis Pedidos" color="text-blue-500" bg="bg-blue-50 dark:bg-blue-500/10" onClick={() => navigate('/pedidos')} />
                  <QuickAction icon={FileText} label="Mi Perfil" color="text-green-500" bg="bg-green-50 dark:bg-green-500/10" onClick={() => navigate('/perfil')} />
                  <QuickAction icon={Star} label="Beneficios y Puntos" color="text-yellow-500" bg="bg-yellow-50 dark:bg-yellow-500/10" onClick={() => navigate('/recompensas')} />
                  <QuickAction icon={Bell} label="Fechas Especiales" color="text-purple-500" bg="bg-purple-50 dark:bg-purple-500/10" onClick={() => navigate('/fechas')} />
                </div>
              </div>

              <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm p-6">
                <h2 className="text-[18px] font-black text-text-dark dark:text-white mb-4">Resumen de Actividad</h2>
                {recentOrders.length === 0 ? (
                  <div className="text-center py-10">
                    <ShoppingBag size={40} className="mx-auto text-text-muted/30 mb-4" />
                    <p className="text-[15px] font-bold text-text-dark dark:text-white">Sin actividad aún</p>
                    <p className="text-[13px] text-text-muted mt-1 mb-6">Realiza tu primer pedido</p>
                    <button onClick={() => navigate('/flores')} className="px-6 py-3 bg-primary text-white rounded-xl font-black text-[12px] uppercase tracking-widest hover:bg-secondary transition-all shadow-md">
                      Explorar catálogo
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentOrders.map((o, i) => (
                      <div key={o.id || i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                        <div>
                          <p className="text-[13px] font-bold text-text-dark dark:text-white">#{o.id || `ORD-${i+1}`}</p>
                          <p className="text-[11px] text-text-muted">Bs. {o.total || '0.00'}</p>
                        </div>
                        <StatusBadge status={o.status || 'Pendiente'} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

function QuickAction({ icon: Icon, label, color, bg, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all group border border-transparent hover:border-gray-100 dark:hover:border-white/5">
      <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center ${color}`}>
        <Icon size={18} />
      </div>
      <span className="flex-1 text-left text-[13px] font-bold text-text-dark dark:text-white group-hover:text-primary transition-colors">{label}</span>
      <ArrowRight size={16} className="text-text-muted group-hover:text-primary transition-colors" />
    </button>
  )
}
