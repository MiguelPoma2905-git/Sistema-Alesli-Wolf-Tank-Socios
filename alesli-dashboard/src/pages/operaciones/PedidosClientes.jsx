import { useMemo, useState } from 'react'
import { Edit3, Eye, Move, Plus, Trash2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatPrice, genOrderId } from '../../utils/helpers'

const STATUSES = ['Nuevos', 'En Proceso', 'Listo', 'Entregado']
const PRIORITY_OPTIONS = ['Todos', 'Alta', 'Media', 'Baja']

const ORDER_PRIORITIES = {
  'ORD-089': 'Alta',
  'ORD-088': 'Media',
  'ORD-087': 'Alta',
  'ORD-086': 'Baja',
  'ORD-085': 'Media',
  'ORD-084': 'Alta',
  'ORD-083': 'Media',
  'ORD-082': 'Baja',
  'ORD-081': 'Media',
  'ORD-080': 'Alta',
  'ORD-079': 'Baja',
  'ORD-078': 'Media',
}

const priorityClass = (priority) => {
  if (priority === 'Alta') return 'bg-rose-100 text-rose-700'
  if (priority === 'Media') return 'bg-amber-100 text-amber-700'
  return 'bg-emerald-100 text-emerald-700'
}

const normalizeStatus = (status) => (status === 'Pendiente' ? 'Nuevos' : status)

function PedidosClientes() {
  const {
    orders,
    addOrder,
    updateOrderStatus,
    editOrder,
    deleteOrder,
    showToast,
  } = useApp()

  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('Todos')
  const [menuOpenId, setMenuOpenId] = useState(null)
  const [detailOrder, setDetailOrder] = useState(null)
  const [editingOrder, setEditingOrder] = useState(null)
  const [newOrderForm, setNewOrderForm] = useState({ client: '', arrangement: '', total: '', date: '' })
  const [draggedOrderId, setDraggedOrderId] = useState(null)
  const [deliveryConfirm, setDeliveryConfirm] = useState(null)
  const [deliveryDate, setDeliveryDate] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')

  const visibleOrders = useMemo(() => orders.filter((order) => {
    const matchesSearch = [order.id, order.client].some((field) =>
      field.toLowerCase().includes(search.toLowerCase()),
    )

    const priority = ORDER_PRIORITIES[order.id] ?? 'Media'
    const matchesPriority = priorityFilter === 'Todos' || priority === priorityFilter

    return matchesSearch && matchesPriority
  }), [orders, priorityFilter, search])

  const columns = useMemo(
    () => STATUSES.map((status) => ({
      status,
      orders: visibleOrders.filter((order) => normalizeStatus(order.status) === status),
    })),
    [visibleOrders],
  )

  const handleAddOrder = () => {
    if (!newOrderForm.client || !newOrderForm.arrangement || !newOrderForm.total) {
      showToast('Completa el cliente, arreglo y total del pedido', 'warning', '⚠️')
      return
    }

    addOrder({
      id: genOrderId(),
      client: newOrderForm.client,
      arrangement: newOrderForm.arrangement,
      total: Number(newOrderForm.total) || 0,
      status: 'Nuevos',
      date: newOrderForm.date || 'Hoy, 12:00',
    })

    setNewOrderForm({ client: '', arrangement: '', total: '', date: '' })
  }

  const handleMoveOrder = (order, targetStatus) => {
    setMenuOpenId(null)
    if (targetStatus === 'Entregado' && normalizeStatus(order.status) !== 'Entregado') {
      setDeliveryConfirm({ order, targetStatus })
      return
    }
    updateOrderStatus(order.id, targetStatus)
  }

  const handleDrop = (targetStatus, event) => {
    event.preventDefault()
    const orderId = event.dataTransfer.getData('text/plain')
    const order = orders.find((item) => item.id === orderId)
    if (!order) return
    handleMoveOrder(order, targetStatus)
  }

  const handleConfirmDelivery = () => {
    if (!deliveryConfirm) return
    const { order } = deliveryConfirm
    const dateValue = deliveryDate || order.date
    const timeValue = deliveryTime || '18:00'
    editOrder(order.id, { status: 'Entregado', date: `${dateValue} · ${timeValue}` })
    setDeliveryConfirm(null)
    setDeliveryDate('')
    setDeliveryTime('')
  }

  const handleSaveEdit = () => {
    if (!editingOrder) return
    if (!editingOrder.client || !editingOrder.arrangement || !editingOrder.total) {
      showToast('Completa los campos requeridos', 'warning', '⚠️')
      return
    }
    editOrder(editingOrder.id, {
      client: editingOrder.client,
      arrangement: editingOrder.arrangement,
      total: Number(editingOrder.total) || 0,
      date: editingOrder.date,
    })
    setEditingOrder(null)
  }

  const handleDeleteOrder = (order) => {
    if (window.confirm(`¿Eliminar ${order.id}? Esta acción no se puede deshacer.`)) {
      deleteOrder(order.id)
      setDetailOrder(null)
      setEditingOrder(null)
      showToast('Pedido eliminado', 'error', '🗑️')
    }
  }

  return (
    <div className="space-y-8 p-6">
      <section className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">Pedidos</p>
            <h1 className="mt-3 text-3xl font-extrabold text-gray-900">Lista de producción</h1>
            <p className="mt-2 text-sm text-gray-500">Organiza pedidos por estado, prioridad y edición rápida.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-80">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por ID o cliente..."
                className="input w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              {PRIORITY_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPriorityFilter(option)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${priorityFilter === option ? 'bg-pink-500 text-white border-pink-500' : 'bg-white text-gray-700 border-gray-200 hover:border-pink-200 hover:text-pink-600'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-4">
        {columns.map((column) => (
          <section
            key={column.status}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(column.status, event)}
            className="card card-p min-h-[560px]"
          >
            <div className="mb-4 flex items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{column.status}</h2>
                <p className="text-sm text-gray-500">{column.orders.length} pedidos</p>
              </div>
              {column.status === 'Nuevos' && (
                <span className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-700">
                  <Plus className="h-4 w-4" /> Nuevo
                </span>
              )}
            </div>

            {column.status === 'Nuevos' && (
              <div className="mb-4 rounded-3xl border border-gray-100 bg-gray-50 p-4">
                <p className="text-sm font-semibold text-gray-700">Crear nuevo pedido</p>
                <div className="mt-3 space-y-3">
                  <input
                    type="text"
                    placeholder="Cliente"
                    value={newOrderForm.client}
                    onChange={(event) => setNewOrderForm((prev) => ({ ...prev, client: event.target.value }))}
                    className="input"
                  />
                  <input
                    type="text"
                    placeholder="Producto / Arreglo"
                    value={newOrderForm.arrangement}
                    onChange={(event) => setNewOrderForm((prev) => ({ ...prev, arrangement: event.target.value }))}
                    className="input"
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="number"
                      placeholder="Total (Bs)"
                      value={newOrderForm.total}
                      onChange={(event) => setNewOrderForm((prev) => ({ ...prev, total: event.target.value }))}
                      className="input"
                    />
                    <input
                      type="text"
                      placeholder="Fecha / Hora"
                      value={newOrderForm.date}
                      onChange={(event) => setNewOrderForm((prev) => ({ ...prev, date: event.target.value }))}
                      className="input"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddOrder}
                    className="btn btn-primary btn-sm w-full"
                  >
                    Agregar pedido
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {column.orders.map((order) => {
                const priority = ORDER_PRIORITIES[order.id] ?? 'Media'
                return (
                  <article
                    key={order.id}
                    draggable
                    onDragStart={() => setDraggedOrderId(order.id)}
                    onDragEnd={() => setDraggedOrderId(null)}
                    className="rounded-[28px] border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-gray-900">{order.id}</p>
                        <p className="mt-1 text-sm text-gray-500">{order.client}</p>
                      </div>
                      <span className={`badge ${priorityClass(priority)}`}>{priority}</span>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-gray-500">
                      <p>{order.arrangement}</p>
                      <p>{formatPrice(order.total, 'Bs ')}</p>
                      <p>{order.date}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-2 text-gray-500">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingOrder({ ...order, total: order.total.toString() })}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDetailOrder(order)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setMenuOpenId(menuOpenId === order.id ? null : order.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                        >
                          <Move className="h-4 w-4" />
                        </button>
                        {menuOpenId === order.id && (
                          <div className="absolute right-0 top-11 z-10 w-40 rounded-3xl border border-gray-200 bg-white p-2 shadow-lg">
                            {STATUSES.filter((status) => status !== normalizeStatus(order.status)).map((statusOption) => (
                              <button
                                key={statusOption}
                                type="button"
                                onClick={() => handleMoveOrder(order, statusOption)}
                                className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm text-gray-700 hover:bg-pink-50"
                              >
                                <span>{statusOption}</span>
                                <ArrowRight className="h-4 w-4 text-pink-500" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleDeleteOrder(order)}
                        className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-2 text-[12px] font-semibold text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" /> Eliminar
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {detailOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-[32px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">Detalle del pedido</p>
                <h2 className="mt-2 text-2xl font-extrabold text-gray-900">{detailOrder.id}</h2>
              </div>
              <button
                type="button"
                onClick={() => setDetailOrder(null)}
                className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"
              >✕</button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Cliente</p>
                <p className="mt-2 text-base font-semibold text-gray-900">{detailOrder.client}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Producto</p>
                <p className="mt-2 text-base font-semibold text-gray-900">{detailOrder.arrangement}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Total</p>
                <p className="mt-2 text-base font-semibold text-gray-900">{formatPrice(detailOrder.total, 'Bs ')}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Estado</p>
                <p className="mt-2 text-base font-semibold text-gray-900">{normalizeStatus(detailOrder.status)}</p>
              </div>
              <div className="rounded-3xl bg-gray-50 p-5">
                <p className="text-sm text-gray-500">Fecha</p>
                <p className="mt-2 text-base font-semibold text-gray-900">{detailOrder.date}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDetailOrder(null)}
                className="btn btn-secondary btn-sm"
              >Cerrar</button>
              <button
                type="button"
                onClick={() => {
                  setEditingOrder({ ...detailOrder, total: detailOrder.total.toString() })
                  setDetailOrder(null)
                }}
                className="btn btn-primary btn-sm"
              >Editar</button>
            </div>
          </div>
        </div>
      )}

      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-[32px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">Editar pedido</p>
                <h2 className="mt-2 text-2xl font-extrabold text-gray-900">{editingOrder.id}</h2>
              </div>
              <button
                type="button"
                onClick={() => setEditingOrder(null)}
                className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"
              >✕</button>
            </div>
            <div className="mt-6 grid gap-4">
              <input
                type="text"
                value={editingOrder.client}
                onChange={(event) => setEditingOrder((prev) => ({ ...prev, client: event.target.value }))}
                className="input"
              />
              <input
                type="text"
                value={editingOrder.arrangement}
                onChange={(event) => setEditingOrder((prev) => ({ ...prev, arrangement: event.target.value }))}
                className="input"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="number"
                  value={editingOrder.total}
                  onChange={(event) => setEditingOrder((prev) => ({ ...prev, total: event.target.value }))}
                  className="input"
                />
                <input
                  type="text"
                  value={editingOrder.date}
                  onChange={(event) => setEditingOrder((prev) => ({ ...prev, date: event.target.value }))}
                  className="input"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingOrder(null)}
                className="btn btn-secondary btn-sm"
              >Cancelar</button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="btn btn-primary btn-sm"
              >Guardar cambios</button>
            </div>
          </div>
        </div>
      )}

      {deliveryConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-[32px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[1.5px] text-pink-500">Confirmar entrega</p>
                <h2 className="mt-2 text-2xl font-extrabold text-gray-900">{deliveryConfirm.order.id}</h2>
              </div>
              <button
                type="button"
                onClick={() => setDeliveryConfirm(null)}
                className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200"
              >✕</button>
            </div>
            <div className="mt-6 grid gap-4">
              <p className="text-sm text-gray-500">Para mover este pedido a Entregado, confirma la fecha y hora de entrega.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(event) => setDeliveryDate(event.target.value)}
                  className="input"
                />
                <input
                  type="time"
                  value={deliveryTime}
                  onChange={(event) => setDeliveryTime(event.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeliveryConfirm(null)}
                className="btn btn-secondary btn-sm"
              >Cancelar</button>
              <button
                type="button"
                onClick={handleConfirmDelivery}
                className="btn btn-primary btn-sm"
              >Confirmar entrega</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PedidosClientes