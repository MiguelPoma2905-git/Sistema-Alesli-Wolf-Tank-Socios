import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Check, Filter, Search, Trash2, Truck, Package, CreditCard, MessageCircle, Clock, ArrowRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { ROUTES } from '../../utils/constants'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { TagBadge } from '../../components/ui/Badge'

const TYPE_MAP = {
  stock: { label: 'Stock bajo', color: '#fde68a', text: '#b45309', icon: Package, action: 'Ver producto', route: ROUTES.PRODUCTOS },
  order: { label: 'Pedido urgente', color: '#fecdd3', text: '#b91c1c', icon: Bell, action: 'Ver pedido', route: ROUTES.PEDIDOS_CLIENTES },
  delivery: { label: 'Entrega en ruta', color: '#bfdbfe', text: '#1d4ed8', icon: Truck, action: 'Ver entrega', route: ROUTES.ENTREGAS },
  payment: { label: 'Pago recibido', color: '#d1fae5', text: '#166534', icon: CreditCard, action: 'Ver pago', route: ROUTES.PEDIDOS_CLIENTES },
  system: { label: 'Recordatorio', color: '#e2e8f0', text: '#334155', icon: Clock, action: 'Configuración', route: ROUTES.CONFIGURACION },
}

const FILTER_TYPES = [
  { value: 'all', label: 'Todas' },
  { value: 'stock', label: 'Stock' },
  { value: 'order', label: 'Pedidos' },
  { value: 'delivery', label: 'Entregas' },
  { value: 'payment', label: 'Pagos' },
  { value: 'system', label: 'Recordatorios' },
]

const groupByDay = (notifications) => {
  const groups = { Hoy: [], Ayer: [], 'Esta semana': [], Anterior: [] }
  notifications.forEach(item => {
    const text = item.time.toLowerCase()
    if (text.includes('hoy') || text.includes('min') || (text.includes('hace') && !text.includes('día') && !text.includes('horas'))) {
      groups.Hoy.push(item)
    } else if (text.includes('ayer')) {
      groups.Ayer.push(item)
    } else if (text.includes('hace')) {
      groups['Esta semana'].push(item)
    } else {
      groups.Anterior.push(item)
    }
  })
  return Object.entries(groups).filter(([, items]) => items.length > 0)
}

function Notificaciones() {
  const { notifications, unreadCount, markAllRead, markNotificationRead, deleteNotification } = useApp()
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [prefs, setPrefs] = useState({
    desktop: true,
    email: false,
    sms: true,
    silence: false,
    types: { stock: true, order: true, delivery: true, payment: true, system: true },
  })

  const filteredNotifications = useMemo(() => {
    return notifications.filter(item => {
      const matchesType = filterType === 'all' || item.type === filterType
      const matchesSearch = `${item.title} ${item.desc}`.toLowerCase().includes(search.toLowerCase())
      const typeEnabled = prefs.types[item.type]
      return matchesType && matchesSearch && typeEnabled
    })
  }, [notifications, search, filterType, prefs.types])

  const groupedNotifications = useMemo(() => groupByDay(filteredNotifications), [filteredNotifications])

  const total = notifications.length
  const seen = total - unreadCount

  const toggleType = (type) => {
    setPrefs(prev => ({
      ...prev,
      types: {
        ...prev.types,
        [type]: !prev.types[type],
      },
    }))
  }

  return (
    <div className="p-6 space-y-6">
      <header className="rounded-[28px] border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-white p-7 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-pink-500 font-bold">Centro de alertas</p>
            <h1 className="mt-3 text-4xl font-extrabold text-slate-900">Notificaciones</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500">Mantén al administrador informado con alertas en tiempo real, gestión por prioridad y un historial claro de eventos importantes.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={markAllRead}>Marcar todas como leídas</Button>
            <Link to={ROUTES.PRODUCTOS} className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-pink-600 shadow-sm transition hover:bg-pink-50">
              Ver tablero
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.9fr_1fr]">
        <main className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-gray-400 font-semibold">Resumen</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Nuevas</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{unreadCount}</p>
                </div>
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Leídas</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{seen}</p>
                </div>
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Total</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{total}</p>
                </div>
              </div>
            </div>
            <div className="grid w-full max-w-md gap-3 sm:grid-cols-2">
              {FILTER_TYPES.map(filter => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setFilterType(filter.value)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${filterType === filter.value ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Bandeja de notificaciones</h2>
                <p className="mt-1 text-sm text-gray-500">Filtra y busca cualquier alerta importante del sistema.</p>
              </div>
              <div className="max-w-sm">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar notificaciones..."
                  className="mb-0"
                />
              </div>
            </div>

            <div className="mt-6 space-y-6">
              {groupedNotifications.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-gray-200 bg-slate-50 p-8 text-center text-gray-500">
                  No se encontraron notificaciones para tu búsqueda.
                </div>
              ) : (
                groupedNotifications.map(([group, items]) => (
                  <section key={group} className="space-y-4">
                    <div className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">{group}</div>
                    <div className="space-y-3">
                      {items.map(notification => {
                        const meta = TYPE_MAP[notification.type] || TYPE_MAP.system
                        const Icon = meta.icon
                        return (
                          <div key={notification.id} className={`rounded-[28px] border p-5 shadow-sm transition ${notification.read ? 'border-gray-100 bg-white' : 'border-pink-100 bg-pink-50'}`}>
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                              <div className="flex gap-4">
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl" style={{ background: meta.color, color: meta.text }}>
                                  <Icon size={18} />
                                </span>
                                <div>
                                  <div className="flex flex-wrap items-center gap-3">
                                    <h3 className="text-base font-semibold text-slate-900">{notification.title}</h3>
                                    {!notification.read && (
                                      <TagBadge color="#fde68a" textColor="#92400e">Nueva</TagBadge>
                                    )}
                                  </div>
                                  <p className="mt-2 text-sm text-gray-600">{notification.desc}</p>
                                </div>
                              </div>
                              <div className="flex flex-col items-start gap-3 text-sm text-gray-500 sm:items-end">
                                <span>{notification.time}</span>
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => markNotificationRead(notification.id)}
                                    className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                  >
                                    <Check size={14} />
                                    Marcar leída
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => deleteNotification(notification.id)}
                                    className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                                  >
                                    <Trash2 size={14} />
                                    Eliminar
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex flex-wrap items-center gap-3">
                              <Link
                                to={meta.route}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-pink-600 hover:text-pink-700"
                              >
                                {meta.action}
                                <ArrowRight size={14} />
                              </Link>
                              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{meta.label}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </section>
                ))
              )}
            </div>
          </div>
        </main>

        <aside className="space-y-6">
          <section className="card card-p">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-pink-100 text-pink-600">
                <Bell size={20} />
              </span>
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-gray-400 font-semibold">Preferencias</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Configuración de notificaciones</h2>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <label className="flex items-center justify-between gap-3 rounded-3xl border border-gray-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900">
                <span>Notificaciones en escritorio</span>
                <input
                  type="checkbox"
                  checked={prefs.desktop}
                  onChange={() => setPrefs(prev => ({ ...prev, desktop: !prev.desktop }))}
                  className="h-5 w-5 rounded border-gray-300 bg-white text-pink-600"
                />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-3xl border border-gray-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900">
                <span>Notificaciones por email</span>
                <input
                  type="checkbox"
                  checked={prefs.email}
                  onChange={() => setPrefs(prev => ({ ...prev, email: !prev.email }))}
                  className="h-5 w-5 rounded border-gray-300 bg-white text-pink-600"
                />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-3xl border border-gray-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900">
                <span>SMS para urgentes</span>
                <input
                  type="checkbox"
                  checked={prefs.sms}
                  onChange={() => setPrefs(prev => ({ ...prev, sms: !prev.sms }))}
                  className="h-5 w-5 rounded border-gray-300 bg-white text-pink-600"
                />
              </label>
              <label className="flex items-center justify-between gap-3 rounded-3xl border border-gray-200 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900">
                <span>Silenciar 22:00–08:00</span>
                <input
                  type="checkbox"
                  checked={prefs.silence}
                  onChange={() => setPrefs(prev => ({ ...prev, silence: !prev.silence }))}
                  className="h-5 w-5 rounded border-gray-300 bg-white text-pink-600"
                />
              </label>
            </div>
          </section>

          <section className="card card-p">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-slate-100 text-slate-700">
                <Filter size={20} />
              </span>
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-gray-400 font-semibold">Tipos activados</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Selecciona qué alertas ver</h2>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {Object.entries(TYPE_MAP).map(([type, meta]) => {
                const Icon = meta.icon
                return (
                  <label key={type} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-3xl border border-gray-200 bg-slate-50 px-4 py-4 text-sm text-slate-900">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl" style={{ background: meta.color, color: meta.text }}>
                      <Icon size={16} />
                    </span>
                     <div>
                       <p className="font-semibold">{meta.label}</p>
                       <p className="text-xs text-gray-500">{meta.action}</p>
                     </div>
                    <input
                      type="checkbox"
                      checked={prefs.types[type]}
                      onChange={() => toggleType(type)}
                      className="h-5 w-5 rounded border-gray-300 bg-white text-pink-600"
                    />
                  </label>
                )
              })}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );  // ← Importante: solo un paréntesis y punto y coma
}  // ← Importante: solo una llave

export default Notificaciones