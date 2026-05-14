import { formatPrice } from '../../utils/helpers'
import { useNavigate } from 'react-router-dom'
import { RotateCcw } from 'lucide-react'

export default function OrderCard({ order }) {
  const navigate = useNavigate()
  
  return (
    <div
      onClick={() => navigate(`/pedidos/${order.id}`)}
      className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center p-5 border-b border-pink-light dark:border-white/5 cursor-pointer hover:bg-pink-light/50 dark:hover:bg-white/5 transition-all duration-200 last:border-0"
    >
      <div className="font-extrabold text-primary text-[14px]">{order.id}</div>
      
      <div className="text-text-muted text-[13px] font-medium">{order.date}</div>
      
      <div className="md:col-span-2 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white dark:bg-white/5 shadow-sm flex items-center justify-center text-[20px] flex-shrink-0">
          {order.img}
        </div>
        <span className="font-bold text-text-dark dark:text-white text-[14px] truncate">{order.product}</span>
      </div>
      
      <div>
        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-extrabold shadow-sm ${
          order.status === 'Completado' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' :
          order.status === 'Pendiente'  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400' :
          order.status === 'Retrasado'  ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' :
          'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400'
        }`}>
          {order.status}
        </span>
      </div>
      
      <div className="font-black text-text-dark dark:text-white text-[15px]">{formatPrice(order.total)}</div>
      
      <div className="flex justify-end">
        <button 
          onClick={(e) => { e.stopPropagation(); /* lógica reordenar */ }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-primary text-primary text-[12px] font-bold hover:bg-primary hover:text-white transition-all shadow-sm"
        >
          <RotateCcw size={14} /> Reordenar
        </button>
      </div>
    </div>
  )
}