import { useEffect, useState, useMemo, useCallback } from 'react'
import { MapPin, Truck, Clock3, Phone, CalendarDays, CheckCircle2, ChevronRight, Activity } from 'lucide-react'
import Button from '../../components/ui/Button'
import { useApp } from '../../context/AppContext'

const DRIVERS = [
  { id: 'drv-1', name: 'Luis Mamani', phone: '+591 68 123 4567' },
  { id: 'drv-2', name: 'Pedro Ríos', phone: '+591 79 321 0456' },
  { id: 'drv-3', name: 'Carlos Vega', phone: '+591 76 987 6543' },
]

const STATUS_FLOW = ['Preparando', 'Asignado', 'En Ruta', 'Entregado']

const statusStyles = {
  Preparando: 'bg-amber-100 text-amber-700',
  Asignado: 'bg-sky-100 text-sky-700',
  'En Ruta': 'bg-violet-100 text-violet-700',
  Entregado: 'bg-emerald-100 text-emerald-700',
}

function Entregas() {
  const { deliveries, updateDelivery, addDeliveryNotification, showToast } = useApp()
  const [selectedDeliveryId, setSelectedDeliveryId] = useState(deliveries[0]?.id || null)
  const [driverSelection, setDriverSelection] = useState('')

  const selectedDelivery = useMemo(
    () => deliveries.find((delivery) => delivery.id === selectedDeliveryId) || deliveries[0],
    [deliveries, selectedDeliveryId],
  )

  useEffect(() => {
    if (!selectedDelivery) return
    setDriverSelection(selectedDelivery.driver?.id || '')
  }, [selectedDelivery])

  const handleDriverChange = useCallback((event) => {
    setDriverSelection(event.target.value)
  }, [])

  const handleAssignDriver = useCallback(() => {
    if (!selectedDelivery) return
    const driver = DRIVERS.find((item) => item.id === driverSelection)
    if (!driver) {
      showToast('Selecciona un repartidor válido', 'error', '⚠️')
      return
    }
    updateDelivery(selectedDelivery.id, { driver, status: 'Asignado' })
    const message = `Entrega ${selectedDelivery.id} asignada a ${driver.name}`
    showToast(message, 'success', '🚚')
    addDeliveryNotification(message)
  }, [selectedDelivery, driverSelection, showToast, updateDelivery, addDeliveryNotification])

  const handleChangeStatus = useCallback(() => {
    if (!selectedDelivery) return

    if (selectedDelivery.status === 'Preparando') {
      if (!selectedDelivery.driver) {
        showToast('Asigna un repartidor antes de iniciar la ruta', 'error', '⚠️')
        return
      }
      updateDelivery(selectedDelivery.id, { status: 'Asignado' })
      const message = `Entrega ${selectedDelivery.id} preparada y lista para iniciar` 
      showToast(message, 'success', '✅')
      addDeliveryNotification(message)
      return
    }

    if (selectedDelivery.status === 'Asignado') {
      updateDelivery(selectedDelivery.id, { status: 'En Ruta' })
      const message = `Repartidor en camino: ${selectedDelivery.driver?.name || 'Sin conductor'}`
      showToast(message, 'success', '🚚')
      addDeliveryNotification(message)
      return
    }

    if (selectedDelivery.status === 'En Ruta') {
      updateDelivery(selectedDelivery.id, { status: 'Entregado' })
      const message = `Entrega ${selectedDelivery.id} completada exitosamente`
      showToast(message, 'success', '🎉')
      addDeliveryNotification(message)
      return
    }
  }, [selectedDelivery, updateDelivery, showToast, addDeliveryNotification])

  const handleMarkDelivered = useCallback(() => {
    if (!selectedDelivery || selectedDelivery.status === 'Entregado') return
    if (!window.confirm('¿Confirmas que esta entrega ha sido entregada?')) return
    updateDelivery(selectedDelivery.id, { status: 'Entregado' })
    const message = `Entrega ${selectedDelivery.id} marcada como entregada`
    showToast(message, 'success', '🎉')
    addDeliveryNotification(message)
  }, [selectedDelivery, showToast, updateDelivery, addDeliveryNotification])

  useEffect(() => {
    const interval = setInterval(() => {
      const candidates = deliveries.filter((delivery) => delivery.status !== 'Entregado')
      if (candidates.length === 0) return
      const next = candidates[Math.floor(Math.random() * candidates.length)]
      let nextStatus = null

      if (next.status === 'Preparando' && next.driver) nextStatus = 'Asignado'
      if (next.status === 'Asignado') nextStatus = 'En Ruta'
      if (next.status === 'En Ruta') nextStatus = 'Entregado'
      if (!nextStatus) return

      updateDelivery(next.id, { status: nextStatus })
      const message = nextStatus === 'En Ruta'
        ? `Entrega ${next.id} está en ruta`
        : `Entrega ${next.id} entregada`
      showToast(message, 'success', '🚚')
      addDeliveryNotification(message)
    }, 30000)

    return () => clearInterval(interval)
  }, [deliveries, updateDelivery, addDeliveryNotification, showToast])

  if (!selectedDelivery) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Entregas</h1>
        <p className="mt-4 text-sm text-slate-500">No hay entregas disponibles.</p>
      </div>
    )
  }

  const currentStep = STATUS_FLOW.indexOf(selectedDelivery.status)
  const canUpdateStatus = selectedDelivery.status !== 'Entregado'
  const nextActionLabel = selectedDelivery.status === 'Preparando'
    ? selectedDelivery.driver ? 'Iniciar ruta' : 'Asignar conductor'
    : selectedDelivery.status === 'Asignado'
      ? 'Marcar En Ruta'
      : selectedDelivery.status === 'En Ruta'
        ? 'Marcar Entregado'
        : 'Entregado'

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Operaciones</p>
          <h1 className="text-3xl font-bold">Entregas activas</h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="rounded-3xl bg-slate-100 px-4 py-3 text-slate-700 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Actualización</p>
            <p className="text-sm font-semibold">Cada 30 segundos</p>
          </div>
          <Button variant="secondary" size="md" onClick={() => showToast('Refrescando vista de entregas...', 'success', '🔄')}>
            Refrescar ahora
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[385px_1fr]">
        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Lista de entregas</p>
              <p className="text-xs text-slate-500">Entregas en curso y pendientes</p>
            </div>
            <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-700">
              {deliveries.filter((delivery) => delivery.status !== 'Entregado').length} activas
            </span>
          </div>

          <div className="space-y-3">
            {deliveries.map((delivery) => (
              <button
                key={delivery.id}
                type="button"
                onClick={() => setSelectedDeliveryId(delivery.id)}
                className={`w-full rounded-3xl border p-4 text-left transition-all ${
                  delivery.id === selectedDelivery.id ? 'border-pink-300 bg-pink-50 shadow-sm' : 'border-slate-200 bg-white hover:border-pink-200'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{delivery.client}</p>
                    <p className="text-xs text-slate-500">{delivery.order} · {delivery.product}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${statusStyles[delivery.status]}`}>
                    {delivery.status}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{delivery.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4" />
                    <span>{delivery.scheduled} · {delivery.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    <span>{delivery.driver?.name ?? 'Sin conductor'}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Detalle de entrega</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">{selectedDelivery.id}</h2>
            </div>
            <span className={`rounded-3xl px-4 py-2 text-sm font-semibold ${statusStyles[selectedDelivery.status]}`}>
              {selectedDelivery.status}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Cliente</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{selectedDelivery.client}</p>
              <p className="mt-1 text-sm text-slate-600">{selectedDelivery.address}</p>
              <p className="mt-3 text-sm text-slate-600">{selectedDelivery.product}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Phone className="h-4 w-4" />
                <span>Teléfono</span>
              </div>
              <p className="mt-2 text-lg font-semibold text-slate-900">{selectedDelivery.phone}</p>
              <div className="mt-4 grid gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>{selectedDelivery.scheduled} · {selectedDelivery.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  <span>{selectedDelivery.distance} · ETA {selectedDelivery.eta}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Progreso de entrega</p>
            <div className="space-y-3">
              {STATUS_FLOW.map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border ${index <= currentStep ? 'border-pink-500 bg-pink-100 text-pink-700' : 'border-slate-200 bg-white text-slate-400'}`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{step}</p>
                    <p className="text-xs text-slate-500">{index < currentStep ? 'Completado' : index === currentStep ? 'En curso' : 'Pendiente'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1fr_280px]">
            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5">
              <div>
                <p className="text-sm font-semibold text-slate-900">Asignar repartidor</p>
                <p className="mt-1 text-sm text-slate-500">Controla quién entrega este pedido.</p>
              </div>
              <select
                value={driverSelection}
                onChange={handleDriverChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-pink-300"
              >
                <option value="">Selecciona un repartidor</option>
                {DRIVERS.map((driver) => (
                  <option key={driver.id} value={driver.id}>{driver.name}</option>
                ))}
              </select>
              <Button
                variant="primary"
                size="md"
                full
                onClick={handleAssignDriver}
              >
                {selectedDelivery.driver ? 'Reasignar conductor' : 'Asignar conductor'}
              </Button>
            </div>

            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5">
              <div>
                <p className="text-sm font-semibold text-slate-900">Acciones rápidas</p>
                <p className="mt-1 text-sm text-slate-500">Actualiza el estado o contacta al conductor.</p>
              </div>
              <div className="grid gap-3">
                <Button
                  variant="secondary"
                  size="md"
                  full
                  disabled={!canUpdateStatus}
                  onClick={handleChangeStatus}
                >
                  {nextActionLabel}
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  full
                  onClick={handleMarkDelivered}
                >
                  Marcar como entregado
                </Button>
                <a
                  href={`tel:${selectedDelivery.driver?.phone ?? selectedDelivery.phone}`}
                  className="inline-flex w-full items-center justify-center rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-pink-300"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Llamar {selectedDelivery.driver?.name ? 'al conductor' : 'al cliente'}
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">Ruta simulada</p>
                <p className="mt-1 text-sm text-slate-500">Visualiza el recorrido estimado.</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="h-4 w-4" />
                <span>{selectedDelivery.distance}</span>
              </div>
            </div>
            <div className="mt-5 rounded-[2rem] border border-dashed border-slate-200 bg-white p-5">
              <div className="grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Inicio</p>
                  <p className="mt-2 font-semibold text-slate-900">{selectedDelivery.route.from}</p>
                </div>
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Destino</p>
                  <p className="mt-2 font-semibold text-slate-900">{selectedDelivery.route.to}</p>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between rounded-3xl bg-pink-50 p-4 text-sm text-pink-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>{selectedDelivery.status === 'Entregado' ? 'Entrega completada' : 'En camino hacia destino'}</span>
                </div>
                <span>{selectedDelivery.eta}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Entregas