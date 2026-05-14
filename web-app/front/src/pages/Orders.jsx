import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, Truck, CheckCircle2, Clock, MapPin, ExternalLink, Calendar, ShoppingBag, RefreshCw, Filter } from 'lucide-react'
import { formatPrice } from '../utils/helpers'

export default function Orders() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // MOCK DATA EXPANDIDA (Con Fechas de Entrega y más registros para la paginación)
  const allOrders = [
    {
      id: 'AL-84721',
      date: '13 May 2026',
      status: 'preparando',
      total: 345,
      itemCount: 3,
      dest: 'La Paz, Zona Sur',
      estimatedDelivery: 'Hoy, 16:00 - 18:00'
    },
    {
      id: 'AL-84710',
      date: '12 May 2026',
      status: 'en-camino',
      total: 210,
      itemCount: 2,
      dest: 'La Paz, Sopocachi',
      estimatedDelivery: 'Hoy, 14:00 - 15:00'
    },
    {
      id: 'AL-61092',
      date: '10 Feb 2026',
      status: 'entregado',
      total: 180,
      itemCount: 1,
      dest: 'La Paz, Centro',
      estimatedDelivery: 'Entregado el 10 Feb, 15:30'
    },
    {
      id: 'AL-44501',
      date: '24 Dic 2025',
      status: 'entregado',
      total: 520,
      itemCount: 4,
      dest: 'La Paz, Calacoto',
      estimatedDelivery: 'Entregado el 24 Dic, 18:00'
    },
    {
      id: 'AL-33211',
      date: '14 Feb 2025',
      status: 'entregado',
      total: 450,
      itemCount: 2,
      dest: 'La Paz, Obrajes',
      estimatedDelivery: 'Entregado el 14 Feb, 09:00'
    }
  ]

  // ESTADOS DE FILTRO Y PAGINACIÓN
  const [filter, setFilter] = useState('Todos')
  const [visibleCount, setVisibleCount] = useState(3) // Mostrar 3 por defecto

  const getStatusUI = (status) => {
    switch(status) {
      case 'preparando':
        return { color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10', icon: <Clock size={16} />, label: 'Preparando' }
      case 'en-camino':
        return { color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10', icon: <Truck size={16} />, label: 'En Camino' }
      case 'entregado':
        return { color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-500/10', icon: <CheckCircle2 size={16} />, label: 'Entregado' }
      default:
        return { color: 'text-gray-500', bg: 'bg-gray-100', icon: <Package size={16} />, label: 'Desconocido' }
    }
  }

  // Lógica de Filtrado
  const filteredOrders = filter === 'Todos' 
    ? allOrders 
    : allOrders.filter(o => {
        if (filter === 'Activos') return o.status === 'preparando' || o.status === 'en-camino';
        if (filter === 'Completados') return o.status === 'entregado';
        return true;
      });

  // Lógica de Paginación
  const displayedOrders = filteredOrders.slice(0, visibleCount);
  const hasMore = visibleCount < filteredOrders.length;

  const handleReorder = (orderId) => {
    // Aquí iría la lógica para meter los mismos items al carrito
    // Por ahora, simulamos un éxito y mandamos al carrito
    console.log(`Reordenando pedido ${orderId}`);
    navigate('/carrito');
  }

  if (allOrders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 animate-fade-in transition-colors duration-500">
        <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl flex items-center justify-center text-primary mb-8 shadow-sm">
          <ShoppingBag size={40} strokeWidth={1.5} />
        </div>
        <h2 className="text-[28px] font-black text-text-dark dark:text-white mb-3">Aún no tienes pedidos</h2>
        <p className="text-[14px] text-text-muted dark:text-gray-400 mb-8 text-center max-w-sm">
          Tu historial está vacío. Anímate a crear tu primera sorpresa inolvidable.
        </p>
        <button onClick={() => navigate('/flores')} className="bg-text-dark dark:bg-white text-white dark:text-text-dark px-10 py-3.5 rounded-xl font-black text-[13px] uppercase tracking-widest shadow-md hover:-translate-y-0.5 transition-all">
          Explorar Catálogo
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-10 animate-fade-in transition-colors duration-500">
      
      {/* HEADER Y FILTROS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-[32px] md:text-[40px] font-black text-text-dark dark:text-white leading-tight">
            Mis Pedidos
          </h1>
          <p className="text-[14px] text-text-muted dark:text-gray-400 font-medium mt-1">
            Rastrea tus sorpresas y revisa tu historial de compras.
          </p>
        </div>

        {/* BARRA DE FILTROS LIMPIA */}
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#1a1a2e] p-1.5 rounded-xl border border-gray-200 dark:border-white/10 w-full md:w-auto overflow-x-auto hide-scrollbar">
          <div className="pl-3 pr-1 text-gray-400"><Filter size={16} /></div>
          {['Todos', 'Activos', 'Completados'].map(f => (
            <button 
              key={f}
              onClick={() => { setFilter(f); setVisibleCount(3); }}
              className={`px-5 py-2 rounded-lg text-[13px] font-bold transition-all whitespace-nowrap ${filter === f ? 'bg-white dark:bg-white/10 text-text-dark dark:text-white shadow-sm border border-gray-100 dark:border-white/5' : 'text-text-muted hover:text-text-dark dark:hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* LISTA DE PEDIDOS */}
      {displayedOrders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
          <p className="text-[14px] font-bold text-text-muted">No hay pedidos que coincidan con este filtro.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {displayedOrders.map((order) => {
            const ui = getStatusUI(order.status)
            const isDelivered = order.status === 'entregado';
            
            return (
              <div key={order.id} className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300">
                
                {/* CABECERA DE LA TARJETA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-xl flex items-center justify-center border border-gray-100 dark:border-white/5">
                      <ShoppingBag size={20} className="text-text-dark dark:text-white" />
                    </div>
                    <div>
                      <h3 className="text-[18px] font-black text-text-dark dark:text-white leading-none mb-1">{order.id}</h3>
                      <p className="text-[12px] font-bold text-text-muted flex items-center gap-1.5"><Calendar size={12}/> {order.date}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-black uppercase tracking-wider w-max ${ui.color} ${ui.bg}`}>
                    {ui.icon} {ui.label}
                  </div>
                </div>

                {/* CUERPO DE LA TARJETA */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <p className="text-[11px] font-black text-text-muted uppercase tracking-widest mb-1">Destino</p>
                    <p className="text-[14px] font-bold text-text-dark dark:text-white flex items-center gap-2"><MapPin size={14} className="text-gray-400"/> {order.dest}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-text-muted uppercase tracking-widest mb-1">{isDelivered ? 'Entregado' : 'Entrega Estimada'}</p>
                    <p className={`text-[14px] font-bold flex items-center gap-2 ${isDelivered ? 'text-text-dark dark:text-white' : 'text-orange-500'}`}>
                      <Clock size={14} className={isDelivered ? "text-gray-400" : ""} /> {order.estimatedDelivery}
                    </p>
                  </div>
                  <div className="md:text-right">
                    <p className="text-[11px] font-black text-text-muted uppercase tracking-widest mb-1">Total ({order.itemCount} items)</p>
                    <p className="text-[18px] font-black text-text-dark dark:text-white leading-none">{formatPrice(order.total)}</p>
                  </div>
                </div>

                {/* BOTONERA DE ACCIÓN */}
                <div className="flex flex-col sm:flex-row items-center gap-3 md:justify-end bg-gray-50 dark:bg-white/5 p-2 rounded-xl border border-gray-100 dark:border-white/5">
                  <button 
                    onClick={() => handleReorder(order.id)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 rounded-lg text-[12px] font-black text-text-dark dark:text-white uppercase tracking-widest hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <RefreshCw size={14} /> Comprar de nuevo
                  </button>
                  <button 
                    onClick={() => navigate(`/pedido/${order.id}`)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-text-dark dark:bg-white text-white dark:text-text-dark rounded-lg text-[12px] font-black uppercase tracking-widest hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2 shadow-sm"
                  >
                    Ver detalle <ExternalLink size={14} />
                  </button>
                </div>

              </div>
            )
          })}
        </div>
      )}

      {/* BOTÓN CARGAR MÁS */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => setVisibleCount(prev => prev + 3)}
            className="px-8 py-3 rounded-xl border-2 border-gray-200 dark:border-white/10 text-[13px] font-black text-text-muted uppercase tracking-widest hover:border-primary hover:text-primary transition-all bg-transparent"
          >
            Cargar pedidos anteriores
          </button>
        </div>
      )}

    </div>
  )
}