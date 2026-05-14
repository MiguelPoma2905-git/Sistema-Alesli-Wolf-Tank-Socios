import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Package, Truck, CheckCircle2, MapPin, Calendar, Clock, CreditCard, RefreshCw, MessageCircle } from 'lucide-react'
import { formatPrice } from '../utils/helpers'

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // SIMULADOR: En producción, buscarías el pedido en la DB usando el 'id'
  const order = {
    id: id || 'AL-84721',
    date: '13 de Mayo, 2026',
    time: '14:30',
    status: 'en-camino', // 'preparando', 'en-camino', 'entregado'
    estimatedDelivery: 'Hoy, 16:00 - 18:00',
    paymentMethod: 'Tarjeta que termina en •••• 4242',
    address: {
      tag: 'Casa',
      full: 'Av. Ballivián, Calle 15, Edificio Girasoles, Depto 4B, Calacoto, La Paz',
      receiver: 'Valeria Mendoza',
      phone: '+591 77712345'
    },
    items: [
      { id: 1, name: 'Ramo "Amor Eterno"', size: 'Grande', qty: 1, price: 300, img: '💐' },
      { id: 2, name: 'Caja de Trufas Artesanales', size: 'Pequeño', qty: 1, price: 45, img: '🍫' }
    ],
    summary: {
      subtotal: 345,
      shipping: 20,
      discount: 0,
      total: 365
    }
  }

  // Motor de Estados Visuales
  const getStatusStep = () => {
    if (order.status === 'preparando') return 1;
    if (order.status === 'en-camino') return 2;
    if (order.status === 'entregado') return 3;
    return 0;
  }
  const currentStep = getStatusStep()

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-8 py-10 animate-fade-in transition-colors duration-500">
      
      {/* HEADER: Navegación y Título */}
      <button onClick={() => navigate('/pedidos')} className="flex items-center gap-2 text-[13px] font-bold text-text-muted hover:text-primary mb-8 group transition-colors">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver a mis pedidos
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-[28px] md:text-[36px] font-black text-text-dark dark:text-white leading-tight flex items-center gap-3">
            Pedido {order.id}
          </h1>
          <p className="text-[14px] text-text-muted dark:text-gray-400 font-medium mt-1 flex items-center gap-2">
            <Calendar size={14} /> Realizado el {order.date} a las {order.time}
          </p>
        </div>
        <button className="w-full md:w-auto px-5 py-2.5 bg-pink-50 dark:bg-primary/10 text-primary rounded-xl font-black text-[12px] uppercase tracking-widest hover:bg-pink-100 transition-colors flex items-center justify-center gap-2">
          <RefreshCw size={14} /> Comprar de nuevo
        </button>
      </div>

      {/* TRACKING: Línea de tiempo del pedido */}
      <div className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 rounded-2xl p-6 md:p-10 shadow-sm mb-8">
        <h2 className="text-[16px] font-black text-text-dark dark:text-white mb-8">Estado del Envío</h2>
        
        <div className="relative flex justify-between items-center max-w-md mx-auto mb-6">
          {/* Línea conectora base */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-white/5 -translate-y-1/2 rounded-full z-0"></div>
          {/* Línea conectora activa */}
          <div className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full z-0 transition-all duration-1000" style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}></div>

          {/* Pasos */}
          <div className={`relative z-10 flex flex-col items-center gap-2 ${currentStep >= 1 ? 'text-primary' : 'text-gray-300 dark:text-gray-600'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white dark:bg-[#1a1a2e] ${currentStep >= 1 ? 'border-primary' : 'border-gray-200 dark:border-white/10'}`}>
              <Package size={18} />
            </div>
          </div>
          <div className={`relative z-10 flex flex-col items-center gap-2 ${currentStep >= 2 ? 'text-primary' : 'text-gray-300 dark:text-gray-600'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white dark:bg-[#1a1a2e] ${currentStep >= 2 ? 'border-primary' : 'border-gray-200 dark:border-white/10'}`}>
              <Truck size={18} className={currentStep === 2 ? "animate-pulse" : ""} />
            </div>
          </div>
          <div className={`relative z-10 flex flex-col items-center gap-2 ${currentStep >= 3 ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white dark:bg-[#1a1a2e] ${currentStep >= 3 ? 'border-green-500' : 'border-gray-200 dark:border-white/10'}`}>
              <CheckCircle2 size={18} />
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-[18px] font-black text-text-dark dark:text-white">
            {currentStep === 1 && "Preparando tu magia"}
            {currentStep === 2 && "¡En camino a su destino!"}
            {currentStep === 3 && "Entregado con éxito"}
          </p>
          <p className="text-[13px] font-bold text-text-muted mt-1 flex items-center justify-center gap-1.5">
            <Clock size={14} /> Entrega estimada: <span className="text-text-dark dark:text-white">{order.estimatedDelivery}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* DETALLES DE ENTREGA */}
        <div className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
          <h3 className="text-[14px] font-black text-text-muted uppercase tracking-widest mb-4">Detalles de Entrega</h3>
          <div className="flex gap-4 mb-4">
            <MapPin size={20} className="text-gray-400 shrink-0" />
            <div>
              <p className="text-[14px] font-bold text-text-dark dark:text-white">{order.address.tag}</p>
              <p className="text-[13px] text-text-muted leading-relaxed mt-1">{order.address.full}</p>
            </div>
          </div>
          <div className="ml-9 border-t border-gray-100 dark:border-white/5 pt-4">
            <p className="text-[12px] text-text-muted font-bold">Recibe: <span className="text-text-dark dark:text-white">{order.address.receiver}</span></p>
            <p className="text-[12px] text-text-muted font-bold">Tel: <span className="text-text-dark dark:text-white">{order.address.phone}</span></p>
          </div>
        </div>

        {/* MÉTODO DE PAGO */}
        <div className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
          <h3 className="text-[14px] font-black text-text-muted uppercase tracking-widest mb-4">Información de Pago</h3>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-gray-50 dark:bg-white/5 rounded-lg flex items-center justify-center border border-gray-200 dark:border-white/10">
              <CreditCard size={18} className="text-text-dark dark:text-white" />
            </div>
            <p className="text-[14px] font-bold text-text-dark dark:text-white">{order.paymentMethod}</p>
          </div>
          
          <button className="w-full py-3 bg-[#25D366]/10 text-[#25D366] rounded-xl font-black text-[12px] uppercase tracking-widest hover:bg-[#25D366] hover:text-white transition-colors flex items-center justify-center gap-2">
            <MessageCircle size={16} /> Necesito Ayuda
          </button>
        </div>
      </div>

      {/* RESUMEN DE ARTÍCULOS */}
      <div className="bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm">
        <h3 className="text-[14px] font-black text-text-muted uppercase tracking-widest mb-6">Artículos del Pedido</h3>
        
        <div className="flex flex-col gap-4 mb-6">
          {order.items.map(item => (
            <div key={item.id} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-xl flex items-center justify-center text-[24px] border border-gray-100 dark:border-white/5">
                  {item.img}
                </div>
                <div>
                  <p className="text-[14px] font-bold text-text-dark dark:text-white">{item.name}</p>
                  <p className="text-[12px] text-text-muted">Tamaño: {item.size} • Cantidad: {item.qty}</p>
                </div>
              </div>
              <p className="text-[15px] font-black text-text-dark dark:text-white">
                {formatPrice(item.price * item.qty)}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 dark:border-white/5 pt-6 flex flex-col gap-3">
          <div className="flex justify-between text-[13px] text-text-muted font-bold">
            <span>Subtotal</span>
            <span className="text-text-dark dark:text-white">{formatPrice(order.summary.subtotal)}</span>
          </div>
          <div className="flex justify-between text-[13px] text-text-muted font-bold">
            <span>Envío</span>
            <span className="text-text-dark dark:text-white">{formatPrice(order.summary.shipping)}</span>
          </div>
          {order.summary.discount > 0 && (
            <div className="flex justify-between text-[13px] text-green-500 font-bold">
              <span>Descuento</span>
              <span>-{formatPrice(order.summary.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-[18px] font-black text-text-dark dark:text-white mt-2 pt-4 border-t border-gray-100 dark:border-white/5">
            <span>Total Pagado</span>
            <span className="text-primary">{formatPrice(order.summary.total)}</span>
          </div>
        </div>
      </div>

    </div>
  )
}