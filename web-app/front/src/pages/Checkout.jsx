import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Wallet, QrCode, Banknote, ShieldCheck, Map, Check, CheckCircle2, Ticket, Sparkles, UserX, Ban } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/helpers'

export default function Checkout() {
  const { cart, cartTotal, clearCart, isAdmin, isEncargado } = useApp()
  const navigate = useNavigate()

  if (isAdmin || isEncargado) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 animate-fade-in">
        <div className="w-20 h-20 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-6">
          <Ban size={36} />
        </div>
        <h2 className="text-[28px] font-black text-text-dark dark:text-white mb-3 text-center">Acción no permitida</h2>
        <p className="text-[14px] text-text-muted text-center max-w-md leading-relaxed">
          Tu rol de <strong>{isAdmin ? 'Administrador' : 'Encargado'}</strong> no permite realizar compras o pedidos.
          Solo los <strong>Clientes</strong> pueden acceder al checkout y generar pedidos.
        </p>
        <button onClick={() => navigate('/')} className="mt-8 px-8 py-3 bg-primary text-white text-[12px] font-bold uppercase tracking-wider hover:bg-accent transition-all shadow-md">
          Volver al inicio
        </button>
      </div>
    )
  }
  
  const [activeStep, setActiveStep] = useState(1)
  
  // ESTADOS EXPANDIDOS PARA NEGOCIO
  const [deliveryData, setDeliveryData] = useState({ name: '', phone: '', address: '' })
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [schedule, setSchedule] = useState({ date: '', time: '' })
  const [payMethod, setPayMethod] = useState('')
  const [dedication, setDedication] = useState('')
  const [discountCode, setDiscountCode] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showErrors, setShowErrors] = useState(false) // Trigger para mostrar errores visuales

  const cardOptions = [
    { id: 'free', name: 'Clásica Alesli', price: 0, img: '💌', desc: 'Sencilla y elegante. Gratis.' },
    { id: 'love', name: 'Premium Romance', price: 25, img: '💌', desc: 'Papel texturizado lacrado.' },
    { id: 'bday', name: 'Premium Cumpleaños', price: 20, img: '💌', desc: 'Diseño festivo full color.' }
  ]
  const [selectedCard, setSelectedCard] = useState(cardOptions[0])

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const dayAfter = new Date(today)
  dayAfter.setDate(dayAfter.getDate() + 2)

  const availableDates = [
    { id: 't1', label: 'Mañana', dateStr: tomorrow.toLocaleDateString('es-BO', { weekday: 'short', day: 'numeric', month: 'short' }) },
    { id: 't2', label: 'Pasado Mañana', dateStr: dayAfter.toLocaleDateString('es-BO', { weekday: 'short', day: 'numeric', month: 'short' }) },
    { id: 't3', label: 'Otra fecha', dateStr: 'Elegir' }
  ]

  const timeSlots = [
    { id: 'm1', label: 'Mañana (09:00 - 13:00)' },
    { id: 't1', label: 'Tarde (14:00 - 18:00)' }
  ]

  useEffect(() => {
    if (cart.length === 0 && !isProcessing) navigate('/carrito')
  }, [cart, navigate, isProcessing])

  const shippingCost = cartTotal > 0 ? 25 : 0 
  const discountAmount = discountCode === 'MAGIA10' ? cartTotal * 0.1 : 0 // Simulador simple
  const finalTotal = cartTotal + shippingCost + selectedCard.price - discountAmount

  const handlePayment = (e) => {
    e.preventDefault()
    if (!payMethod || !termsAccepted) return 
    setIsProcessing(true)
    setTimeout(() => {
      clearCart()
      navigate('/pedidos')
    }, 2500)
  }

  // VALIDACIÓN ROBUSTA
  const canGoNext = () => {
    if (activeStep === 1) return deliveryData.name.length > 2 && deliveryData.address.length > 5 && deliveryData.phone.length >= 8
    if (activeStep === 2) return schedule.date && schedule.time
    if (activeStep === 3) return true 
    return false
  }

  const nextStep = () => {
    if (canGoNext() && activeStep < 4) {
      setShowErrors(false)
      setActiveStep(activeStep + 1)
    } else {
      setShowErrors(true) // Dispara la UI de error si intentan avanzar sin datos
    }
  }

  const presetMessages = [
    "¡Que tengas un día tan hermoso como tú!",
    "Pensando en ti en este día tan especial.",
    "Para la persona que ilumina mis días."
  ]

  if (isProcessing) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center animate-fade-in transition-colors duration-500">
        <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-pink-100 dark:border-white/5 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <ShieldCheck size={40} className="text-primary animate-pulse" />
        </div>
        <h2 className="text-[32px] font-black text-text-dark dark:text-white mb-2">Asegurando Transacción...</h2>
        <p className="text-text-muted dark:text-gray-400 font-medium">No cierres esta ventana. Conectando con el banco.</p>
      </div>
    )
  }

  if (cart.length === 0) return null

  const steps = ['Destino', 'Agenda', 'Dedicatoria', 'Pago']
  const progressPercentage = ((activeStep - 1) / (steps.length - 1)) * 100

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-12 py-10 animate-fade-in transition-colors duration-500">
      
      {/* HEADER WIZARD */}
      <div className="flex items-center justify-between mb-12 border-b border-pink-light/30 dark:border-white/5 pb-10 transition-colors duration-500">
        <button onClick={() => activeStep === 1 ? navigate(-1) : setActiveStep(activeStep - 1)} className="w-12 h-12 rounded-full border border-pink-light dark:border-white/10 bg-white dark:bg-white/5 flex items-center justify-center text-text-muted hover:text-primary hover:scale-105 transition-all shadow-sm">
          <ArrowLeft size={20} />
        </button>
        
        <div className="flex-1 max-w-lg mx-auto relative px-2 hidden sm:block">
          <div className="absolute top-[20px] left-[16px] right-[16px] h-[2px] bg-gray-200 dark:bg-white/5 z-0 rounded-full"></div>
          <div className="absolute top-[20px] left-[16px] h-[2px] bg-primary z-0 transition-all duration-700 ease-in-out rounded-full shadow-inner" style={{ width: `calc(${progressPercentage}% - 16px)` }}></div>
          
          <div className="flex justify-between relative z-10">
            {[1, 2, 3, 4].map(num => (
              <div key={num} className="flex flex-col items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-black transition-all duration-500 ${activeStep === num ? 'bg-primary text-white scale-110 shadow-lg ring-4 ring-pink-50 dark:ring-primary/20' : activeStep > num ? 'bg-success text-white border border-success' : 'bg-white dark:bg-[#0f0f1a] border-2 border-gray-300 dark:border-white/5 text-gray-400 dark:text-gray-600'}`}>
                  {activeStep > num ? <Check size={16} strokeWidth={3}/> : num}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-[2px] transition-colors duration-300 ${activeStep === num ? 'text-text-dark dark:text-white' : activeStep > num ? 'text-success' : 'text-text-muted dark:text-gray-500'}`}>
                  {steps[num-1]}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-12 h-12 hidden sm:block"></div> 
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-8">
        
        {/* ÁREA DINÁMICA DE FORMULARIOS */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white dark:bg-[#1a1a2e] rounded-[40px] p-8 md:p-10 shadow-card-lg dark:shadow-2xl border border-pink-light/50 dark:border-white/5 min-h-[400px] flex flex-col justify-between transition-colors duration-500 relative">
          
          {/* PASO 1: DESTINO */}
          {activeStep === 1 && (
            <div className="animate-fade-in-up">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[24px] font-black text-text-dark dark:text-white transition-colors duration-500">¿A quién y dónde enviamos?</h2>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} />
                    <div className={`block w-10 h-6 rounded-full transition-colors ${isAnonymous ? 'bg-primary' : 'bg-gray-300 dark:bg-white/10'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isAnonymous ? 'translate-x-4' : ''}`}></div>
                  </div>
                  <span className="text-[12px] font-bold text-text-muted dark:text-gray-400 uppercase tracking-wider group-hover:text-primary transition-colors flex items-center gap-1"><UserX size={14}/> Regalo Anónimo</span>
                </label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-black text-text-muted dark:text-gray-400 uppercase tracking-widest pl-4">Destinatario <span className="text-red-500">*</span></label>
                  <input type="text" value={deliveryData.name} onChange={e => setDeliveryData({...deliveryData, name: e.target.value})} placeholder="Ej. María Pérez" className={`w-full bg-bg-light dark:bg-white/5 border rounded-[20px] px-6 py-4 text-[14px] font-bold outline-none transition-all shadow-inner ${showErrors && deliveryData.name.length <= 2 ? 'border-red-500' : 'border-pink-light/80 dark:border-white/10 focus:border-primary'}`} />
                  {showErrors && deliveryData.name.length <= 2 && <span className="text-red-500 text-[11px] pl-4">Ingrese un nombre válido</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-black text-text-muted dark:text-gray-400 uppercase tracking-widest pl-4">Teléfono <span className="text-red-500">*</span></label>
                  <input type="tel" value={deliveryData.phone} onChange={e => setDeliveryData({...deliveryData, phone: e.target.value.replace(/\D/g,'')})} placeholder="Ej. 77712345" maxLength="8" className={`w-full bg-bg-light dark:bg-white/5 border rounded-[20px] px-6 py-4 text-[14px] font-bold outline-none transition-all shadow-inner ${showErrors && deliveryData.phone.length < 8 ? 'border-red-500' : 'border-pink-light/80 dark:border-white/10 focus:border-primary'}`} />
                  {showErrors && deliveryData.phone.length < 8 && <span className="text-red-500 text-[11px] pl-4">Debe tener 8 dígitos</span>}
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[11px] font-black text-text-muted dark:text-gray-400 uppercase tracking-widest pl-4">Dirección exacta <span className="text-red-500">*</span></label>
                  <input type="text" value={deliveryData.address} onChange={e => setDeliveryData({...deliveryData, address: e.target.value})} placeholder="Calle, Zona, Nro..." className={`w-full bg-bg-light dark:bg-white/5 border rounded-[20px] px-6 py-4 text-[14px] font-bold outline-none transition-all shadow-inner ${showErrors && deliveryData.address.length <= 5 ? 'border-red-500' : 'border-pink-light/80 dark:border-white/10 focus:border-primary'}`} />
                  {showErrors && deliveryData.address.length <= 5 && <span className="text-red-500 text-[11px] pl-4">Sea más específico por favor</span>}
                </div>
              </div>
            </div>
          )}

          {/* PASO 2: AGENDA */}
          {activeStep === 2 && (
            <div className="animate-fade-in-up">
              <h2 className="text-[24px] font-black text-text-dark dark:text-white mb-6">¿Cuándo entregamos la magia?</h2>
              
              <label className="text-[11px] font-black text-text-muted dark:text-gray-400 uppercase tracking-widest pl-4 mb-3 block">Día de entrega <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {availableDates.map(date => (
                  <div key={date.id} onClick={() => setSchedule({...schedule, date: date.label})} className={`cursor-pointer rounded-[24px] p-5 flex flex-col items-center text-center transition-all duration-300 border-2 ${schedule.date === date.label ? 'border-primary bg-pink-50 dark:bg-primary/10 scale-105 shadow-md' : 'border-pink-light/30 dark:border-white/5 bg-transparent hover:border-primary/50'}`}>
                    <span className={`text-[15px] font-black ${schedule.date === date.label ? 'text-primary' : 'text-text-dark dark:text-white'}`}>{date.label}</span>
                    <span className="text-[11px] text-text-muted dark:text-gray-400 mt-1">{date.dateStr}</span>
                  </div>
                ))}
              </div>
              {showErrors && !schedule.date && <p className="text-red-500 text-[11px] pl-4 mb-4 -mt-2">Seleccione una fecha</p>}

              <label className="text-[11px] font-black text-text-muted dark:text-gray-400 uppercase tracking-widest pl-4 mb-3 block">Rango horario <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {timeSlots.map(slot => (
                  <div key={slot.id} onClick={() => setSchedule({...schedule, time: slot.label})} className={`cursor-pointer rounded-[24px] p-5 flex flex-col transition-all duration-300 border-2 ${schedule.time === slot.label ? 'border-primary bg-pink-50 dark:bg-primary/10 shadow-md scale-[1.02]' : 'border-pink-light/30 dark:border-white/5 bg-transparent hover:border-primary/50'}`}>
                    <span className={`text-[14px] font-black ${schedule.time === slot.label ? 'text-primary' : 'text-text-dark dark:text-white'}`}>{slot.label}</span>
                  </div>
                ))}
              </div>
              {showErrors && !schedule.time && <p className="text-red-500 text-[11px] pl-4 mt-2">Seleccione un horario</p>}
            </div>
          )}

          {/* PASO 3: DEDICATORIA */}
          {activeStep === 3 && (
            <div className="animate-fade-in-up">
              <h2 className="text-[24px] font-black text-text-dark dark:text-white mb-6">Detalle Final</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {cardOptions.map(card => (
                  <div key={card.id} onClick={() => setSelectedCard(card)} className={`cursor-pointer rounded-[24px] p-4 flex flex-col items-center text-center transition-all duration-300 border-2 ${selectedCard.id === card.id ? 'border-primary bg-pink-50 dark:bg-primary/10 scale-105 shadow-md' : 'border-transparent bg-bg-light dark:bg-white/5 hover:bg-pink-50/50'}`}>
                    <div className="text-[32px] mb-2">{card.img}</div>
                    <span className="text-[12px] font-black leading-tight mb-1">{card.name}</span>
                    <span className="text-[12px] font-black text-primary bg-white dark:bg-white/10 px-2 py-0.5 rounded-full mt-auto">{card.price === 0 ? 'Gratis' : `+ Bs. ${card.price}`}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 relative">
                <div className="flex justify-between items-end">
                  <label className="text-[11px] font-black text-text-muted dark:text-gray-400 uppercase tracking-widest pl-4">Mensaje impreso</label>
                  <span className={`text-[10px] font-bold ${dedication.length >= 200 ? 'text-red-500' : 'text-text-muted'}`}>{dedication.length}/200</span>
                </div>
                <textarea maxLength="200" rows="3" value={dedication} onChange={e => setDedication(e.target.value)} placeholder="Escribe tu mensaje aquí..." className="w-full bg-bg-light dark:bg-white/5 border border-pink-light/80 dark:border-white/10 rounded-[24px] px-6 py-5 text-[14px] font-medium outline-none focus:border-primary resize-none transition-all shadow-inner"></textarea>
                
                {/* Sugerencias UX */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {presetMessages.map((msg, i) => (
                    <button key={i} onClick={() => setDedication(msg)} className="text-[10px] bg-pink-50 dark:bg-white/5 text-primary dark:text-gray-300 hover:bg-primary hover:text-white px-3 py-1 rounded-full transition-colors border border-pink-light/50 dark:border-transparent">
                      "{msg.substring(0, 15)}..."
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PASO 4: CONFIRMACIÓN Y PAGO (Rediseño Crítico) */}
          {activeStep === 4 && (
            <div className="animate-fade-in-up">
              <h2 className="text-[24px] font-black text-text-dark dark:text-white mb-6">Confirma y Paga</h2>
              
              {/* CAJA DE RESUMEN TÁCTICA ANTES DE PAGAR */}
              <div className="bg-bg-light dark:bg-white/5 rounded-[24px] p-6 border border-pink-light/50 dark:border-white/10 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Entrega a:</p>
                  <p className="text-[14px] font-bold text-text-dark dark:text-white">{isAnonymous ? 'Remitente Anónimo' : deliveryData.name}</p>
                  <p className="text-[12px] text-text-muted dark:text-gray-400">{deliveryData.address}</p>
                  <p className="text-[12px] text-text-muted dark:text-gray-400">Tel: {deliveryData.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Agendado para:</p>
                  <p className="text-[14px] font-bold text-text-dark dark:text-white">{schedule.date}</p>
                  <p className="text-[12px] text-text-muted dark:text-gray-400">{schedule.time}</p>
                </div>
              </div>

              <label className="text-[11px] font-black text-text-muted dark:text-gray-400 uppercase tracking-widest pl-4 mb-3 block">Método de Pago <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <PaymentOption id="qr" icon={<QrCode size={28}/>} label="Pago QR" selected={payMethod === 'qr'} onClick={() => setPayMethod('qr')} />
                <PaymentOption id="transfer" icon={<Banknote size={28}/>} label="Transferencia" selected={payMethod === 'transfer'} onClick={() => setPayMethod('transfer')} />
                <PaymentOption id="card" icon={<CreditCard size={28}/>} label="Tarjeta" selected={payMethod === 'card'} onClick={() => setPayMethod('card')} />
                <PaymentOption id="cash" icon={<Wallet size={28}/>} label="Efectivo" selected={payMethod === 'cash'} onClick={() => setPayMethod('cash')} />
              </div>
              {showErrors && !payMethod && <p className="text-red-500 text-[11px] pl-4 -mt-2">Seleccione un método de pago</p>}
            </div>
          )}

          {/* BOTONERA INFERIOR */}
          <div className="flex justify-end pt-8 mt-6 border-t border-pink-light/50 dark:border-white/5">
            {activeStep < 4 ? (
              <button onClick={nextStep} className="px-10 py-4 rounded-full font-black text-[13px] uppercase tracking-widest bg-text-dark dark:bg-white text-white dark:text-text-dark hover:scale-105 transition-transform shadow-md">
                Siguiente Paso
              </button>
            ) : (
              <div className="w-full flex flex-col items-end gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300" />
                  <span className={`text-[12px] font-medium transition-colors ${showErrors && !termsAccepted ? 'text-red-500 font-bold' : 'text-text-muted dark:text-gray-400 group-hover:text-text-dark dark:group-hover:text-white'}`}>Acepto los Términos y Condiciones de compra.</span>
                </label>
                <button onClick={handlePayment} className={`w-full md:w-auto px-12 py-5 rounded-full font-black text-[14px] uppercase tracking-[2px] flex items-center justify-center gap-3 transition-all ${payMethod && termsAccepted ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-xl hover:-translate-y-1' : 'bg-gray-200 dark:bg-white/5 text-gray-400 cursor-not-allowed'}`}>
                  Confirmar y Pagar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* LADO DERECHO: TICKET CONSTANTE */}
        <div className="lg:col-span-5 xl:col-span-4 sticky top-[100px] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="bg-white dark:bg-[#1a1a2e] rounded-[40px] p-8 shadow-card-lg dark:shadow-2xl border border-pink-light/50 dark:border-white/10 transition-colors duration-500 overflow-hidden relative">
            
            <h2 className="text-[20px] font-black text-text-dark dark:text-white mb-6 border-b border-pink-light/50 dark:border-white/10 pb-6">Tu Pedido</h2>
            
            <div className="flex flex-col gap-3 mb-6 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-[13px] font-medium text-text-muted dark:text-gray-400">
                  <span className="truncate pr-4 flex-1">{item.qty}x {item.name}</span>
                  <span className="font-bold text-text-dark dark:text-white">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>

            {/* CÓDIGO DE DESCUENTO NEUROMARKETING */}
            <div className="mb-6 relative group">
              <input type="text" value={discountCode} onChange={e => setDiscountCode(e.target.value.toUpperCase())} placeholder="¿Tienes un código promo?" className="w-full bg-bg-light dark:bg-white/5 border border-pink-light/50 dark:border-white/10 rounded-2xl pl-10 pr-4 py-3 text-[12px] font-bold outline-none focus:border-primary transition-all uppercase" />
              <Ticket size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
              {discountAmount > 0 && <Sparkles size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-success" />}
            </div>

            <div className="space-y-4 text-[13px] font-medium text-text-muted dark:text-gray-400 border-t border-pink-light/50 dark:border-white/10 pt-6">
              <div className="flex justify-between"><span>Subtotal</span><span className="text-text-dark dark:text-white font-bold">{formatPrice(cartTotal)}</span></div>
              <div className="flex justify-between"><span>Envío (La Paz)</span><span className="text-text-dark dark:text-white font-bold">{formatPrice(shippingCost)}</span></div>
              <div className="flex justify-between text-primary"><span>{selectedCard.name}</span><span className="font-bold">{selectedCard.price === 0 ? 'Gratis' : formatPrice(selectedCard.price)}</span></div>
              {discountAmount > 0 && <div className="flex justify-between text-success"><span>Descuento aplicado</span><span className="font-bold">- {formatPrice(discountAmount)}</span></div>}
            </div>

            <div className="pt-6 mt-6 border-t border-pink-light/50 dark:border-white/10 flex justify-between items-end">
              <span className="text-[12px] font-black text-primary uppercase tracking-[2px] mb-1">Total (Bs.)</span>
              <span className="text-[38px] font-black text-text-dark dark:text-white leading-none">{formatPrice(finalTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PaymentOption({ icon, label, selected, onClick }) {
  return (
    <div onClick={onClick} className={`cursor-pointer rounded-[24px] p-4 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 ${selected ? 'border-primary bg-pink-50 dark:bg-primary/10 scale-105 shadow-md' : 'border-transparent bg-bg-light dark:bg-white/5 hover:bg-pink-50/50'}`}>
      <div className={`mb-2 transition-colors ${selected ? 'text-primary' : 'text-text-muted dark:text-gray-400'}`}>{icon}</div>
      <span className={`text-[11px] font-black leading-tight ${selected ? 'text-text-dark dark:text-white' : 'text-text-muted'}`}>{label}</span>
      <div className={`mt-2 transition-all duration-300 ${selected ? 'opacity-100 scale-100 text-primary' : 'opacity-0 scale-0 h-0 mt-0'}`}><CheckCircle2 size={16} /></div>
    </div>
  )
}