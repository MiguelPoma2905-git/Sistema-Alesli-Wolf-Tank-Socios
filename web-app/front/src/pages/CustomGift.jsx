import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wand2, Plus, Minus, ShoppingBag, MessageSquare, AlertCircle, Zap, X, Check } from 'lucide-react'
import { formatPrice } from '../utils/helpers'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext' // <-- Importamos el motor de notificaciones

// DATOS BASE
const BASE_OPTIONS = [
  { id: 'cristal', name: 'Jarrón de Cristal', price: 40, color: 'from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50' },
  { id: 'caja', name: 'Caja Premium Negra', price: 60, color: 'from-gray-800 to-black' },
  { id: 'papel', name: 'Papel Coreano', price: 25, color: 'from-pink-200 to-rose-200 dark:from-pink-900/50 dark:to-rose-900/50' }
]

const FLOWER_OPTIONS = [
<<<<<<< HEAD
  { id: 'rosa-roja', name: 'Rosas Rojas', price: 15, color: 'bg-red-500', emoji: '🌹' },
  { id: 'rosa-rosa', name: 'Rosas Rosadas', price: 15, color: 'bg-pink-400', emoji: '🌸' },
  { id: 'tulipan', name: 'Tulipanes', price: 20, color: 'bg-yellow-400', emoji: '🌷' },
  { id: 'girasol', name: 'Girasoles', price: 18, color: 'bg-orange-400', emoji: '🌻' }
]

const EXTRA_OPTIONS = [
  { id: 'peluche', name: 'Oso de Peluche', price: 80, icon: '🧸' },
  { id: 'chocolate', name: 'Ferrero Rocher', price: 65, icon: '🍫' },
  { id: 'mariposas', name: 'Mariposas 3D', price: 20, icon: '🦋' }
=======
  { id: 'rosa-roja', name: 'Rosas Rojas', price: 15, color: 'bg-red-500' },
  { id: 'rosa-rosa', name: 'Rosas Rosadas', price: 15, color: 'bg-pink-400' },
  { id: 'tulipan', name: 'Tulipanes', price: 20, color: 'bg-yellow-400' },
  { id: 'girasol', name: 'Girasoles', price: 18, color: 'bg-orange-400' }
]

const EXTRA_OPTIONS = [
  { id: 'peluche', name: 'Oso de Peluche', price: 80 },
  { id: 'chocolate', name: 'Ferrero Rocher', price: 65 },
  { id: 'mariposas', name: 'Mariposas 3D', price: 20 }
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
]

const TEMPLATES = [
  { id: 't1', name: 'Clásico Romántico', flowers: [{ ...FLOWER_OPTIONS[0], qty: 12 }], extras: [], base: BASE_OPTIONS[0], dedication: '' },
  { id: 't2', name: 'Dulzura Total', flowers: [{ ...FLOWER_OPTIONS[1], qty: 8 }], extras: [EXTRA_OPTIONS[1]], base: BASE_OPTIONS[1], dedication: '' }
]

const MAX_FLOWERS = 24

export default function CustomGift() {
  const navigate = useNavigate()
  const { addToCart } = useApp()
  const { addToast } = useToast() // <-- Inicializamos los Toasts
  
  // ESTADOS DE UI PARA EL MODAL
  const [templateToConfirm, setTemplateToConfirm] = useState(null)

  // ESTADO GLOBAL CON RECUPERACIÓN LOCALSTORAGE
  const [customOrder, setCustomOrder] = useState(() => {
    const saved = localStorage.getItem('alesli_draft')
    return saved ? JSON.parse(saved) : { base: BASE_OPTIONS[1], flowers: [], extras: [], dedication: '' }
  })

  useEffect(() => { window.scrollTo(0, 0) }, [])

  // AUTOGUARDADO EN BORRADOR
  useEffect(() => {
    localStorage.setItem('alesli_draft', JSON.stringify(customOrder))
  }, [customOrder])

  // CÁLCULOS
  const totalFlowers = customOrder.flowers.reduce((acc, f) => acc + f.qty, 0)
  
  const total = useMemo(() => {
    const basePrice = customOrder.base?.price || 0
    const flowersPrice = customOrder.flowers.reduce((acc, f) => acc + (f.qty * f.price), 0)
    const extrasPrice = customOrder.extras.reduce((acc, e) => acc + e.price, 0)
    return basePrice + flowersPrice + extrasPrice
  }, [customOrder])

  // GENERAR ARRAY VISUAL DE FLORES
  const visualFlowers = useMemo(() => {
    const arr = []
    customOrder.flowers.forEach(f => {
      for (let i = 0; i < f.qty; i++) {
        arr.push(f)
      }
    })
    return arr
  }, [customOrder.flowers])

  // ACCIONES
  const handleFlowerChange = (flower, delta) => {
    if (delta > 0 && totalFlowers >= MAX_FLOWERS) {
      addToast('Has alcanzado el límite máximo de flores', 'error')
      return 
    }

    setCustomOrder(prev => {
      const existing = prev.flowers.find(f => f.id === flower.id)
      let newFlowers = [...prev.flowers]
      
      if (existing) {
        const newQty = Math.max(0, existing.qty + delta)
        if (newQty === 0) newFlowers = newFlowers.filter(f => f.id !== flower.id)
        else newFlowers = newFlowers.map(f => f.id === flower.id ? { ...f, qty: newQty } : f)
      } else if (delta > 0) {
        newFlowers.push({ ...flower, qty: 1 })
      }
      return { ...prev, flowers: newFlowers }
    })
  }

  const toggleExtra = (extra) => {
    setCustomOrder(prev => {
      const exists = prev.extras.find(e => e.id === extra.id)
      return { ...prev, extras: exists ? prev.extras.filter(e => e.id !== extra.id) : [...prev.extras, extra] }
    })
  }

  // LÓGICA DE PLANTILLA CON MODAL PROPIO
  const confirmApplyTemplate = () => {
    if (templateToConfirm) {
      setCustomOrder({ ...templateToConfirm })
      setTemplateToConfirm(null)
      addToast(`Plantilla "${templateToConfirm.name}" aplicada con éxito`, 'success')
    }
  }

  const handleAddToCart = () => {
    const finalProduct = {
      id: `custom-${Date.now()}`,
      name: `Arreglo Personalizado (${customOrder.base.name})`,
      price: total,
      image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80',
      customDetails: customOrder,
      isCustom: true
    }
    addToCart(finalProduct)
    localStorage.removeItem('alesli_draft')
    addToast('Magia añadida a tu bolsa', 'success')
    navigate('/carrito')
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10 animate-fade-in transition-colors duration-500">
      
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] md:text-[44px] font-black text-text-dark dark:text-white leading-tight flex items-center gap-3">
            Arma tu Magia <Wand2 className="text-primary" size={32} />
          </h1>
          <p className="text-[14px] text-text-muted dark:text-gray-400 font-medium mt-1">Diseña un arreglo único. Se guarda automáticamente.</p>
        </div>
        
        {/* SUGERENCIAS RÁPIDAS */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {TEMPLATES.map(t => (
            <button 
              key={t.id} 
              onClick={() => setTemplateToConfirm(t)} 
              className="px-4 py-2 bg-gray-50 dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 rounded-lg text-[11px] font-black uppercase tracking-widest flex items-center gap-2 whitespace-nowrap hover:border-primary transition-colors"
            >
              <Zap size={14} className="text-yellow-500" /> {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* IZQUIERDA: PREVISUALIZACIÓN AVANZADA */}
        <div className="lg:col-span-6 xl:col-span-7 lg:sticky lg:top-24">
          <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#151522] dark:to-[#1a1a2e] rounded-[32px] overflow-hidden shadow-inner flex flex-col items-center justify-end pb-12 border border-gray-200 dark:border-white/5">
            
            <div className="absolute top-8 left-8 bg-white/80 dark:bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl text-[12px] font-black uppercase tracking-widest text-text-dark dark:text-white shadow-sm border border-white/20">
              Vista Previa
            </div>

            <div className="relative w-64 h-80 flex flex-col items-center justify-end">
              
              <div className="absolute bottom-20 w-full h-64 flex justify-center items-end">
                {visualFlowers.length === 0 ? (
                  <p className="text-gray-400 text-[14px] font-bold animate-pulse absolute bottom-10">Lienzo vacío</p>
                ) : (
                  visualFlowers.map((f, i) => (
                    <div 
                      key={i} 
                      className={`absolute w-12 h-12 rounded-2xl ${f.color} shadow-lg flex items-center justify-center text-2xl transition-all duration-500 ease-out`}
                      style={{ 
                        transform: `rotate(${(i * 15) - (visualFlowers.length * 7)}deg) translateY(-${Math.min(i * 8, 80)}px) translateX(${(i % 2 === 0 ? 1 : -1) * (i * 3)}px)`,
                        zIndex: 100 - i
                      }}
                    >
<<<<<<< HEAD
                      {f.emoji}
=======
                      <span className="text-[10px] text-white font-black text-center leading-tight px-1">{f.name.split(' ')[0]}</span>
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
                    </div>
                  ))
                )}
              </div>

<<<<<<< HEAD
              {customOrder.extras.map((e, i) => (
                <div key={i} className="absolute text-4xl animate-bounce" style={{ bottom: 120 + (i * 40), right: -20 - (i * 20), zIndex: 110 }}>
                  {e.icon}
                </div>
              ))}

=======
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
              <div className={`w-48 h-24 rounded-t-xl rounded-b-[40px] bg-gradient-to-br ${customOrder.base.color} shadow-2xl relative z-50 flex items-center justify-center border-t-4 border-white/20 transition-colors duration-500`}>
                 <span className="text-white/50 text-[10px] font-black uppercase tracking-widest">{customOrder.base.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* DERECHA: CONTROLES */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-6">
          
          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-sm">
            <h3 className="text-[14px] font-black text-text-dark dark:text-white uppercase tracking-widest mb-4">1. Elige la Base</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {BASE_OPTIONS.map(base => (
                <button 
                  key={base.id}
                  onClick={() => setCustomOrder({ ...customOrder, base })}
                  className={`p-3 rounded-xl border text-left transition-all ${customOrder.base?.id === base.id ? 'border-primary bg-pink-50 dark:bg-primary/10 shadow-sm' : 'border-gray-200 dark:border-white/10 hover:border-primary/50'}`}
                >
                  <p className="text-[13px] font-black text-text-dark dark:text-white mb-0.5">{base.name}</p>
                  <p className="text-[11px] text-text-muted font-bold">+{formatPrice(base.price)}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-black text-text-dark dark:text-white uppercase tracking-widest">2. Flores</h3>
              <div className="flex items-center gap-2">
                {totalFlowers >= MAX_FLOWERS && <AlertCircle size={14} className="text-red-500 animate-pulse" />}
                <span className={`text-[12px] font-bold px-2.5 py-1 rounded-md ${totalFlowers >= MAX_FLOWERS ? 'text-red-500 bg-red-50 dark:bg-red-500/10' : 'text-primary bg-pink-50 dark:bg-primary/10'}`}>
                  {totalFlowers}/{MAX_FLOWERS} seleccionadas
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              {FLOWER_OPTIONS.map(flower => {
                const qty = customOrder.flowers.find(f => f.id === flower.id)?.qty || 0
                return (
                  <div key={flower.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-3">
<<<<<<< HEAD
                      <div className="text-xl">{flower.emoji}</div>
=======
                      <div className={`w-8 h-8 rounded-lg ${flower.color}`}></div>
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
                      <div>
                        <p className="text-[14px] font-bold text-text-dark dark:text-white">{flower.name}</p>
                        <p className="text-[11px] text-text-muted">{formatPrice(flower.price)} c/u</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-white dark:bg-[#1a1a2e] border border-gray-200 dark:border-white/10 rounded-lg p-1">
                      <button onClick={() => handleFlowerChange(flower, -1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-text-dark dark:hover:text-white"><Minus size={14} /></button>
                      <span className="text-[13px] font-black w-4 text-center">{qty}</span>
                      <button disabled={totalFlowers >= MAX_FLOWERS} onClick={() => handleFlowerChange(flower, 1)} className="w-8 h-8 flex items-center justify-center text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:bg-pink-50 rounded-md"><Plus size={14} /></button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-sm">
            <h3 className="text-[14px] font-black text-text-dark dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              3. Dedicatoria <MessageSquare size={16} className="text-primary" />
            </h3>
            <textarea 
              placeholder="Escribe un mensaje inolvidable..."
              value={customOrder.dedication}
              onChange={(e) => setCustomOrder({...customOrder, dedication: e.target.value})}
              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-[13px] font-bold text-text-dark dark:text-white outline-none focus:border-primary transition-all resize-none min-h-[100px]"
            />
          </div>

          {/* CHECKOUT STICKY */}
          <div className="sticky bottom-4 md:static bg-text-dark dark:bg-[#151522] rounded-2xl p-6 text-white shadow-2xl md:shadow-none border border-transparent dark:border-white/10 z-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[13px] font-bold text-gray-400">Total a Pagar</span>
              <span className="text-[28px] font-black leading-none">{formatPrice(total)}</span>
            </div>
            <button 
              disabled={totalFlowers === 0}
              onClick={handleAddToCart}
              className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-xl font-black text-[13px] uppercase tracking-widest shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <ShoppingBag size={18} /> {totalFlowers === 0 ? 'Añade flores primero' : 'Agregar a la Bolsa'}
            </button>
          </div>

        </div>
      </div>

      {/* MODAL PERSONALIZADO DE CONFIRMACIÓN */}
      {templateToConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setTemplateToConfirm(null)}></div>
          
          <div className="bg-white dark:bg-[#1a1a2e] w-full max-w-md rounded-2xl p-8 relative z-10 shadow-2xl border border-gray-200 dark:border-white/10 animate-fade-in-up text-center">
            <div className="w-16 h-16 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap size={32} />
            </div>
            
            <h2 className="text-[20px] font-black text-text-dark dark:text-white mb-2">
              ¿Aplicar Plantilla?
            </h2>
            <p className="text-[14px] text-text-muted mb-8 leading-relaxed">
              Estás a punto de aplicar <span className="font-bold text-text-dark dark:text-white">"{templateToConfirm.name}"</span>. Esto reemplazará tu diseño actual.
            </p>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setTemplateToConfirm(null)}
                className="flex-1 py-3.5 bg-gray-100 dark:bg-white/5 text-text-dark dark:text-white rounded-xl font-black text-[12px] uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmApplyTemplate}
                className="flex-1 py-3.5 bg-primary text-white rounded-xl font-black text-[12px] uppercase tracking-widest shadow-md hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2"
              >
                <Check size={16} /> Aplicar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}