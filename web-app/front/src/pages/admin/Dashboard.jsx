import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownRight, ArrowUpRight, ChevronRight, ClipboardCopy, Package, DollarSign, Users, ShoppingBag, Truck, AlertCircle, Clock } from 'lucide-react'
import { clsx } from 'clsx'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'
import { getProducts } from '../../services/productos'
import { getOrders } from '../../services/pedidos'
import { getClients } from '../../services/clientes'
import { getDashboardStats, getDeliveries } from '../../services/admin/dashboard'
import { ROUTES_ADMIN } from '../../utils/constants'
import { formatPrice } from '../../utils/helpers'

const statusBadgeClass = (status) => {
  const map = {
    'Pendiente': 'badge-pendiente',
    'En preparación': 'badge-proceso',
    'Listo': 'badge-listo',
    'Entregado': 'badge-entregado',
    'Cancelado': 'badge-cancelado',
    'En camino': 'badge-proceso',
  }
  return map[status] || 'badge-pendiente'
}

function KpiCard({ icon: Icon, label, value, sub, trend, color, dark }) {
  return (
    <div className={clsx(
      'rounded-2xl p-5 border transition-all',
      dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className={clsx(
          'w-11 h-11 rounded-xl flex items-center justify-center',
          color === 'pink' && (dark ? 'bg-pink-900/30 text-pink-400' : 'bg-pink-50 text-pink-600'),
          color === 'emerald' && (dark ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-50 text-emerald-600'),
          color === 'blue' && (dark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'),
          color === 'amber' && (dark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-50 text-amber-600'),
          color === 'purple' && (dark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-50 text-purple-600'),
        )}>
          <Icon size={20} />
        </div>
        {trend !== undefined && (
          <span className={clsx(
            'flex items-center gap-0.5 text-[11px] font-bold',
            trend >= 0 ? 'text-emerald-500' : 'text-red-500'
          )}>
            {trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className={clsx('text-[11px] font-bold uppercase tracking-wider mb-1', dark ? 'text-gray-500' : 'text-gray-400')}>{label}</p>
      <p className={clsx('text-2xl font-extrabold', dark ? 'text-white' : 'text-gray-900')}>{value}</p>
      {sub && <p className={clsx('text-[12px] mt-1', dark ? 'text-gray-500' : 'text-gray-400')}>{sub}</p>}
    </div>
  )
}

export default function AdminDashboard() {
  const { user, dark } = useApp()
  const { addToast } = useToast()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ products: [], orders: [], clients: [], deliveries: [], financial: null })
  const [orderFilter, setOrderFilter] = useState('Todos')
  const [detailOrder, setDetailOrder] = useState(null)

  useEffect(() => {
    async function load() {
      const [products, orders, clients, financial, deliveries] = await Promise.all([
        getProducts().catch(() => []),
        getOrders().catch(() => []),
        getClients().catch(() => []),
        getDashboardStats().catch(() => null),
        getDeliveries().catch(() => []),
      ])
      setData({
        products: Array.isArray(products) ? products : [],
        orders: Array.isArray(orders) ? orders : [],
        clients: Array.isArray(clients) ? clients : [],
        deliveries: Array.isArray(deliveries) ? deliveries : [],
        financial,
      })
      setLoading(false)
    }
    load()
  }, [])

  const totalRevenue = data.orders.reduce((sum, o) => sum + (parseFloat(o.total_final) || 0), 0)
  const pendingDeliveries = data.deliveries.filter(d => d.estado_entrega !== 'Entregado')
  const pendingOrders = data.orders.filter(o => o.estado === 'Pendiente')
  const activeProducts = data.products.filter(p => p.activo !== false)
  const todayOrders = data.orders.filter(o => {
    if (!o.fecha_pedido) return false
    const today = new Date()
    const orderDate = new Date(o.fecha_pedido)
    return orderDate.toDateString() === today.toDateString()
  })

  const deliveryMap = useMemo(
    () => new Map(data.deliveries.map(item => [item.id_pedido, item.estado_entrega])),
    [data.deliveries],
  )

  const filteredOrders = useMemo(() => {
    const base = orderFilter === 'Todos'
      ? data.orders
      : data.orders.filter(o => o.estado === orderFilter || deliveryMap.get(o.id_pedido) === orderFilter)
    return base.slice(0, 5)
  }, [data.orders, orderFilter, deliveryMap])

  const handleCopyId = async (id) => {
    try {
      await navigator.clipboard.writeText(String(id))
      addToast(`ID #${id} copiado`, 'success')
    } catch {
      addToast('No se pudo copiar', 'error')
    }
  }

  const statusCounts = [
    { label: 'Pendiente', value: 'Pendiente', count: pendingOrders.length },
    { label: 'En camino', value: 'En camino', count: data.orders.filter(o => o.estado === 'En camino').length },
    { label: 'Entregado', value: 'Entregado', count: data.orders.filter(o => o.estado === 'Entregado').length },
    { label: 'Cancelado', value: 'Cancelado', count: data.orders.filter(o => o.estado === 'Cancelado').length },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
          <p className={clsx('font-medium', dark ? 'text-gray-400' : 'text-gray-500')}>Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return 'Buenos días'
    if (h < 18) return 'Buenas tardes'
    return 'Buenas noches'
  })()

  return (
    <div className="space-y-6">
      <div className={clsx(
        'rounded-2xl border p-5 transition-colors',
        dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
      )}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500">{greeting}, {user?.nombre?.split(' ')[0] || 'Admin'}</p>
            <h1 className={clsx('text-2xl font-extrabold mt-1', dark ? 'text-white' : 'text-gray-900')}>Panel de Administración</h1>
            <p className={clsx('text-[12px] mt-1', dark ? 'text-gray-500' : 'text-gray-400')}>
              {new Date().toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-[11px] font-semibold">
            <Clock size={14} /> Tiempo real
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={DollarSign} label="Ingresos" value={formatPrice(data.financial?.balance || totalRevenue)} sub={`${data.orders.length} pedidos`} color="pink" dark={dark} />
        <KpiCard icon={ShoppingBag} label="Pedidos" value={data.orders.length} sub={`${todayOrders.length} hoy`} color="blue" dark={dark} />
        <KpiCard icon={Users} label="Clientes" value={data.clients.length} color="emerald" dark={dark} />
        <KpiCard icon={Package} label="Productos" value={activeProducts.length} sub={`${data.products.length} total`} color="purple" dark={dark} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className={clsx(
          'rounded-2xl border p-5 transition-colors lg:col-span-2',
          dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
        )}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className={clsx('text-[11px] font-bold uppercase tracking-wider', dark ? 'text-gray-500' : 'text-gray-400')}>Resumen de Entregas</p>
            </div>
            <Link to={ROUTES_ADMIN.ENTREGAS} className="text-[11px] font-semibold text-pink-500 hover:text-pink-600">Ver todo →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Entregados', value: data.deliveries.filter(d => d.estado_entrega === 'Entregado').length, color: 'text-emerald-500' },
              { label: 'En Ruta', value: data.deliveries.filter(d => d.estado_entrega === 'En Ruta').length, color: 'text-blue-500' },
              { label: 'Asignados', value: data.deliveries.filter(d => d.estado_entrega === 'Asignado').length, color: 'text-amber-500' },
              { label: 'Fallidos', value: data.deliveries.filter(d => d.estado_entrega === 'Fallido').length, color: 'text-red-500' },
            ].map(item => (
              <div key={item.label} className={clsx(
                'rounded-xl p-4 text-center',
                dark ? 'bg-gray-800' : 'bg-gray-50'
              )}>
                <p className={clsx('text-2xl font-extrabold', item.color)}>{item.value}</p>
                <p className={clsx('text-[11px] font-semibold mt-1', dark ? 'text-gray-400' : 'text-gray-500')}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={clsx(
          'rounded-2xl border p-5 transition-colors',
          dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
        )}>
          <p className={clsx('text-[11px] font-bold uppercase tracking-wider mb-4', dark ? 'text-gray-500' : 'text-gray-400')}>Estado de Pedidos</p>
          <div className="space-y-2">
            {statusCounts.map(s => (
              <button
                key={s.value}
                onClick={() => setOrderFilter(s.value)}
                className={clsx(
                  'w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all',
                  orderFilter === s.value
                    ? 'bg-pink-500 text-white'
                    : (dark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100')
                )}
              >
                <span>{s.label}</span>
                <span className={clsx(
                  'text-[11px] font-bold px-2 py-0.5 rounded-full',
                  orderFilter === s.value ? 'bg-white/20 text-white' : (dark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500')
                )}>{s.count}</span>
              </button>
            ))}
          </div>
          <div className={clsx(
            'mt-4 p-3 rounded-xl flex items-center gap-3',
            dark ? 'bg-gray-800' : 'bg-gray-50'
          )}>
            <Truck size={16} className="text-pink-500" />
            <span className={clsx('text-[12px] font-semibold', dark ? 'text-gray-300' : 'text-gray-600')}>
              {pendingDeliveries.length} entregas pendientes
            </span>
          </div>
        </div>
      </div>

      <div className={clsx(
        'rounded-2xl border overflow-hidden transition-colors',
        dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
      )}>
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <h2 className={clsx('text-[15px] font-extrabold', dark ? 'text-white' : 'text-gray-800')}>Órdenes Recientes</h2>
            <p className={clsx('text-[12px]', dark ? 'text-gray-500' : 'text-gray-400')}>Últimas 5 órdenes — click para detalle</p>
          </div>
          <Link to={ROUTES_ADMIN.PEDIDOS_CLIENTES} className="text-[11px] font-semibold text-pink-500 hover:text-pink-600">Ver todas →</Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px]">
            <thead>
              <tr>
                <th className={clsx('text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider border-t', dark ? 'text-gray-500 border-gray-800 bg-gray-900' : 'text-gray-400 border-gray-100 bg-gray-50')}>ID</th>
                <th className={clsx('text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider border-t', dark ? 'text-gray-500 border-gray-800 bg-gray-900' : 'text-gray-400 border-gray-100 bg-gray-50')}>Cliente</th>
                <th className={clsx('text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider border-t', dark ? 'text-gray-500 border-gray-800 bg-gray-900' : 'text-gray-400 border-gray-100 bg-gray-50')}>Total</th>
                <th className={clsx('text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider border-t', dark ? 'text-gray-500 border-gray-800 bg-gray-900' : 'text-gray-400 border-gray-100 bg-gray-50')}>Estado</th>
                <th className={clsx('text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider border-t', dark ? 'text-gray-500 border-gray-800 bg-gray-900' : 'text-gray-400 border-gray-100 bg-gray-50')}>Entrega</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr
                  key={order.id_pedido}
                  onClick={() => setDetailOrder(order)}
                  className={clsx(
                    'cursor-pointer transition-colors',
                    dark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                  )}
                >
                  <td className={clsx('px-5 py-3 text-[12px] border-t', dark ? 'border-gray-800' : 'border-gray-100')}>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleCopyId(order.id_pedido) }}
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-pink-500 hover:text-pink-400"
                    >
                      <ClipboardCopy size={12} />
                      #{order.id_pedido}
                    </button>
                  </td>
                  <td className={clsx('px-5 py-3 text-[12px] font-semibold border-t', dark ? 'border-gray-800 text-gray-200' : 'border-gray-100 text-gray-800')}>{order.cliente_nombre || 'N/A'}</td>
                  <td className={clsx('px-5 py-3 text-[12px] font-bold border-t', dark ? 'border-gray-800 text-white' : 'border-gray-100 text-gray-900')}>{formatPrice(order.total_final || 0)}</td>
                  <td className="px-5 py-3 border-t" style={{ borderColor: dark ? '#1f2937' : undefined }}>
                    <span className={`badge ${statusBadgeClass(order.estado)}`}>{order.estado}</span>
                  </td>
                  <td className={clsx('px-5 py-3 text-[12px] border-t', dark ? 'border-gray-800 text-gray-500' : 'border-gray-100 text-gray-400')}>
                    {order.fecha_entrega ? new Date(order.fecha_entrega).toLocaleDateString('es-BO') : '--'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {detailOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className={clsx(
            'w-full max-w-2xl rounded-2xl p-6 shadow-2xl',
            dark ? 'bg-gray-900' : 'bg-white'
          )}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500">Detalle de orden</p>
                <h3 className={clsx('mt-1 text-xl font-extrabold', dark ? 'text-white' : 'text-gray-900')}>#{detailOrder.id_pedido}</h3>
                <p className={clsx('text-[12px]', dark ? 'text-gray-400' : 'text-gray-500')}>{detailOrder.cliente_nombre}</p>
              </div>
              <button
                onClick={() => setDetailOrder(null)}
                className={clsx('rounded-full p-2 transition-colors', dark ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200')}
              >✕</button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { label: 'Cliente', value: detailOrder.cliente_nombre },
                { label: 'Total', value: formatPrice(detailOrder.total_final || 0) },
                { label: 'Estado', value: detailOrder.estado, badge: true },
                { label: 'Entrega', value: detailOrder.fecha_entrega ? new Date(detailOrder.fecha_entrega).toLocaleDateString('es-BO') : '--' },
              ].map(item => (
                <div key={item.label} className={clsx('rounded-xl p-4', dark ? 'bg-gray-800' : 'bg-gray-50')}>
                  <p className={clsx('text-[10px] font-bold uppercase tracking-wider', dark ? 'text-gray-500' : 'text-gray-400')}>{item.label}</p>
                  {item.badge ? (
                    <span className={`badge mt-1 ${statusBadgeClass(item.value)}`}>{item.value}</span>
                  ) : (
                    <p className={clsx('mt-1 text-sm font-semibold', dark ? 'text-white' : 'text-gray-900')}>{item.value}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => setDetailOrder(null)} className="px-4 py-2 rounded-xl text-[11px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">Cerrar</button>
              <Link to={ROUTES_ADMIN.PEDIDOS_CLIENTES} className="px-4 py-2 rounded-xl text-[11px] font-semibold bg-pink-500 text-white hover:bg-pink-600 transition-all">Ver pedido completo</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}