import { useState, useEffect } from 'react'
import { ClipboardCopy, ChevronRight, CheckCircle, X, Clock, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getOrders, updateOrder } from '../../services/pedidos'
import { useToast } from '../../context/ToastContext'
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

const STATUS_ICONS = {
  'Pendiente': Clock,
  'En preparación': Clock,
  'Listo': CheckCircle,
  'Entregado': CheckCircle,
  'Cancelado': X,
  'En camino': Truck,
}

export default function AdminPedidos() {
  const { addToast } = useToast()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('Todos')

  const load = async () => {
    setLoading(true)
    const data = await getOrders().catch(() => [])
    setOrders(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrder(id, { estado: newStatus })
      addToast(`Estado cambiado a "${newStatus}"`, 'success')
      load()
    } catch {
      addToast('Error al cambiar estado', 'error')
    }
  }

  const filtered = statusFilter === 'Todos'
    ? orders
    : orders.filter(o => o.estado === statusFilter)

  const handleCopyId = async (id) => {
    try {
      await navigator.clipboard.writeText(String(id))
      addToast(`ID #${id} copiado`, 'success')
    } catch {
      addToast('Error al copiar', 'error')
    }
  }

  const statuses = ['Todos', 'Pendiente', 'En preparación', 'Listo', 'En camino', 'Entregado', 'Cancelado']

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-extrabold text-gray-800">Pedidos</h2>
          <p className="text-sm text-gray-500">{orders.length} pedidos en total</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-full border px-4 py-1.5 text-[12px] font-semibold transition-all ${
              statusFilter === s
                ? 'bg-pink-500 text-white border-pink-500'
                : 'bg-white text-gray-600 border-gray-200 hover:border-pink-200 hover:text-pink-500'
            }`}
          >
            {s} {s !== 'Todos' && `(${orders.filter(o => o.estado === s).length})`}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="tbl-th">ID</th>
                <th className="tbl-th">Cliente</th>
                <th className="tbl-th">Total</th>
                <th className="tbl-th">Estado</th>
                <th className="tbl-th">Entrega</th>
                <th className="tbl-th">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => {
                const StatusIcon = STATUS_ICONS[o.estado] || Clock
                return (
                  <tr key={o.id_pedido} className="tbl-row">
                    <td className="tbl-td">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleCopyId(o.id_pedido) }}
                        className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-pink-600 hover:text-pink-800"
                      >
                        <ClipboardCopy size={14} />
                        #{o.id_pedido}
                      </button>
                    </td>
                    <td className="tbl-td font-semibold text-gray-800">{o.cliente_nombre || 'N/A'}</td>
                    <td className="tbl-td font-bold">{formatPrice(o.total_final || 0)}</td>
                    <td className="tbl-td">
                      <span className={`badge ${statusBadgeClass(o.estado)}`}>{o.estado}</span>
                    </td>
                    <td className="tbl-td text-gray-400">
                      {o.fecha_entrega ? new Date(o.fecha_entrega).toLocaleDateString('es-BO') : '--'}
                    </td>
                    <td className="tbl-td">
                      <select
                        value={o.estado}
                        onChange={e => handleStatusChange(o.id_pedido, e.target.value)}
                        className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[11px] font-semibold outline-none focus:border-pink-500 cursor-pointer"
                      >
                        {statuses.filter(s => s !== 'Todos').map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
