import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, Truck, CreditCard, Clock, ShoppingBag, AlertCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getOrders } from '../services/pedidos'
import { formatPrice } from '../utils/helpers'

export default function ClienteDashboard() {
  const { user } = useApp()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOrders()
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const misPedidos = orders.filter(o => o.id_cliente === user?.id_usuario)
  const pendientes = misPedidos.filter(o => o.estado === 'Pendiente' || o.estado === 'En preparación')
  const enCamino = misPedidos.filter(o => o.estado === 'En camino')
  const entregados = misPedidos.filter(o => o.estado === 'Entregado')

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4 py-8">
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-white/5 p-6">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Mis Pedidos</h1>
        <p className="text-sm text-gray-500 mt-1">Seguimiento de tus pedidos realizados</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-white/5 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Pendientes</p>
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{pendientes.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-white/5 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600">
              <Truck size={18} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">En Camino</p>
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{enCamino.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-white/5 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Package size={18} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Entregados</p>
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{entregados.length}</p>
            </div>
          </div>
        </div>
      </div>

      {misPedidos.length === 0 ? (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-white/5 p-12 text-center">
          <ShoppingBag size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-400 font-semibold">No tienes pedidos aún</p>
          <button onClick={() => navigate('/flores')} className="mt-4 px-6 py-2.5 bg-pink-500 text-white rounded-xl text-sm font-bold hover:bg-pink-600 transition-all">
            Explorar catálogo
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 dark:bg-white/5 dark:text-gray-500 border-b dark:border-white/5">Pedido</th>
                  <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 dark:bg-white/5 dark:text-gray-500 border-b dark:border-white/5">Total</th>
                  <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 dark:bg-white/5 dark:text-gray-500 border-b dark:border-white/5">Estado</th>
                  <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 dark:bg-white/5 dark:text-gray-500 border-b dark:border-white/5">Entrega</th>
                </tr>
              </thead>
              <tbody>
                {misPedidos.map(pedido => (
                  <tr
                    key={pedido.id_pedido}
                    onClick={() => navigate(`/pedido/${pedido.id_pedido}`)}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="px-5 py-3 text-sm font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-white/5">#{pedido.id_pedido}</td>
                    <td className="px-5 py-3 text-sm font-bold text-gray-900 dark:text-white border-b dark:border-white/5">{formatPrice(pedido.total_final || 0)}</td>
                    <td className="px-5 py-3 border-b dark:border-white/5">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold ${
                        pedido.estado === 'Entregado' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                        pedido.estado === 'Cancelado' ? 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400' :
                        pedido.estado === 'En camino' ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
                        'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                      }`}>
                        {pedido.estado}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-500 dark:text-gray-400 border-b dark:border-white/5">
                      {pedido.fecha_entrega ? new Date(pedido.fecha_entrega).toLocaleDateString('es-BO') : '--'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl border border-gray-100 dark:border-white/5 p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Métodos de Pago</h2>
        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
          <CreditCard size={20} className="text-gray-400" />
          <span className="text-sm text-gray-500">Próximamente podrás gestionar tus métodos de pago aquí.</span>
        </div>
      </div>
    </div>
  )
}