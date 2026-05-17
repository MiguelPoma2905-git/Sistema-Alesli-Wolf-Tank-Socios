import { useState, useEffect } from 'react'
import { Truck, Package, CheckCircle, XCircle, Clock, MapPin, User, Search, ChevronRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { getDeliveries } from '../../services/admin/dashboard'
import { clsx } from 'clsx'

const STATUSES = ['Asignado', 'En Ruta', 'Entregado', 'Fallido']

const STATUS_META = {
  'Asignado': { icon: Clock, color: 'amber', bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-500/20' },
  'En Ruta': { icon: Truck, color: 'blue', bg: 'bg-blue-50 dark:bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-500/20' },
  'Entregado': { icon: CheckCircle, color: 'emerald', bg: 'bg-emerald-50 dark:bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-500/20' },
  'Fallido': { icon: XCircle, color: 'red', bg: 'bg-red-50 dark:bg-red-500/10', text: 'text-red-600 dark:text-red-400', border: 'border-red-200 dark:border-red-500/20' },
}

function StatusBadge({ status }) {
  const meta = STATUS_META[status]
  if (!meta) return null
  const Icon = meta.icon
  return (
    <span className={clsx('inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold', meta.bg, meta.text)}>
      <Icon size={12} />
      {status}
    </span>
  )
}

function DeliveryCard({ delivery, dark }) {
  const meta = STATUS_META[delivery.estado_entrega]
  const Icon = meta.icon

  return (
    <div className={clsx(
      'rounded-2xl border p-4 transition-all hover:-translate-y-0.5 cursor-pointer',
      dark ? 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600' : 'bg-white border-gray-100 hover:shadow-md'
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center', meta.bg)}>
            <Icon size={16} className={meta.text} />
          </div>
          <div>
            <p className={clsx('text-sm font-extrabold', dark ? 'text-white' : 'text-gray-900')}>
              Pedido #{delivery.id_pedido}
            </p>
            <p className={clsx('text-[11px]', dark ? 'text-gray-500' : 'text-gray-400')}>
              {delivery.pedido_cliente || 'Cliente no registrado'}
            </p>
          </div>
        </div>
        <StatusBadge status={delivery.estado_entrega} />
      </div>

      <div className={clsx('flex items-center gap-2 text-xs', dark ? 'text-gray-400' : 'text-gray-500')}>
        <div className={clsx('flex items-center gap-1.5 px-3 py-1.5 rounded-lg', dark ? 'bg-gray-700/50' : 'bg-gray-50')}>
          <User size={12} />
          {delivery.delivery_nombre || 'Sin asignar'}
        </div>
        {delivery.fecha_entrega_real && (
          <div className={clsx('flex items-center gap-1.5 px-3 py-1.5 rounded-lg', dark ? 'bg-gray-700/50' : 'bg-gray-50')}>
            <MapPin size={12} />
            {new Date(delivery.fecha_entrega_real).toLocaleDateString('es-BO')}
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminEntregas() {
  const { dark } = useApp()
  const [deliveries, setDeliveries] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Todos')
  const [search, setSearch] = useState('')

  useEffect(() => {
    getDeliveries()
      .then(data => setDeliveries(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = deliveries.filter(d => {
    const matchStatus = activeTab === 'Todos' || d.estado_entrega === activeTab
    const matchSearch = !search || String(d.id_pedido).includes(search) || (d.pedido_cliente || '').toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const grouped = Object.fromEntries(STATUSES.map(s => [s, filtered.filter(d => d.estado_entrega === s)]))

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className={clsx(
        'rounded-2xl border p-6',
        dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
      )}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className={clsx('text-xl font-black', dark ? 'text-white' : 'text-gray-900')}>Gestión de Entregas</h1>
              <span className={clsx(
                'px-2.5 py-0.5 rounded-full text-[10px] font-bold',
                dark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'
              )}>{deliveries.length} registros</span>
            </div>
            <p className={clsx('text-[13px] mt-1', dark ? 'text-gray-500' : 'text-gray-400')}>
              Controla y da seguimiento a todas las entregas realizadas
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: 'Total', count: deliveries.length, icon: Package, color: 'text-gray-600 dark:text-gray-300', bg: dark ? 'bg-gray-800' : 'bg-gray-50' },
            { label: 'Asignados', count: deliveries.filter(d => d.estado_entrega === 'Asignado').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
            { label: 'En Ruta', count: deliveries.filter(d => d.estado_entrega === 'En Ruta').length, icon: Truck, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
            { label: 'Entregados', count: deliveries.filter(d => d.estado_entrega === 'Entregado').length, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
          ].map(item => (
            <div key={item.label} className={clsx('rounded-xl p-4 flex items-center gap-3', item.bg)}>
              <div className="w-10 h-10 rounded-xl bg-white/80 dark:bg-gray-800/80 flex items-center justify-center">
                <item.icon size={18} className={item.color} />
              </div>
              <div>
                <p className={clsx('text-[11px] font-bold uppercase tracking-wider', dark ? 'text-gray-500' : 'text-gray-400')}>{item.label}</p>
                <p className={clsx('text-xl font-extrabold', dark ? 'text-white' : 'text-gray-900')}>{item.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={clsx(
        'rounded-2xl border',
        dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
      )}>
        <div className="flex items-center gap-3 p-4 border-b dark:border-gray-800 flex-wrap">
          {['Todos', ...STATUSES].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                'px-4 py-1.5 rounded-full text-[11px] font-bold transition-all',
                activeTab === tab
                  ? 'bg-pink-500 text-white shadow-sm'
                  : (dark ? 'bg-gray-800 text-gray-400 hover:text-gray-200' : 'bg-gray-100 text-gray-500 hover:text-gray-700')
              )}
            >
              {tab === 'Todos' ? 'Todos' : tab}
              <span className="ml-1.5 opacity-60">({tab === 'Todos' ? deliveries.length : deliveries.filter(d => d.estado_entrega === tab).length})</span>
            </button>
          ))}
          <div className="ml-auto relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar pedido o cliente..."
              className={clsx(
                'pl-9 pr-3 py-1.5 rounded-full text-[11px] font-semibold outline-none w-56',
                dark ? 'bg-gray-800 text-gray-300 placeholder-gray-500' : 'bg-gray-50 text-gray-700 placeholder-gray-400'
              )}
            />
          </div>
        </div>

        <div className="p-4">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Package size={36} className="mx-auto text-gray-300 mb-3" />
              <p className={clsx('font-semibold', dark ? 'text-gray-500' : 'text-gray-400')}>No se encontraron entregas</p>
            </div>
          ) : activeTab === 'Todos' ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STATUSES.map(status => (
                <div key={status} className="space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={clsx('w-2 h-2 rounded-full', STATUS_META[status].text.replace('text-', 'bg-'))} />
                    <span className={clsx('text-[11px] font-bold uppercase tracking-wider', dark ? 'text-gray-500' : 'text-gray-400')}>
                      {status}
                    </span>
                    <span className={clsx('text-[10px] font-bold px-1.5 py-0.5 rounded-full', STATUS_META[status].bg, STATUS_META[status].text)}>
                      {grouped[status].length}
                    </span>
                  </div>
                  {grouped[status].length === 0 ? (
                    <div className={clsx('rounded-xl border-2 border-dashed p-6 text-center', dark ? 'border-gray-700' : 'border-gray-200')}>
                      <p className={clsx('text-[11px] font-semibold', dark ? 'text-gray-600' : 'text-gray-400')}>Sin entregas</p>
                    </div>
                  ) : (
                    grouped[status].map(d => (
                      <DeliveryCard key={d.id_entrega} delivery={d} dark={dark} />
                    ))
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map(d => (
                <DeliveryCard key={d.id_entrega} delivery={d} dark={dark} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={clsx(
        'rounded-2xl border p-6',
        dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
      )}>
        <h2 className={clsx('text-[15px] font-extrabold mb-1', dark ? 'text-white' : 'text-gray-900')}>Próximas funcionalidades</h2>
        <p className={clsx('text-[13px] mb-4', dark ? 'text-gray-500' : 'text-gray-400')}>Estamos construyendo herramientas para mejorar la logística de entregas.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: MapPin, title: 'Mapa en vivo', desc: 'Seguimiento GPS de entregas en tiempo real' },
            { icon: User, title: 'Asignación inteligente', desc: 'Asigna automáticamente el delivery más cercano' },
            { icon: Truck, title: 'Rutas óptimas', desc: 'Optimiza recorridos para entregas múltiples' },
          ].map(f => (
            <div key={f.title} className={clsx('rounded-xl p-4 flex items-start gap-3', dark ? 'bg-gray-800' : 'bg-gray-50')}>
              <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', dark ? 'bg-gray-700' : 'bg-white')}>
                <f.icon size={16} className="text-pink-500" />
              </div>
              <div>
                <p className={clsx('text-sm font-bold', dark ? 'text-gray-200' : 'text-gray-800')}>{f.title}</p>
                <p className={clsx('text-[11px] mt-0.5', dark ? 'text-gray-500' : 'text-gray-400')}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}