import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownRight, ArrowUpRight, ChevronRight, Clock3, ClipboardCopy } from 'lucide-react'
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

export default function AdminDashboard() {
  const { user } = useApp()
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

  const urgencyButtons = [
    { label: 'Todos', value: 'Todos', count: data.orders.length },
    { label: 'Urgente', value: 'Cancelado', count: data.orders.filter(o => o.estado === 'Cancelado').length },
    { label: 'Pendiente', value: 'Pendiente', count: data.orders.filter(o => o.estado === 'Pendiente').length },
    { label: 'En camino', value: 'En camino', count: data.orders.filter(o => o.estado === 'En camino').length },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Cargando dashboard...</p>
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
    <div className="space-y-8 p-6">
      <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">
              {greeting}, {user?.nombre?.split(' ')[0] || 'Admin'}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
              Panel de Administración
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {new Date().toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-3xl bg-pink-50 px-4 py-3 text-sm text-pink-700 shadow-sm">
            <Clock3 className="h-5 w-5" />
            Datos en tiempo real
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="card card-p">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="kpi-label">Ingresos Totales</p>
                <p className="text-3xl font-extrabold text-gray-900">
                  {formatPrice(data.financial?.balance || totalRevenue)}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {data.orders.length} pedidos registrados
                </p>
              </div>
              <div className="rounded-3xl bg-pink-50 px-4 py-3 text-sm font-semibold text-pink-600">
                {data.products.length} prod.
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-gray-50 p-4">
                <p className="text-[11px] uppercase tracking-[1.3px] text-gray-400">Pedidos</p>
                <p className="mt-2 text-lg font-bold text-gray-900">{data.orders.length}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-4">
                <p className="text-[11px] uppercase tracking-[1.3px] text-gray-400">Clientes</p>
                <p className="mt-2 text-lg font-bold text-gray-900">{data.clients.length}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-4">
                <p className="text-[11px] uppercase tracking-[1.3px] text-gray-400">Productos</p>
                <p className="mt-2 text-lg font-bold text-gray-900">{data.products.length}</p>
              </div>
            </div>
          </article>

          <article className="card card-p">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="kpi-label">Productos Activos</p>
                <p className="mt-3 text-4xl font-extrabold text-gray-900">
                  {data.products.filter(p => p.activo !== false).length}
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-600">
                    {data.products.length} total
                  </span>
                  <span className="text-gray-400">en catálogo</span>
                </div>
              </div>
              <div className="rounded-3xl bg-pink-50 px-3 py-2 text-pink-700 text-sm font-semibold">
                Inventario
              </div>
            </div>
            <div className="mt-6 rounded-[26px] bg-pink-50 p-4">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>Productos por categoría</span>
                <span className="font-semibold text-gray-700">{data.products.length} items</span>
              </div>
              <div className="space-y-2">
                {[...new Set(data.products.map(p => p.categoria_nombre).filter(Boolean))].slice(0, 4).map(cat => (
                  <div key={cat} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{cat}</span>
                    <span className="font-semibold text-gray-800">{data.products.filter(p => p.categoria_nombre === cat).length}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>

        <article className="card card-p">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="kpi-label">Entregas Pendientes</p>
              <p className="mt-3 text-4xl font-extrabold text-gray-900">{pendingDeliveries.length}</p>
              <p className="mt-2 text-sm text-gray-500">Entregas por completar</p>
            </div>
            <div className="grid gap-3 sm:w-[280px]">
              <button
                type="button"
                onClick={() => setOrderFilter('Pendiente')}
                className="rounded-3xl bg-yellow-50 px-4 py-3 text-left text-sm font-semibold text-yellow-700"
              >Pendientes: {data.orders.filter(o => o.estado === 'Pendiente').length}</button>
              <button
                type="button"
                onClick={() => setOrderFilter('En camino')}
                className="rounded-3xl bg-blue-50 px-4 py-3 text-left text-sm font-semibold text-blue-700"
              >En camino: {data.orders.filter(o => o.estado === 'En camino').length}</button>
              <button
                type="button"
                onClick={() => setOrderFilter('Entregado')}
                className="rounded-3xl bg-emerald-50 px-4 py-3 text-left text-sm font-semibold text-emerald-700"
              >Entregados: {data.orders.filter(o => o.estado === 'Entregado').length}</button>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {urgencyButtons.map(item => (
              <button
                key={item.value}
                type="button"
                onClick={() => setOrderFilter(item.value)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-150 ${
                  orderFilter === item.value
                    ? 'bg-pink-500 text-white border-pink-500'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-pink-200 hover:text-pink-500'
                }`}
              >
                {item.label}: {item.count}
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="card card-p">
        <div className="sec-header">
          <div>
            <h2 className="sec-title">Órdenes Recientes</h2>
            <p className="text-sm text-gray-500">Últimas 5 órdenes con seguimiento rápido</p>
          </div>
          <Link to={ROUTES_ADMIN.PEDIDOS_CLIENTES} className="sec-link">
            Ver todas <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr>
                <th className="tbl-th">ID</th>
                <th className="tbl-th">Cliente</th>
                <th className="tbl-th">Total</th>
                <th className="tbl-th">Estado</th>
                <th className="tbl-th">Fecha Entrega</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr
                  key={order.id_pedido}
                  className="tbl-row"
                  onClick={() => setDetailOrder(order)}
                >
                  <td className="tbl-td">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleCopyId(order.id_pedido) }}
                      className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-pink-600 hover:text-pink-800"
                    >
                      <ClipboardCopy className="h-4 w-4" />
                      #{order.id_pedido}
                    </button>
                  </td>
                  <td className="tbl-td font-semibold text-gray-800">{order.cliente_nombre || 'N/A'}</td>
                  <td className="tbl-td font-bold text-gray-900">{formatPrice(order.total_final || 0)}</td>
                  <td className="tbl-td">
                    <span className={`badge ${statusBadgeClass(order.estado)}`}>{order.estado}</span>
                  </td>
                  <td className="tbl-td text-gray-400">
                    {order.fecha_entrega ? new Date(order.fecha_entrega).toLocaleDateString('es-BO') : '--'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {detailOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-2xl rounded-[32px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">Detalle de orden</p>
                <h3 className="mt-2 text-2xl font-extrabold text-gray-900">#{detailOrder.id_pedido}</h3>
                <p className="text-sm text-gray-500">{detailOrder.cliente_nombre}</p>
              </div>
              <button
                type="button"
                onClick={() => setDetailOrder(null)}
                className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"
              >✕</button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-[11px] uppercase tracking-[1.4px] text-gray-400">Cliente</p>
                <p className="mt-2 text-base font-semibold text-gray-900">{detailOrder.cliente_nombre}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-[11px] uppercase tracking-[1.4px] text-gray-400">Total</p>
                <p className="mt-2 text-base font-semibold text-gray-900">{formatPrice(detailOrder.total_final || 0)}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-[11px] uppercase tracking-[1.4px] text-gray-400">Estado</p>
                <span className={`badge ${statusBadgeClass(detailOrder.estado)}`}>{detailOrder.estado}</span>
              </div>
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-[11px] uppercase tracking-[1.4px] text-gray-400">Fecha Entrega</p>
                <p className="mt-2 text-base font-semibold text-gray-900">
                  {detailOrder.fecha_entrega ? new Date(detailOrder.fecha_entrega).toLocaleDateString('es-BO') : '--'}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDetailOrder(null)}
                className="btn btn-secondary btn-sm"
              >Cerrar</button>
              <Link to={ROUTES_ADMIN.PEDIDOS_CLIENTES} className="btn btn-primary btn-sm">
                Ver pedido completo
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
