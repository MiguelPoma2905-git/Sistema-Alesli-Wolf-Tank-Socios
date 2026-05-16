import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Bell, ArrowRight, Package, Truck, CreditCard, MessageCircle, Clock, CheckCircle2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { ROUTES_ADMIN } from '../../utils/constants'
import { getNotifications, getUnreadNotifications, markAsRead } from '../../services/notificaciones'

const NOTIFICATION_META = {
  Pedido: { icon: Package, badge: 'bg-yellow-100 text-yellow-700', label: 'Pedido' },
  Promocion: { icon: MessageCircle, badge: 'bg-pink-100 text-pink-700', label: 'Promoción' },
  Recordatorio: { icon: Clock, badge: 'bg-gray-100 text-slate-700', label: 'Recordatorio' },
  Puntos: { icon: CreditCard, badge: 'bg-emerald-100 text-emerald-700', label: 'Puntos' },
}

export default function AdminTopNav() {
  const [open, setOpen] = useState(false)
  const { user, roleLabel } = useApp()
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

  return (
    <header className="relative h-16 bg-white border-b px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold">Admin Aleslí</h1>
      </div>

      <div className="flex items-center gap-3 relative">
        <button
          type="button"
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition hover:bg-slate-100"
          onClick={() => setOpen(o => !o)}
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-pink-600 px-1.5 text-[11px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="inline-flex items-center gap-2 rounded-2xl bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-700">
          <span>{user?.nombre || 'Admin'}</span>
          <span className="text-[10px] opacity-70">({roleLabel})</span>
        </div>

        {open && (
          <div className="absolute right-0 top-full z-50 mt-3 w-[340px] overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-xl">
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Notificaciones</p>
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
                    <div key={n.id_notificacion} className="flex items-start gap-3 border-b border-gray-100 px-4 py-4 last:border-b-0">
                      <span className={`mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl ${meta.badge}`}>
                        <Icon size={16} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900">{n.titulo}</p>
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
            <div className="border-t border-gray-100 px-4 py-4">
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
