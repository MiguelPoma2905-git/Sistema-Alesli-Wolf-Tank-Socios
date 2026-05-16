import { useState } from 'react'
import { Eye, Pencil, Trash2, Printer } from 'lucide-react'
import Badge from '../ui/Badge'
import { SearchInput } from '../ui/Input'
import Dropdown from '../ui/Dropdown'
import { formatPrice } from '../../utils/helpers'
import { useApp } from '../../context/AppContext'
import { useOrders } from '../../hooks/useOrders'
import Modal from '../ui/Modal'
import Input, { Select } from '../ui/Input'
import Button from '../ui/Button'

const STATUS_OPTIONS = ['Todos','En Proceso','Pendiente','Listo','Entregado','Cancelado']
const PER_PAGE = 7

export default function OrdersTable() {
  const { updateOrderStatus, deleteOrder, addOrder, showToast } = useApp()
  const {
    data, total, page, totalPages, setPage,
    search, setSearch, statusFilter, setStatusFilter,
  } = useOrders()

  const [newOrderModal, setNewOrderModal] = useState(false)
  const [detailModal,   setDetailModal]   = useState(null)
  const [form, setForm] = useState({ client: '', arrangement: '', total: '', date: '', status: 'En Proceso' })

  const handleAdd = () => {
    if (!form.client || !form.arrangement) {
      showToast('Completa los campos requeridos', 'warning', '⚠️')
      return
    }
    const id = `ORD-${String(Math.floor(Math.random() * 900) + 90)}`
    addOrder({
      id,
      client:      form.client,
      arrangement: form.arrangement,
      total:       Number(form.total) || 0,
      status:      form.status,
      date:        form.date || 'Hoy',
    })
    setForm({ client: '', arrangement: '', total: '', date: '', status: 'En Proceso' })
    setNewOrderModal(false)
  }

  const rowActions = (order) => [
    {
      label: 'Ver detalles', icon: <Eye size={13} />,
      onClick: () => setDetailModal(order),
    },
    {
      label: 'Marcar como Listo', icon: <Pencil size={13} />,
      onClick: () => updateOrderStatus(order.id, 'Listo'),
    },
    {
      label: 'Imprimir', icon: <Printer size={13} />,
      onClick: () => showToast(`Imprimiendo ${order.id}`, 'info', '🖨️'),
    },
    { divider: true },
    {
      label: 'Cancelar orden', icon: <Trash2 size={13} />, danger: true,
      onClick: () => deleteOrder(order.id),
    },
  ]

  return (
    <>
      {/* Table card */}
      <div className="bg-white rounded-lg border border-gray-100 shadow-card overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center gap-2.5 p-4 border-b border-gray-50 flex-wrap">
          <SearchInput value={search} onChange={setSearch} placeholder="Buscar órdenes..." />
          <div className="flex items-center gap-1.5 flex-wrap">
            {STATUS_OPTIONS.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`
                  px-3 py-1.5 rounded-xl text-[12px] font-semibold border transition-all duration-150
                  ${statusFilter === s
                    ? 'bg-pink-500 text-white border-pink-500 shadow-pink'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-pink-200 hover:text-pink-500'
                  }
                `}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="tbl-th">ID</th>
                <th className="tbl-th">Cliente</th>
                <th className="tbl-th">Arreglo</th>
                <th className="tbl-th">Total</th>
                <th className="tbl-th">Estado</th>
                <th className="tbl-th">Fecha Entrega</th>
                <th className="tbl-th w-12">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="text-[40px] mb-3">🌸</div>
                    <div className="text-[14px] font-bold text-gray-500">No se encontraron órdenes</div>
                    <p className="text-[12px] text-gray-400 mt-1">Prueba con otro término de búsqueda</p>
                  </td>
                </tr>
              ) : data.map(order => (
                <tr
                  key={order.id}
                  className="tbl-row"
                  onClick={() => setDetailModal(order)}
                >
                  <td className="tbl-td">
                    <span className="text-pink-500 font-bold text-[12px] font-mono">{order.id}</span>
                  </td>
                  <td className="tbl-td font-semibold text-gray-800">{order.client}</td>
                  <td className="tbl-td text-gray-500">{order.arrangement}</td>
                  <td className="tbl-td font-bold text-gray-800">{formatPrice(order.total)}</td>
                  <td className="tbl-td"><Badge status={order.status} /></td>
                  <td className="tbl-td text-gray-400 text-[12px]">{order.date}</td>
                  <td className="tbl-td" onClick={e => e.stopPropagation()}>
                    <Dropdown items={rowActions(order)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-50">
          <span className="text-[12px] text-gray-400">
            Mostrando <strong className="text-gray-600">{Math.min(PER_PAGE, data.length)}</strong> de <strong className="text-gray-600">{total}</strong> órdenes
          </span>
          <div className="flex items-center gap-1">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-[13px] text-gray-400 border border-gray-100 hover:border-pink-200 hover:text-pink-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >‹</button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`
                  w-8 h-8 rounded-xl flex items-center justify-center text-[12.5px] font-semibold
                  border transition-all
                  ${page === n
                    ? 'bg-pink-500 text-white border-pink-500 shadow-pink'
                    : 'border-gray-100 text-gray-500 hover:border-pink-200 hover:text-pink-500'
                  }
                `}
              >{n}</button>
            ))}
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-[13px] text-gray-400 border border-gray-100 hover:border-pink-200 hover:text-pink-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >›</button>
          </div>
        </div>
      </div>

      {/* Modal: Nuevo pedido */}
      <Modal
        open={newOrderModal}
        onClose={() => setNewOrderModal(false)}
        title="Nuevo Pedido"
        subtitle="Registra un nuevo pedido en el sistema"
      >
        <div className="grid grid-cols-2 gap-x-4">
          <Input
            label="Cliente" required placeholder="Nombre del cliente"
            value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))}
          />
          <Input
            label="Arreglo / Producto" required placeholder="Ej: Ramo 24 Rosas"
            value={form.arrangement} onChange={e => setForm(f => ({ ...f, arrangement: e.target.value }))}
          />
          <Input
            label="Total (Bs.)" type="number" placeholder="0"
            value={form.total} onChange={e => setForm(f => ({ ...f, total: e.target.value }))}
            prefix="$"
          />
          <Input
            label="Fecha entrega" type="date"
            value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
          />
          <Select
            label="Estado" className="col-span-2"
            value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            options={['En Proceso','Pendiente','Listo'].map(s => ({ value: s, label: s }))}
          />
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <Button variant="secondary" size="sm" onClick={() => setNewOrderModal(false)}>Cancelar</Button>
          <Button size="sm" onClick={handleAdd}>Crear Pedido</Button>
        </div>
      </Modal>

      {/* Modal: Detalle */}
      <Modal
        open={!!detailModal}
        onClose={() => setDetailModal(null)}
        title={`Detalle: ${detailModal?.id}`}
        subtitle={detailModal?.client}
      >
        {detailModal && (
          <div className="space-y-3">
            {[
              ['ID',            detailModal.id],
              ['Cliente',       detailModal.client],
              ['Arreglo',       detailModal.arrangement],
              ['Total',         formatPrice(detailModal.total)],
              ['Estado',        detailModal.status],
              ['Fecha entrega', detailModal.date],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                <span className="text-[12px] text-gray-400 font-medium">{k}</span>
                {k === 'Estado'
                  ? <Badge status={v} />
                  : <span className="text-[13px] font-bold text-gray-700">{v}</span>
                }
              </div>
            ))}
            <div className="flex gap-3 pt-2">
              <Button full variant="secondary" size="sm" onClick={() => setDetailModal(null)}>Cerrar</Button>
              <Button full size="sm" onClick={() => {
                updateOrderStatus(detailModal.id, 'Listo')
                setDetailModal(null)
              }}>Marcar como Listo</Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}