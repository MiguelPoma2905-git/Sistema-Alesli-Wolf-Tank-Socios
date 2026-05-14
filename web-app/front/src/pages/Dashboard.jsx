import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroCarousel from '../components/ui/Carousel'
import ProductCard from '../components/shared/ProductCard'
import { flowers, gifts, peluches, chocolates } from '../data/mockData' // ¡CORREGIDO! Ya no importamos activeOrder de aquí
import { FEATURES } from '../utils/constants'
import { formatDate } from '../utils/helpers'
import { Truck, Package, CheckCircle, Receipt, Star } from 'lucide-react'

const INSPIRATIONAL_QUOTES = [
  "Donde las flores florecen, hay esperanza.",
  "El detalle perfecto para un momento inolvidable.",
  "Siembra amor y cosecharás flores.",
  "Regala emociones, naturalmente para ti.",
  "La vida protege la vida, elige natural.",
  "Cada flor es un alma floreciendo en la naturaleza.",
  "Haz que cada día sea especial con un toque de naturaleza.",
  "La belleza de la vida se encuentra en los pequeños detalles.",
  "El amor es la flor que has que florecer en tu corazón."
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [quote, setQuote] = useState(INSPIRATIONAL_QUOTES[0])
  const today = new Date();

  // LA MAGIA RESTAURADA: El simulador de pedido activo vive aquí adentro
  // step 1: Confirmado | step 2: Preparando | step 3: En Camino | step 4: Entregado
  const activeOrder = {
    isActive: true, 
    id: '#FLO8923',
    status: 'En camino',
    product: 'Ramo de 50 Rosas Rojas',
    step: 3 
  }

  useEffect(() => {
    setQuote(INSPIRATIONAL_QUOTES[Math.floor(Math.random() * INSPIRATIONAL_QUOTES.length)]);
  }, [])

  const allProducts = [...flowers, ...gifts, ...peluches, ...chocolates];

  return (
    <div className="flex flex-col min-h-screen w-full animate-fade-in bg-bg-light dark:bg-[#0f0f1a]">
      <div className="px-6 md:px-12 py-8 max-w-[1400px] w-full mx-auto flex-1 space-y-12 md:space-y-16">

        {/* 1. HEADER INSPIRACIONAL */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pl-2">
            <div>
              <h1 className="text-[32px] md:text-[38px] font-black text-text-dark dark:text-white leading-tight">
                Naturalmente para ti
              </h1>
              <p className="text-primary font-bold text-[13px] md:text-[14px] uppercase tracking-widest mt-1">
                {formatDate(today)} — Inspiración del día
              </p>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-[13px] text-text-muted font-medium italic max-w-[240px] animate-fade-in">
                "{quote}"
              </p>
            </div>
          </div>
        </section>

        {/* 2. WIDGET DE PEDIDO ACTIVO */}
        {activeOrder.isActive && (
          <section className="animate-fade-in-up">
            <div className="bg-white dark:bg-[#1a1a2e] border-2 border-pink-light dark:border-primary/20 rounded-[32px] p-6 md:p-8 flex flex-col xl:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-card">
              
              <div className="flex items-center gap-5 z-10 w-full xl:w-auto">
                <div className="w-16 h-16 rounded-2xl bg-pink-50 dark:bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  {activeOrder.step === 4 ? <CheckCircle size={28} /> : <Truck size={28} className={activeOrder.step === 3 ? "animate-pulse" : ""} />}
                </div>
                <div>
                  <span className="inline-block px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-2 shadow-sm">
                    {activeOrder.step === 4 ? 'Pedido Completado' : 'Pedido en Curso'}
                  </span>
                  <h3 className="text-[20px] md:text-[22px] font-black text-text-dark dark:text-white leading-tight">
                    {activeOrder.step === 1 && "Pago confirmado"}
                    {activeOrder.step === 2 && "Preparando tu arreglo"}
                    {activeOrder.step === 3 && "El repartidor va en camino"}
                    {activeOrder.step === 4 && "¡Entrega exitosa!"}
                  </h3>
                  <p className="text-[14px] text-text-muted font-medium mt-1">
                    {activeOrder.product} • ID: {activeOrder.id}
                  </p>
                </div>
              </div>

              <div className="hidden md:flex items-center w-full max-w-2xl z-10">
                <Step icon={<Receipt size={14}/>} label="Confirmado" active={activeOrder.step >= 1} />
                <Line active={activeOrder.step >= 2} />
                <Step icon={<Package size={14}/>} label="Preparando" active={activeOrder.step >= 2} />
                <Line active={activeOrder.step >= 3} />
                <Step icon={<Truck size={14}/>} label="En Camino" active={activeOrder.step >= 3} />
                <Line active={activeOrder.step >= 4} />
                <Step icon={<CheckCircle size={14}/>} label="Entregado" active={activeOrder.step >= 4} />
              </div>

              <div className="z-10 w-full xl:w-auto flex justify-end">
                {activeOrder.step === 4 ? (
                  <button onClick={() => navigate('/resenas')} className="w-full xl:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-black text-[13px] md:text-[14px] shadow-md hover:scale-105 transition-transform uppercase tracking-wide">
                    <Star size={18} /> Calificar arreglo
                  </button>
                ) : (
                  <div className="px-6 py-3 bg-bg-light dark:bg-white/5 rounded-2xl border border-pink-light/50 dark:border-white/5 text-[12px] font-bold text-text-muted text-center max-w-[200px]">
                    Te notificaremos cuando el estado cambie.
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 3. HERO CAROUSEL */}
        <section>
          <HeroCarousel />
        </section>

        {/* 4. CATÁLOGO COMPLETO */}
        <section>
          <div className="flex items-center justify-between mb-8 pl-2 border-l-4 border-primary">
            <div className="ml-4">
              <h2 className="text-[26px] font-black text-text-dark dark:text-white">Nuestro Catálogo</h2>
              <p className="text-[14px] text-text-muted font-medium">Explora la frescura y elegancia en cada detalle</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {allProducts.map((p, idx) => (
              <ProductCard key={`${p.id}-${idx}`} product={p} />
            ))}
          </div>
        </section>

        {/* 5. GARANTÍAS (FEATURES) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-white dark:bg-[#1a1a2e] rounded-3xl shadow-card p-6 flex items-center gap-5 transition-all hover:-translate-y-1 border border-pink-light/30 dark:border-white/5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[26px] shadow-sm flex-shrink-0" style={{ background: f.bg }}>
                {i === 0 ? '🚚' : i === 1 ? '🔒' : i === 2 ? '🎁' : '💬'}
              </div>
              <div>
                <div className="text-[14px] font-black text-text-dark dark:text-white mb-1">{f.title}</div>
                <div className="text-[12px] text-text-muted font-medium">{f.sub}</div>
              </div>
            </div>
          ))}
        </section>

      </div>
    </div>
  )
}

function Step({ icon, label, active }) {
  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${active ? 'bg-primary text-white shadow-md scale-110' : 'bg-bg-light dark:bg-white/5 text-text-muted border border-pink-light/50 dark:border-white/10'}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-black uppercase tracking-wider transition-colors ${active ? 'text-primary' : 'text-text-muted'}`}>{label}</span>
    </div>
  )
}
function Line({ active }) {
  return <div className={`h-[3px] flex-[0.5] -mt-6 rounded-full transition-colors duration-500 ${active ? 'bg-primary' : 'bg-pink-light dark:bg-white/10'}`} />
}