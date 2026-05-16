import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownRight, ArrowUpRight, ClipboardCopy, ChevronRight, Clock3 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { DELIVERIES, KPI, REVENUE_CHART } from '../data/mockData'
import { formatDateLong, formatPrice, getGreeting, statusBadgeClass } from '../utils/helpers'
import { ROUTES } from '../utils/constants'

function Dashboard() {
  const { user, orders, showToast } = useApp()
  const [orderFilter, setOrderFilter] = useState('Todos')
  const [detailOrder, setDetailOrder] = useState(null)

  const greeting = getGreeting()
  const currentDate = formatDateLong()
  const { saludFinanciera, ingresosHoy, entregasPendientes } = KPI
  const gananciaNeta = saludFinanciera.ingresos - saludFinanciera.gastos

  const deliveryMap = useMemo(
    () => new Map(DELIVERIES.map(item => [item.order, item.status])),
    [],
  )

  const filteredOrders = useMemo(() => {
    const base = orderFilter === 'Todos'
      ? orders
      : orders.filter(order => deliveryMap.get(order.id) === orderFilter)
    return base.slice(0, 5)
  }, [orders, orderFilter, deliveryMap])

  const handleCopyId = async (id) => {
    try {
      await navigator.clipboard.writeText(id)
      showToast(`ID ${id} copiado al portapapeles`, 'success', '✅')
    } catch (error) {
      showToast('No se pudo copiar el ID', 'error', '⚠️')
    }
  }

  const revenueMax = Math.max(...REVENUE_CHART.map(point => point.monto), 1)
  const chartPoints = REVENUE_CHART.map((point, index) => {
    const x = index * 100 / (REVENUE_CHART.length - 1)
    const y = 100 - (point.monto / revenueMax) * 100
    return { ...point, x, y }
  })
  const chartPath = chartPoints.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')

  const urgencyButtons = [
    { label: 'Todos', value: 'Todos', count: orders.length },
    { label: 'Urgente', value: 'Urgente', count: entregasPendientes.urgentes },
    { label: 'Hoy', value: 'Hoy', count: entregasPendientes.hoy },
    { label: 'Mañana', value: 'Mañana', count: entregasPendientes.manana },
  ]

  return     <div className="space-y-8 p-6">
      <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">
              {greeting}, {user.name.split(' ')[0]}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
              Bienvenida de nuevo, Aleslí
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {currentDate}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-3xl bg-pink-50 px-4 py-3 text-sm text-pink-700 shadow-sm">
            <Clock3 className="h-5 w-5" />
            Panel actualizado con datos en tiempo real
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="card card-p">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="kpi-label">Salud Financiera</p>
                <p className="text-3xl font-extrabold text-gray-900">
                  {formatPrice(saludFinanciera.ingresos)}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Ingresos totales acumulados
                </p>
              </div>
              <div className="rounded-3xl bg-pink-50 px-4 py-3 text-sm font-semibold text-pink-600">
                {saludFinanciera.porcentaje}%
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-gray-50 p-4">
                <p className="text-[11px] uppercase tracking-[1.3px] text-gray-400">Gastos</p>
                <p className="mt-2 text-lg font-bold text-gray-900">{formatPrice(saludFinanciera.gastos)}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-4">
                <p className="text-[11px] uppercase tracking-[1.3px] text-gray-400">Ganancia neta</p>
                <p className="mt-2 text-lg font-bold text-gray-900">{formatPrice(gananciaNeta)}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-4">
                <p className="text-[11px] uppercase tracking-[1.3px] text-gray-400">Diferencia</p>
                <p className="mt-2 text-lg font-bold text-gray-900">
                  {formatPrice(saludFinanciera.ingresos - saludFinanciera.gastos)}
                </p>
              </div>
            </div>
          </article>

          <article className="card card-p">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="kpi-label">Ingresos del Día</p>
                <p className="mt-3 text-4xl font-extrabold text-gray-900">
                  {formatPrice(ingresosHoy.monto)}
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-gray-700">
                  {ingresosHoy.positivo ? (
                    <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={ingresosHoy.positivo ? 'text-emerald-600' : 'text-red-600'}>
                    {ingresosHoy.variacion > 0 ? `+${ingresosHoy.variacion}%` : `${ingresosHoy.variacion}%`}
                  </span>
                  <span className="text-gray-400">vs ayer</span>
                </div>
              </div>
              <div className="rounded-3xl bg-pink-50 px-3 py-2 text-pink-700 text-sm font-semibold">
                Tendencia {ingresosHoy.positivo ? 'positiva' : 'negativa'}
              </div>
            </div>
            <div className="mt-6 rounded-[26px] bg-pink-50 p-4">
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>Últimos 7 días</span>
                <span className="font-semibold text-gray-700">{formatPrice(REVENUE_CHART[REVENUE_CHART.length - 1].monto)}</span>
              </div>
              <div className="relative h-28 overflow-hidden rounded-3xl bg-white/80 p-3">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#fb7185" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="2.5"
                    points={chartPoints.map(point => `${point.x},${point.y}`).join(' ')}
                  />
                  <path
                    d={`${chartPath} L 100 100 L 0 100 Z`}
                    fill="url(#lineGrad)"
                    opacity="0.55"
                  />
                  {chartPoints.map(point => (
                    <circle
                      key={point.dia}
                      cx={point.x}
                      cy={point.y}
                      r="2.2"
                      fill="#be185d"
                    />
                  ))}
                </svg>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 grid grid-cols-7 text-[10px] text-gray-400">
                  {chartPoints.map(point => (
                    <span key={point.dia} className="text-center">{point.dia}</span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>

        <article className="card card-p">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="kpi-label">Entregas Pendientes</p>
              <p className="mt-3 text-4xl font-extrabold text-gray-900">{entregasPendientes.total}</p>
              <p className="mt-2 text-sm text-gray-500">Urgentes, hoy y mañana en un solo vistazo</p>
            </div>
            <div className="grid gap-3 sm:w-[280px]">
              <button
                type="button"
                onClick={() => setOrderFilter('Urgente')}
                className="rounded-3xl bg-red-50 px-4 py-3 text-left text-sm font-semibold text-red-700"
              >Urgentes: {entregasPendientes.urgentes}</button>
              <button
                type="button"
                onClick={() => setOrderFilter('Hoy')}
                className="rounded-3xl bg-pink-50 px-4 py-3 text-left text-sm font-semibold text-pink-700"
              >Hoy: {entregasPendientes.hoy}</button>
              <button
                type="button"
                onClick={() => setOrderFilter('Mañana')}
                className="rounded-3xl bg-purple-50 px-4 py-3 text-left text-sm font-semibold text-purple-700"
              >Mañana: {entregasPendientes.manana}</button>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {urgencyButtons.map(item => (
              <button
                key={item.value}
                type="button"
                onClick={() => setOrderFilter(item.value)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-150 ${orderFilter === item.value ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-600 border-gray-200 hover:border-pink-200 hover:text-pink-500'}`}
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
            <p className="text-sm text-gray-500">Últimas 5 órdenes con seguimiento rápido y detalle inmediato</p>
          </div>
          <Link to={ROUTES.PEDIDOS_CLIENTES} className="sec-link">
            Ver todas <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr>
                <th className="tbl-th">ID</th>
                <th className="tbl-th">Cliente</th>
                <th className="tbl-th">Arreglo</th>
                <th className="tbl-th">Total</th>
                <th className="tbl-th">Estado</th>
                <th className="tbl-th">Fecha Entrega</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr
                  key={order.id}
                  className="tbl-row"
                  onClick={() => setDetailOrder(order)}
                >
                  <td className="tbl-td">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        handleCopyId(order.id)
                      }}
                      className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-pink-600 hover:text-pink-800"
                    >
                      <ClipboardCopy className="h-4 w-4" />
                      {order.id}
                    </button>
                  </td>
                  <td className="tbl-td font-semibold text-gray-800">{order.client}</td>
                  <td className="tbl-td text-gray-500">{order.arrangement}</td>
                  <td className="tbl-td font-bold text-gray-900">{formatPrice(order.total)}</td>
                  <td className="tbl-td">
                    <span className={`badge ${statusBadgeClass(order.status)}`}>{order.status}</span>
                  </td>
                  <td className="tbl-td text-gray-400">{order.date}</td>
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
                <h3 className="mt-2 text-2xl font-extrabold text-gray-900">{detailOrder.id}</h3>
                <p className="text-sm text-gray-500">{detailOrder.client}</p>
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
                <p className="mt-2 text-base font-semibold text-gray-900">{detailOrder.client}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-[11px] uppercase tracking-[1.4px] text-gray-400">Arreglo</p>
                <p className="mt-2 text-base font-semibold text-gray-900">{detailOrder.arrangement}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-[11px] uppercase tracking-[1.4px] text-gray-400">Total</p>
                <p className="mt-2 text-base font-semibold text-gray-900">{formatPrice(detailOrder.total)}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-[11px] uppercase tracking-[1.4px] text-gray-400">Fecha Entrega</p>
                <p className="mt-2 text-base font-semibold text-gray-900">{detailOrder.date}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className={`badge ${statusBadgeClass(detailOrder.status)}`}>{detailOrder.status}</span>
              <span className="rounded-full bg-pink-50 px-3 py-2 text-sm font-semibold text-pink-700">Orden relacionada</span>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDetailOrder(null)}
                className="btn btn-secondary btn-sm"
              >Cerrar</button>
              <Link
                to={ROUTES.PEDIDOS_CLIENTES}
                className="btn btn-primary btn-sm"
              >Ver pedido completo</Link>
            </div>
          </div>
        </div>
      )}
    </div>
}

export default Dashboard