import { useState } from 'react'
import { Truck, MapPin, Clock, User, Package, ChevronRight, Navigation, Phone, Camera, CheckCircle, XCircle } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { clsx } from 'clsx'

const MOCK_DELIVERIES = [
  { id: 1, pedido: 1001, cliente: 'María García', direccion: 'Calle Bolívar #123', telefono: '+591 71234567', estado: 'Asignado', distancia: '2.3 km', hora: '14:30' },
  { id: 2, pedido: 1002, cliente: 'Juan Pérez', direccion: 'Av. 6 de Agosto #456', telefono: '+591 72345678', estado: 'Asignado', distancia: '4.1 km', hora: '15:00' },
  { id: 3, pedido: 1003, cliente: 'Ana López', direccion: 'Zona Sur, Calle 7 #789', telefono: '+591 73456789', estado: 'En Ruta', distancia: '1.8 km', hora: '13:45' },
  { id: 4, pedido: 1005, cliente: 'Carlos Rojas', direccion: 'Av. Ballivián #321', telefono: '+591 74567890', estado: 'Entregado', distancia: '3.5 km', hora: '12:00' },
  { id: 5, pedido: 1006, cliente: 'Sofía Vargas', direccion: 'Callejón Sucre #654', telefono: '+591 75678901', estado: 'Fallido', distancia: '5.2 km', hora: '11:30' },
]

const STATUS_META = {
  'Asignado': { icon: Clock, label: 'Asignado', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/20' },
  'En Ruta': { icon: Navigation, label: 'En Ruta', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-200 dark:border-blue-500/20' },
  'Entregado': { icon: CheckCircle, label: 'Entregado', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/20' },
  'Fallido': { icon: XCircle, label: 'Fallido', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-500/10', border: 'border-red-200 dark:border-red-500/20' },
}

function StatusTimeline({ status }) {
  const steps = ['Asignado', 'En Ruta', 'Entregado']
  const currentIdx = steps.indexOf(status)

  return (
    <div className="flex items-center gap-1">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className={clsx(
            'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold',
            i <= currentIdx ? 'bg-pink-500 text-white' : (status === 'Fallido' ? 'bg-red-100 dark:bg-red-500/20 text-red-500' : 'bg-gray-100 dark:bg-gray-700 text-gray-400')
          )}>
            {status === 'Fallido' && i === 2 ? <XCircle size={12} /> : i + 1}
          </div>
          {i < 2 && (
            <div className={clsx('w-6 h-0.5', i < currentIdx ? 'bg-pink-500' : (status === 'Fallido' ? 'bg-red-300' : 'bg-gray-200 dark:bg-gray-700'))} />
          )}
        </div>
      ))}
    </div>
  )
}

function DeliveryCard({ item, dark, onSelect, isSelected }) {
  const meta = STATUS_META[item.estado]
  const Icon = meta.icon

  return (
    <div
      onClick={() => onSelect(item)}
      className={clsx(
        'rounded-2xl border p-5 transition-all cursor-pointer',
        isSelected
          ? 'border-pink-500 shadow-lg shadow-pink-500/10'
          : (dark ? 'border-gray-700/50 hover:border-gray-600' : 'border-gray-100 hover:shadow-md'),
        dark ? 'bg-gray-800/50' : 'bg-white'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={clsx('w-11 h-11 rounded-xl flex items-center justify-center', meta.bg)}>
            <Icon size={20} className={meta.color} />
          </div>
          <div>
            <p className={clsx('text-sm font-extrabold', dark ? 'text-white' : 'text-gray-900')}>
              Pedido #{item.pedido}
            </p>
            <p className={clsx('text-[11px]', dark ? 'text-gray-500' : 'text-gray-400')}>{item.cliente}</p>
          </div>
        </div>
        <span className={clsx('text-[10px] font-bold px-2 py-1 rounded-full', meta.bg, meta.color)}>
          {item.estado}
        </span>
      </div>

      <div className="space-y-1.5 mb-3">
        <div className={clsx('flex items-center gap-2 text-[12px]', dark ? 'text-gray-400' : 'text-gray-500')}>
          <MapPin size={12} />
          {item.direccion}
        </div>
        <div className={clsx('flex items-center gap-2 text-[12px]', dark ? 'text-gray-400' : 'text-gray-500')}>
          <Navigation size={12} />
          {item.distancia}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <StatusTimeline status={item.estado} />
        <span className={clsx('text-[11px] font-semibold', dark ? 'text-gray-500' : 'text-gray-400')}>{item.hora}</span>
      </div>
    </div>
  )
}

export default function AdminDelivery() {
  const { dark } = useApp()
  const [selected, setSelected] = useState(null)
  const [activeTab, setActiveTab] = useState('Todos')

  const filtered = activeTab === 'Todos' ? MOCK_DELIVERIES : MOCK_DELIVERIES.filter(d => d.estado === activeTab)
  const activeDeliveries = MOCK_DELIVERIES.filter(d => d.estado === 'En Ruta').length
  const pendingAssign = MOCK_DELIVERIES.filter(d => d.estado === 'Asignado').length

  return (
    <div className="space-y-6">
      <div className={clsx(
        'rounded-2xl border p-6',
        dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
      )}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Truck className="text-pink-500" size={22} />
              <h1 className={clsx('text-xl font-black', dark ? 'text-white' : 'text-gray-900')}>Panel Delivery</h1>
            </div>
            <p className={clsx('text-[13px] mt-1', dark ? 'text-gray-500' : 'text-gray-400')}>
              Gestión de repartos y seguimiento de entregas
            </p>
          </div>
          <div className={clsx('flex items-center gap-4 px-4 py-2 rounded-xl', dark ? 'bg-gray-800' : 'bg-gray-50')}>
            <div className="text-center">
              <p className={clsx('text-lg font-extrabold', dark ? 'text-emerald-400' : 'text-emerald-600')}>{activeDeliveries}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">En Ruta</p>
            </div>
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700" />
            <div className="text-center">
              <p className={clsx('text-lg font-extrabold', dark ? 'text-amber-400' : 'text-amber-600')}>{pendingAssign}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pendientes</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className={clsx('rounded-xl p-4 col-span-2', dark ? 'bg-gray-800' : 'bg-gray-50')}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={clsx('text-[13px] font-extrabold', dark ? 'text-gray-200' : 'text-gray-800')}>Mapa de entregas</h3>
              <span className={clsx('text-[10px] font-bold px-2 py-1 rounded-full', dark ? 'bg-gray-700 text-gray-400' : 'bg-white text-gray-500')}>
                Próximamente
              </span>
            </div>
            <div className={clsx(
              'rounded-xl h-48 flex items-center justify-center border-2 border-dashed',
              dark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white'
            )}>
              <div className="text-center">
                <MapPin size={32} className="mx-auto text-pink-300 mb-2" />
                <p className={clsx('text-[13px] font-semibold', dark ? 'text-gray-500' : 'text-gray-400')}>Vista de mapa en desarrollo</p>
                <p className={clsx('text-[11px]', dark ? 'text-gray-600' : 'text-gray-400')}>Seguimiento GPS en tiempo real</p>
              </div>
            </div>
          </div>
          <div className={clsx('rounded-xl p-4', dark ? 'bg-gray-800' : 'bg-gray-50')}>
            <h3 className={clsx('text-[13px] font-extrabold mb-3', dark ? 'text-gray-200' : 'text-gray-800')}>Resumen rápido</h3>
            <div className="space-y-2">
              {[
                { label: 'Asignados', value: MOCK_DELIVERIES.filter(d => d.estado === 'Asignado').length, color: 'text-amber-500' },
                { label: 'En Ruta', value: MOCK_DELIVERIES.filter(d => d.estado === 'En Ruta').length, color: 'text-blue-500' },
                { label: 'Entregados', value: MOCK_DELIVERIES.filter(d => d.estado === 'Entregado').length, color: 'text-emerald-500' },
                { label: 'Fallidos', value: MOCK_DELIVERIES.filter(d => d.estado === 'Fallido').length, color: 'text-red-500' },
              ].map(item => (
                <div key={item.label} className={clsx('flex items-center justify-between px-3 py-2 rounded-lg', dark ? 'bg-gray-700/50' : 'bg-white')}>
                  <span className={clsx('text-[11px] font-bold', dark ? 'text-gray-400' : 'text-gray-500')}>{item.label}</span>
                  <span className={clsx('text-sm font-extrabold', item.color)}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {['Todos', 'Asignado', 'En Ruta', 'Entregado', 'Fallido'].map(tab => (
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
            {tab}
            {tab !== 'Todos' && <span className="ml-1 opacity-60">({MOCK_DELIVERIES.filter(d => d.estado === tab).length})</span>}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <h2 className={clsx('text-[15px] font-extrabold', dark ? 'text-white' : 'text-gray-900')}>
            {activeTab === 'Todos' ? 'Todos los repartos' : `Repartos ${activeTab}`}
          </h2>
          {filtered.map(item => (
            <DeliveryCard
              key={item.id}
              item={item}
              dark={dark}
              onSelect={setSelected}
              isSelected={selected?.id === item.id}
            />
          ))}
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          {selected ? (
            <div className={clsx(
              'rounded-2xl border p-6',
              dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
            )}>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-pink-500">Detalle del reparto</p>
                  <h3 className={clsx('text-xl font-extrabold mt-1', dark ? 'text-white' : 'text-gray-900')}>
                    Pedido #{selected.pedido}
                  </h3>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className={clsx('rounded-full p-2', dark ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200')}
                >
                  <XCircle size={16} />
                </button>
              </div>

              <div className={clsx('rounded-xl p-4 mb-4 flex items-center gap-3', dark ? 'bg-gray-800' : 'bg-gray-50')}>
                <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', STATUS_META[selected.estado].bg)}>
                  {(() => {
                    const Icon = STATUS_META[selected.estado].icon
                    return <Icon size={18} className={STATUS_META[selected.estado].color} />
                  })()}
                </div>
                <div className="flex-1">
                  <p className={clsx('text-sm font-bold', dark ? 'text-gray-200' : 'text-gray-800')}>{selected.estado}</p>
                  <StatusTimeline status={selected.estado} />
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <div className={clsx('flex items-center gap-3 p-3 rounded-xl', dark ? 'bg-gray-800' : 'bg-gray-50')}>
                  <User size={16} className="text-pink-500" />
                  <div>
                    <p className={clsx('text-[11px] font-bold', dark ? 'text-gray-400' : 'text-gray-500')}>Cliente</p>
                    <p className={clsx('text-sm font-semibold', dark ? 'text-white' : 'text-gray-800')}>{selected.cliente}</p>
                  </div>
                </div>
                <div className={clsx('flex items-center gap-3 p-3 rounded-xl', dark ? 'bg-gray-800' : 'bg-gray-50')}>
                  <Phone size={16} className="text-pink-500" />
                  <div>
                    <p className={clsx('text-[11px] font-bold', dark ? 'text-gray-400' : 'text-gray-500')}>Teléfono</p>
                    <p className={clsx('text-sm font-semibold', dark ? 'text-white' : 'text-gray-800')}>{selected.telefono}</p>
                  </div>
                </div>
                <div className={clsx('flex items-center gap-3 p-3 rounded-xl', dark ? 'bg-gray-800' : 'bg-gray-50')}>
                  <MapPin size={16} className="text-pink-500" />
                  <div>
                    <p className={clsx('text-[11px] font-bold', dark ? 'text-gray-400' : 'text-gray-500')}>Dirección</p>
                    <p className={clsx('text-sm font-semibold', dark ? 'text-white' : 'text-gray-800')}>{selected.direccion}</p>
                  </div>
                </div>
                <div className={clsx('flex items-center gap-3 p-3 rounded-xl', dark ? 'bg-gray-800' : 'bg-gray-50')}>
                  <Navigation size={16} className="text-pink-500" />
                  <div>
                    <p className={clsx('text-[11px] font-bold', dark ? 'text-gray-400' : 'text-gray-500')}>Distancia</p>
                    <p className={clsx('text-sm font-semibold', dark ? 'text-white' : 'text-gray-800')}>{selected.distancia}</p>
                  </div>
                </div>
                <div className={clsx('flex items-center gap-3 p-3 rounded-xl', dark ? 'bg-gray-800' : 'bg-gray-50')}>
                  <Clock size={16} className="text-pink-500" />
                  <div>
                    <p className={clsx('text-[11px] font-bold', dark ? 'text-gray-400' : 'text-gray-500')}>Horario estimado</p>
                    <p className={clsx('text-sm font-semibold', dark ? 'text-white' : 'text-gray-800')}>{selected.hora}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {selected.estado === 'Asignado' && (
                  <>
                    <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-500 text-white text-[11px] font-bold hover:bg-blue-600 transition-all">
                      <Navigation size={14} /> Iniciar ruta
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[11px] font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                      <Phone size={14} /> Llamar
                    </button>
                  </>
                )}
                {selected.estado === 'En Ruta' && (
                  <>
                    <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-white text-[11px] font-bold hover:bg-emerald-600 transition-all">
                      <CheckCircle size={14} /> Marcar entregado
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500 text-white text-[11px] font-bold hover:bg-red-600 transition-all">
                      <XCircle size={14} /> Reportar fallido
                    </button>
                  </>
                )}
                {selected.estado === 'Entregado' && (
                  <button className="col-span-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 text-[11px] font-bold cursor-not-allowed">
                    <CheckCircle size={14} /> Entregado — {selected.hora}
                  </button>
                )}
                {selected.estado === 'Fallido' && (
                  <button className="col-span-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 text-[11px] font-bold cursor-not-allowed">
                    <XCircle size={14} /> Reasignar (próximamente)
                  </button>
                )}
              </div>

              <div className="mt-4 p-4 rounded-xl border-2 border-dashed dark:border-gray-700 border-gray-200 text-center">
                <Camera size={20} className="mx-auto text-gray-300 mb-2" />
                <p className={clsx('text-[11px] font-semibold', dark ? 'text-gray-500' : 'text-gray-400')}>
                  Foto de evidencia — próximamente
                </p>
              </div>
            </div>
          ) : (
            <div className={clsx(
              'rounded-2xl border p-10 text-center',
              dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
            )}>
              <Package size={40} className="mx-auto text-gray-300 mb-4" />
              <p className={clsx('font-semibold', dark ? 'text-gray-500' : 'text-gray-400')}>Selecciona un reparto</p>
              <p className={clsx('text-[12px] mt-1', dark ? 'text-gray-600' : 'text-gray-400')}>Haz clic en cualquier tarjeta para ver los detalles</p>
            </div>
          )}
        </div>
      </div>

      <div className={clsx(
        'rounded-2xl border p-5 flex items-center justify-between',
        dark ? 'bg-gradient-to-r from-gray-900 to-gray-800/50 border-gray-800' : 'bg-gradient-to-r from-pink-50 to-purple-50 border-pink-100'
      )}>
        <div>
          <h3 className={clsx('text-sm font-extrabold', dark ? 'text-white' : 'text-gray-900')}>Integración con mapa</h3>
          <p className={clsx('text-[12px] mt-0.5', dark ? 'text-gray-500' : 'text-gray-500')}>Próximamente: seguimiento GPS en tiempo real, rutas óptimas y fotos de evidencia.</p>
        </div>
        <ChevronRight size={20} className="text-pink-400" />
      </div>
    </div>
  )
}