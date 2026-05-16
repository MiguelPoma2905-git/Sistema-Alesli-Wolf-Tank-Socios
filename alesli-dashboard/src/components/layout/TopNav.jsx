import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, ArrowRight, Package, Truck, CreditCard, MessageCircle, Clock, CheckCircle2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { ROUTES } from '../../utils/constants'

const NOTIFICATION_META = {
  stock: { icon: Package, badge: 'bg-yellow-100 text-yellow-700', label: 'Stock bajo' },
  order: { icon: CheckCircle2, badge: 'bg-red-100 text-red-700', label: 'Pedido urgente' },
  delivery: { icon: Truck, badge: 'bg-blue-100 text-blue-700', label: 'Entrega' },
  payment: { icon: CreditCard, badge: 'bg-emerald-100 text-emerald-700', label: 'Pago recibido' },
  system: { icon: Clock, badge: 'bg-gray-100 text-slate-700', label: 'Recordatorio' },
}

function TopNav() {
  const [open, setOpen] = useState(false)
  const { notifications, unreadCount, markAllRead } = useApp()
  const latest = notifications.slice(0, 5)

  return (
    <header className="relative h-16 bg-white border-b px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold">Florería Aleslí</h1>
      </div>

      <div className="flex items-center gap-3 relative">
        <button
          type="button"
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition hover:bg-slate-100"
          onClick={() => setOpen(open => !open)}
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-pink-600 px-1.5 text-[11px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="inline-flex items-center gap-2 rounded-2xl bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-700">
          <span>Aleslí</span>
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
                onClick={() => markAllRead()}
                className="text-xs font-semibold text-pink-600 hover:text-pink-700"
              >
                Marcar todas
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {latest.map(notification => {
                const meta = NOTIFICATION_META[notification.type] || NOTIFICATION_META.system
                const Icon = meta.icon

                return (
                  <div key={notification.id} className="flex items-start gap-3 border-b border-gray-100 px-4 py-4 last:border-b-0">
                    <span className={`mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl ${meta.badge}`}>
                      <Icon size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
                      <p className="mt-1 text-xs text-gray-500">{notification.desc}</p>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">{notification.time}</span>
                  </div>
                )
              })}
            </div>
            <div className="border-t border-gray-100 px-4 py-4">
              <Link
                to={ROUTES.NOTIFICACIONES}
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

export default TopNav