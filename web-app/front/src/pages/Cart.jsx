import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, ArrowLeft, ShoppingBag, CreditCard, ShieldCheck, Plus, Truck, Info, Ticket, Edit3, MessageCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/helpers'
import { flowers, chocolates, peluches, gifts } from '../data/mockData' 

export default function Cart() {
  const { cart, updateQty, removeFromCart, addToCart, cartTotal } = useApp()
  const navigate = useNavigate()

  const [discountCode, setDiscountCode] = useState('')
  const [orderNotes, setOrderNotes] = useState('')
  const [itemToDelete, setItemToDelete] = useState(null)

  const shippingCost = cartTotal > 0 ? 25 : 0 
  const discountAmount = discountCode === 'MAGIA10' ? cartTotal * 0.1 : 0 
  const finalTotal = cartTotal + shippingCost - discountAmount

  // ─── LÓGICA DE ELIMINACIÓN INTELIGENTE (CERO FRICCIÓN) ───
  const requestRemoval = (id) => {
    if (cart.length === 1) {
      // Si es el último producto que le queda en TODO el carrito, preguntamos
      setItemToDelete(id)
    } else {
      // Si tiene más productos, eliminamos sin molestar
      removeFromCart(id)
    }
  }

  const handleDecrement = (item) => {
    if (item.qty === 1) {
      requestRemoval(item.id)
    } else {
      updateQty(item.id, item.qty - 1)
    }
  }

  const confirmRemove = (id) => {
    removeFromCart(id)
    setItemToDelete(null)
  }

  // ─── MOTOR DE RECOMENDACIÓN DINÁMICO ───
  const hasFlowers = cart.some(item => flowers.some(f => f.id === item.id))
  const hasPeluches = cart.some(item => peluches.some(p => p.id === item.id))
  
  let suggestionPool = []
  let suggestionTitle = "Completa tu sorpresa"

  if (hasFlowers && !hasPeluches) {
    suggestionPool = [...peluches, ...chocolates]
    suggestionTitle = "El complemento perfecto para tus flores"
  } else if (hasPeluches && !hasFlowers) {
    suggestionPool = [...flowers, ...chocolates]
    suggestionTitle = "Añade unas flores a tu peluche"
  } else {
    suggestionPool = [...chocolates, ...peluches, ...gifts] 
  }

  const isCartLarge = cart.length >= 4;
  const lastMinuteAddons = suggestionPool
    .filter(item => !cart.some(cartItem => cartItem.id === item.id))
    .slice(0, 3) 

  // ─── VISTA CARRITO VACÍO ───
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 animate-fade-in transition-colors duration-500">
        <div className="w-28 h-28 bg-gradient-to-tr from-pink-100 to-pink-50 dark:from-white/10 dark:to-white/5 rounded-[36px] flex items-center justify-center text-primary mb-8 shadow-card-lg animate-bounce-slow">
          <ShoppingBag size={48} strokeWidth={1.5} />
        </div>
        <h2 className="text-[32px] md:text-[40px] font-black text-text-dark dark:text-white mb-4 transition-colors duration-500">Tu carrito está vacío</h2>
        <p className="text-[15px] text-text-muted dark:text-gray-400 mb-10 text-center max-w-sm transition-colors duration-500">
          Añade flores frescas o regalos especiales para comenzar a crear magia.
        </p>
        <button 
          onClick={() => navigate('/')} 
          className="bg-primary text-white px-12 py-4 rounded-full font-black text-[13px] uppercase tracking-[2px] shadow-xl hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
        >
          Explorar la Tienda
        </button>
      </div>
    )
  }

  // ─── VISTA CARRITO ACTIVO ───
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-10 animate-fade-in transition-colors duration-500">
      
      <div className="flex items-center gap-6 mb-12">
        <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-full border border-pink-light dark:border-white/10 bg-white dark:bg-white/5 flex items-center justify-center text-text-muted hover:text-primary hover:scale-105 transition-all shadow-sm">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-[36px] md:text-[44px] font-black text-text-dark dark:text-white tracking-tight flex items-center gap-3 transition-colors duration-500">
          Carrito de <span className="text-primary italic">Compras</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* LADO IZQUIERDO: PRODUCTOS */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10">
          
          <div className="space-y-5">
            {cart.map((item, index) => (
              <div 
                key={item.id} 
                className="group flex flex-col sm:flex-row gap-6 bg-white dark:bg-[#1a1a2e] p-5 md:p-6 rounded-[32px] border border-pink-light/50 dark:border-white/5 shadow-sm hover:shadow-card-md hover:-translate-y-1 transition-all duration-500 animate-fade-in-up relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* TOAST DE CONFIRMACIÓN DE ELIMINACIÓN INTRA-TARJETA */}
                <div className={`absolute inset-0 bg-red-500/95 dark:bg-red-600/95 backdrop-blur-md z-20 flex flex-col items-center justify-center text-white transition-all duration-300 ${itemToDelete === item.id ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                  <Trash2 size={32} className="mb-3 opacity-80" />
                  <p className="font-black text-[16px] mb-4 text-center px-4">¿Seguro que deseas eliminar<br/>esto de tu carrito?</p>
                  <div className="flex gap-4">
                    <button onClick={() => confirmRemove(item.id)} className="bg-white text-red-600 px-6 py-2.5 rounded-full font-black text-[12px] uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">Sí, eliminar</button>
                    <button onClick={() => setItemToDelete(null)} className="bg-transparent border-2 border-white/50 hover:border-white text-white px-6 py-2.5 rounded-full font-black text-[12px] uppercase tracking-widest hover:bg-white/10 transition-colors">Conservar</button>
                  </div>
                </div>

                <div className="w-full sm:w-[140px] h-[140px] bg-gradient-to-br from-pink-50/50 to-pink-100/50 dark:from-white/5 dark:to-transparent rounded-[24px] flex items-center justify-center text-[64px] shrink-0 overflow-hidden shadow-inner relative">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 rounded-[24px]"></div>
                  <span className="transition-transform duration-700 group-hover:scale-125 drop-shadow-sm">{item.img}</span>
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div className="max-w-[85%]">
                      <h3 className="text-[20px] font-black text-text-dark dark:text-white leading-tight transition-colors duration-500">{item.name}</h3>
                      <p className="text-[13px] text-text-muted dark:text-gray-400 mt-2 font-medium line-clamp-2 transition-colors duration-500">
                        {item.desc || 'Preparación artesanal Alesli con garantía de frescura y diseño exclusivo.'}
                      </p>
                    </div>
                    {/* Botón directo de Basurero conectado a la misma lógica inteligente */}
                    <button onClick={() => requestRemoval(item.id)} className="text-gray-300 hover:text-red-500 bg-transparent hover:bg-red-50 dark:hover:bg-red-500/10 p-2.5 rounded-full transition-all duration-300 active:scale-75">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-5">
                    <div className="text-[22px] font-black text-text-dark dark:text-white transition-colors duration-500">{formatPrice(item.price)}</div>
                    
                    {/* CONTROLES DE CANTIDAD */}
                    <div className="flex items-center gap-4 bg-bg-light dark:bg-white/5 rounded-2xl p-1 border border-pink-light/40 dark:border-white/5 transition-colors duration-500">
                      <button onClick={() => handleDecrement(item)} className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold transition-all active:scale-90 ${item.qty === 1 && cart.length === 1 ? 'text-red-400 hover:bg-red-50 dark:hover:bg-red-500/20' : 'text-text-dark dark:text-white hover:bg-white dark:hover:bg-white/10 hover:shadow-sm'}`}>
                        -
                      </button>
                      <span className="font-black text-[14px] w-5 text-center text-text-dark dark:text-white">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-text-dark dark:text-white hover:bg-white dark:hover:bg-white/10 hover:shadow-sm transition-all active:scale-90">+</button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-[#1a1a2e] rounded-[32px] p-6 border border-pink-light/50 dark:border-white/5 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-text-dark dark:text-white font-black text-[14px]">
              <Edit3 size={18} className="text-primary" /> Notas especiales para el florista (Opcional)
            </div>
            <textarea 
              rows="2" 
              value={orderNotes}
              onChange={e => setOrderNotes(e.target.value)}
              placeholder="Ej. Las rosas lo más cerradas posible, por favor..." 
              className="w-full bg-bg-light dark:bg-white/5 border border-pink-light/80 dark:border-white/10 rounded-[20px] px-6 py-4 text-[13px] font-medium text-text-dark dark:text-white outline-none focus:border-primary resize-none transition-all shadow-inner"
            ></textarea>
          </div>

          {/* MOTOR DE RECOMENDACIÓN DINÁMICO */}
          {!isCartLarge && lastMinuteAddons.length > 0 && (
            <div className="bg-gradient-to-br from-bg-light to-white dark:from-white/5 dark:to-[#1a1a2e] rounded-[36px] p-8 border border-pink-light/60 dark:border-white/5 shadow-sm transition-colors duration-500">
              <h3 className="text-[18px] font-black text-text-dark dark:text-white mb-6 flex items-center gap-2">
      {suggestionTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {lastMinuteAddons.map((item, idx) => (
                  <div key={item.id} className="bg-white dark:bg-white/5 rounded-[24px] p-5 flex flex-col items-center text-center shadow-sm hover:shadow-card-md transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-primary/20 group animate-fade-in-up" style={{ animationDelay: `${(idx + 3) * 100}ms` }}>
                    <div className="absolute top-2 right-2 bg-primary/10 text-primary text-[10px] font-black px-2 py-1 rounded-lg">Ideal</div>
                    <div className="text-[48px] mb-3 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 drop-shadow-sm">{item.img}</div>
                    <h4 className="text-[12px] font-bold text-text-dark dark:text-white h-[36px] line-clamp-2 mb-1">{item.name}</h4>
                    <span className="text-[15px] font-black text-primary mb-4">{formatPrice(item.price)}</span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="w-full py-2.5 bg-pink-50 dark:bg-white/5 text-primary dark:text-white text-[11px] font-black uppercase tracking-[2px] rounded-xl hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Plus size={14} strokeWidth={3} className="transition-transform group-hover:rotate-90 duration-300" /> Añadir
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* LADO DERECHO: RESUMEN PREMIUM */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 sticky top-[100px] animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          
          <div className="bg-gradient-to-br from-pink-50/50 to-white dark:from-white/5 dark:to-[#1a1a2e] rounded-[32px] p-6 border border-pink-light/80 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-500 group">
            <div className="flex items-center gap-3 mb-3 text-primary font-black uppercase text-[12px] tracking-[2px]">
              <Truck size={18} className="group-hover:translate-x-1 transition-transform duration-300" /> Información de Entrega
            </div>
            <p className="text-[13px] text-text-muted dark:text-gray-400 font-medium leading-relaxed transition-colors duration-500">
              Entregas en La Paz estimadas para <b>Mañana</b> o <b>Pasado mañana</b>. El horario exacto se coordina en el próximo paso.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1a1a2e] rounded-[40px] p-8 shadow-card-lg dark:shadow-2xl border border-pink-light/80 dark:border-white/10 transition-all duration-500 hover:shadow-card-xl relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-pink-100 to-pink-50 dark:from-primary/10 dark:to-secondary/10 rounded-full blur-[40px] opacity-50 transition-colors duration-500 pointer-events-none"></div>

            <h2 className="text-[22px] font-black text-text-dark dark:text-white mb-6 border-b border-pink-light/50 dark:border-white/10 pb-6 transition-colors duration-500 relative z-10">
              Resumen del Pedido
            </h2>
            
            <div className="mb-6 relative group z-10">
              <input type="text" value={discountCode} onChange={e => setDiscountCode(e.target.value.toUpperCase())} placeholder="¿Tienes código promo?" className="w-full bg-bg-light dark:bg-white/5 border border-pink-light/50 dark:border-white/10 rounded-[20px] pl-10 pr-4 py-4 text-[13px] font-bold outline-none focus:border-primary transition-all uppercase" />
              <Ticket size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
            </div>

            <div className="space-y-5 mb-8 text-[14px] font-medium text-text-muted dark:text-gray-400 transition-colors duration-500 relative z-10">
              <div className="flex justify-between items-center hover:text-text-dark dark:hover:text-white transition-colors duration-300">
                <span>Subtotal ({cart.reduce((a, i) => a + i.qty, 0)} items)</span>
                <span className="text-text-dark dark:text-white font-bold">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between items-center hover:text-text-dark dark:hover:text-white transition-colors duration-300">
                <span>Costo estimado envío</span>
                <span className="text-text-dark dark:text-white font-bold">{formatPrice(shippingCost)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between items-center text-success transition-colors duration-300">
                  <span>Descuento aplicado</span>
                  <span className="font-bold">- {formatPrice(discountAmount)}</span>
                </div>
              )}
              
              <div className="pt-6 mt-6 border-t border-pink-light/50 dark:border-white/10 flex justify-between items-end">
                <span className="text-[12px] font-black text-primary uppercase tracking-[2px] mb-1">Total (Bs.)</span>
                <span className="text-[38px] font-black text-text-dark dark:text-white leading-none tracking-tight transition-colors duration-500">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>
            
            <button onClick={() => navigate('/checkout')} className="w-full relative overflow-hidden bg-primary text-white py-5 rounded-[24px] font-black text-[14px] uppercase tracking-[2px] flex items-center justify-center gap-3 transition-all shadow-xl hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 group/btn z-10">
              <span className="relative z-10 flex items-center gap-3"><CreditCard size={20} className="group-hover/btn:scale-110 transition-transform" /> Proceder al Pago</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
            </button>
            
            <div className="mt-8 flex flex-col gap-3 relative z-10">
              <div className="flex items-center gap-3 text-[11px] text-text-muted dark:text-gray-400 font-medium">
                <ShieldCheck size={16} className="text-green-500 drop-shadow-sm" /> Transacción Segura y Encriptada
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-5 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 mt-2">
            <span className="text-[10px] font-black text-text-dark dark:text-white transition-colors duration-500">PAGOS QR</span>
            <span className="text-[10px] font-black text-text-dark dark:text-white transition-colors duration-500">VISA/MASTER</span>
            <span className="text-[10px] font-black text-text-dark dark:text-white transition-colors duration-500">TRANSFERENCIA</span>
            <span className="text-[10px] font-black text-text-dark dark:text-white transition-colors duration-500">EFECTIVO</span>
          </div>
        </div>
      </div>

      <a href="https://wa.me/59177793200?text=Hola%20Alesli,%20tengo%20una%20duda%20con%20mi%20carrito%20de%20compras." target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform z-50 flex items-center justify-center">
        <MessageCircle size={24} />
      </a>
    </div>
  )
}