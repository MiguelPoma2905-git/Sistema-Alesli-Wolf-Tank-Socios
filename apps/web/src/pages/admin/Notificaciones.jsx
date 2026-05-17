import { useState, useEffect } from 'react'
import { Bell, CheckCheck, Trash2 } from 'lucide-react'
import { getNotifications, markAsRead } from '../../services/notificaciones'
import { useToast } from '../../context/ToastContext'

export default function AdminNotificaciones() {
  const { addToast } = useToast()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const data = await getNotifications().catch(() => [])
    setNotifications(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id)
      setNotifications(prev => prev.map(n => n.id_notificacion === id ? { ...n, leido: true } : n))
      addToast('Notificación marcada como leída', 'success')
    } catch {
      addToast('Error al marcar como leída', 'error')
    }
  }

  const handleMarkAllRead = async () => {
    try {
      const unread = notifications.filter(n => !n.leido)
      await Promise.all(unread.map(n => markAsRead(n.id_notificacion)))
      setNotifications(prev => prev.map(n => ({ ...n, leido: true })))
      addToast('Todas marcadas como leídas', 'success')
    } catch {
      addToast('Error al marcar', 'error')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const unreadCount = notifications.filter(n => !n.leido).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-extrabold text-gray-800">Notificaciones</h2>
          <p className="text-sm text-gray-500">{unreadCount} no leídas de {notifications.length}</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={handleMarkAllRead} className="btn btn-ghost btn-sm gap-2">
            <CheckCheck size={14} /> Marcar todas
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="card card-p-lg text-center py-16">
            <Bell size={40} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-400 font-semibold">No hay notificaciones</p>
          </div>
        ) : (
          notifications.map(n => (
            <div
              key={n.id_notificacion}
              className={`card card-p-sm flex items-start gap-4 ${!n.leido ? 'border-pink-200 bg-pink-50/30' : ''}`}
            >
              <div className={`mt-1 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                !n.leido ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-400'
              }`}>
                <Bell size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800">{n.titulo}</p>
                <p className="text-xs text-gray-500 mt-0.5">{n.mensaje}</p>
                <p className="text-[10px] text-gray-400 mt-1">
                  {new Date(n.fecha_envio).toLocaleDateString('es-BO', {
                    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {!n.leido && (
                  <button onClick={() => handleMarkRead(n.id_notificacion)} className="p-2 rounded-lg hover:bg-pink-50 text-pink-500 transition-colors">
                    <CheckCheck size={15} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
