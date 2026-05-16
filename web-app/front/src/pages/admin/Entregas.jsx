import { useState, useEffect } from 'react'
import { Truck, MapPin, CheckCircle, X } from 'lucide-react'
import { useToast } from '../../context/ToastContext'
import { getDeliveries, updateDeliveryStatus } from '../../services/admin/dashboard'

const statusBadgeClass = (status) => {
  const map = {
    'Asignado': 'badge-pendiente',
    'En Ruta': 'badge-proceso',
    'Entregado': 'badge-entregado',
    'Fallido': 'badge-cancelado',
  }
  return map[status] || 'badge-pendiente'
}

export default function AdminEntregas() {
  const { addToast } = useToast()
  const [deliveries, setDeliveries] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const data = await getDeliveries().catch(() => [])
    setDeliveries(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleStatusChange = async (id, estado) => {
    try {
      await updateDeliveryStatus(id, estado)
      addToast(`Entrega actualizada a "${estado}"`, 'success')
      load()
    } catch {
      addToast('Error al actualizar entrega', 'error')
    }
  }

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
          <h2 className="text-[22px] font-extrabold text-gray-800">Entregas</h2>
          <p className="text-sm text-gray-500">{deliveries.length} entregas registradas</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="tbl-th">Pedido</th>
                <th className="tbl-th">Delivery</th>
                <th className="tbl-th">Estado</th>
                <th className="tbl-th">Fecha</th>
                <th className="tbl-th">Acción</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map(d => (
                <tr key={d.id_entrega} className="tbl-row">
                  <td className="tbl-td font-semibold text-gray-800">#{d.id_pedido}</td>
                  <td className="tbl-td">{d.delivery_nombre || 'Sin asignar'}</td>
                  <td className="tbl-td">
                    <span className={`badge ${statusBadgeClass(d.estado_entrega)}`}>{d.estado_entrega}</span>
                  </td>
                  <td className="tbl-td text-gray-400">
                    {d.fecha_entrega_real ? new Date(d.fecha_entrega_real).toLocaleDateString('es-BO') : '--'}
                  </td>
                  <td className="tbl-td">
                    <select
                      value={d.estado_entrega}
                      onChange={e => handleStatusChange(d.id_entrega, e.target.value)}
                      className="bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-[11px] font-semibold outline-none focus:border-pink-500 cursor-pointer"
                    >
                      <option value="Asignado">Asignado</option>
                      <option value="En Ruta">En Ruta</option>
                      <option value="Entregado">Entregado</option>
                      <option value="Fallido">Fallido</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
