import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Bell, ArrowRight, ArrowLeft, Package, Truck, CreditCard, MessageCircle, Clock } from 'lucide-react'
import { clsx } from 'clsx'
import { useApp } from '../../context/AppContext'
import { ROUTES_ADMIN } from '../../utils/constants'
import { getUnreadNotifications, markAsRead } from '../../services/notificaciones'

const NOTIFICATION_META = {
  Pedido: { icon: Package, badge: 'bg-yellow-100 text-yellow-700', label: 'Pedido' },
  Promocion: { icon: MessageCircle, badge: 'bg-pink-100 text-pink-700', label: 'Promoción' },
  Recordatorio: { icon: Clock, badge: 'bg-gray-100 text-slate-700', label: 'Recordatorio' },
  Puntos: { icon: CreditCard, badge: 'bg-emerald-100 text-emerald-700', label: 'Puntos' },
}

const PAGE_TITLES = {
  '/admin': 'Dashboard',
  '/admin/productos': 'Productos',
  '/admin/inventario': 'Inventario',
  '/admin/pedidos': 'Pedidos',
  '/admin/entregas': 'Entregas',
  '/admin/finanzas': 'Finanzas',
  '/admin/marketing': 'Marketing',
  '/admin/notificaciones': 'Notificaciones',
  '/admin/configuracion': 'Configuración',
  '/admin/catalogo': 'Catálogo',
}

export default function AdminTopNav() {
  const [open, setOpen] = useState(false)
  const { user, roleLabel, dark } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    getUnreadNotifications()
      .then(data => {
        const arr = Array.isArray(data) ? data : []
        setNotifications(arr.slice(0, 5))
        setUnreadCount(arr.length)
      })
      .catch(() => {})
  }, [])

  const handleMarkAllRead = async () => {
    try {
      await Promise.all(notifications.map(n => markAsRead(n.id_notificacion)))
      setNotifications([])
      setUnreadCount(0)
    } catch {}
  }

  const latest = notifications.slice(0, 5)
  const currentPage = PAGE_TITLES[location.pathname] || ''

  return (
    <header className={clsx(
      'relative h-16 border-b px-6 flex items-center justify-between transition-colors',
      dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
    )}>
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className={clsx(
            'flex items-center justify-center w-9 h-9 rounded-xl transition-all',
            dark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
          )}
        >
          <ArrowLeft size={18} />
        </button>
        <span className={clsx(
          'text-[13px] font-semibold transition-colors',
          dark ? 'text-gray-400' : 'text-gray-500'
        )}>
          {currentPage}
        </span>
      </div>

      <div className="flex items-center gap-3 relative">
        <button
          type="button"
          className={clsx(
            'relative inline-flex h-11 w-11 items-center justify-center rounded-2xl transition',
            dark ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          )}
          onClick={() => setOpen(o => !o)}
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-pink-600 px-1.5 text-[11px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        <div className={clsx(
          'inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition-colors',
          dark ? 'bg-pink-900/30 text-pink-300' : 'bg-pink-100 text-pink-700'
        )}>
          <span>{user?.nombre || 'Admin'}</span>
          <span className="text-[10px] opacity-70">({roleLabel})</span>
        </div>

        {open && (
          <div className={clsx(
            'absolute right-0 top-full z-50 mt-3 w-[340px] overflow-hidden rounded-[28px] border shadow-xl',
            dark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
          )}>
            <div className={clsx(
              'flex items-center justify-between gap-3 border-b px-4 py-4',
              dark ? 'border-gray-800' : 'border-gray-100'
            )}>
              <div>
                <p className={clsx('text-sm font-semibold', dark ? 'text-white' : 'text-slate-900')}>Notificaciones</p>
                <p className="text-xs text-gray-500">Últimas {latest.length} alertas</p>
              </div>
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-xs font-semibold text-pink-600 hover:text-pink-700"
              >
                Marcar todas
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {latest.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-gray-400">No hay notificaciones</div>
              ) : (
                latest.map(n => {
                  const meta = NOTIFICATION_META[n.tipo] || NOTIFICATION_META.Recordatorio
                  const Icon = meta.icon
                  return (
                    <div key={n.id_notificacion} className={clsx(
                      'flex items-start gap-3 border-b px-4 py-4 last:border-b-0',
                      dark ? 'border-gray-800' : 'border-gray-100'
                    )}>
                      <span className={`mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl ${meta.badge}`}>
                        <Icon size={16} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={clsx('text-sm font-semibold', dark ? 'text-white' : 'text-slate-900')}>{n.titulo}</p>
                        <p className="mt-1 text-xs text-gray-500">{n.mensaje}</p>
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
                        {new Date(n.fecha_envio).toLocaleDateString('es-BO')}
                      </span>
                    </div>
                  )
                })
              )}
            </div>
            <div className={clsx(
              'border-t px-4 py-4',
              dark ? 'border-gray-800' : 'border-gray-100'
            )}>
              <Link
                to={ROUTES_ADMIN.NOTIFICACIONES}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600"
              >
                Ver todas
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}