<<<<<<< HEAD
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
=======
import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import {
  Truck, ArrowRight, Bell, Flower2, ShieldCheck,
  LogIn, UserPlus as UserPlusIcon, ChevronRight, ChevronLeft,
  Leaf, Heart, Award, X, ShieldAlert, Sparkles
} from 'lucide-react'
import { getProducts } from '../services/productos'
import { HERO_SLIDES } from '../utils/constants'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, isAuth, isAdmin, roleLabel, roleBadge } = useApp()

  return (
    <div className="flex-1 w-full animate-fade-in">
      {/* ─── HERO / LANDING ─── */}
      <section className="relative overflow-hidden border-b border-border-light/30 dark:border-white/10 min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-secondary/[0.06] pointer-events-none" />

        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-3 h-3 bg-primary/20 rounded-full animate-float-slow" style={{ animationDelay: '0s' }} />
          <div className="absolute top-[20%] right-[12%] w-2 h-2 bg-secondary/20 rounded-full animate-float-slower" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-[60%] left-[8%] w-4 h-4 bg-primary/15 rounded-full animate-float-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-[25%] right-[8%] w-3 h-3 bg-secondary/15 rounded-full animate-float-slower" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-[40%] left-[50%] w-2 h-2 bg-primary/10 rounded-full animate-float-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-[15%] left-[30%] w-3 h-3 bg-secondary/10 rounded-full animate-float-slower" style={{ animationDelay: '2.5s' }} />
          <div className="absolute top-[75%] right-[20%] w-2 h-2 bg-primary/15 rounded-full animate-float-slow" style={{ animationDelay: '3s' }} />

          {/* Decorative flower shapes */}
          <svg className="absolute top-[15%] right-[8%] w-16 h-16 text-primary/[0.06] animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C50 0 60 30 65 45 C80 50 100 50 100 50 C100 50 80 50 65 55 C60 70 50 100 50 100 C50 100 40 70 35 55 C20 50 0 50 0 50 C0 50 20 50 35 45 C40 30 50 0 50 0Z" />
          </svg>
          <svg className="absolute bottom-[20%] left-[5%] w-12 h-12 text-secondary/[0.06] animate-spin-slow-reverse" viewBox="0 0 100 100" fill="currentColor" style={{ animationDelay: '1s' }}>
            <path d="M50 0 C50 0 60 30 65 45 C80 50 100 50 100 50 C100 50 80 50 65 55 C60 70 50 100 50 100 C50 100 40 70 35 55 C20 50 0 50 0 50 C0 50 20 50 35 45 C40 30 50 0 50 0Z" />
          </svg>

          {/* Subtle horizontal lines */}
          <div className="absolute top-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
          <div className="absolute top-[70%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/8 to-transparent" />

          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-shimmer-slow pointer-events-none" />
        </div>

        {/* Main content */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT: Brand + Info */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-5 h-0.5 bg-primary animate-width-in" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }} />
                <span className="text-[11px] font-bold text-primary uppercase tracking-[4px]">Bienvenido a</span>
              </div>
              <h1 className="text-[48px] md:text-[64px] font-heading font-black text-text-dark dark:text-white leading-[1.05] mb-3">
                Aleslí
                <span className="block text-primary">Floricultura</span>
              </h1>
              <p className="text-[20px] md:text-[24px] font-heading font-bold text-text-muted italic leading-relaxed mb-6">
                "Naturalmente para ti"
              </p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-secondary mb-6" />
              <p className="text-[16px] text-text-muted leading-relaxed max-w-lg mb-8 font-medium">
                Sistema integral de gestión para pedidos, clientes, catálogo e inventario.
                Flores, regalos y momentos especiales al alcance de un clic.
              </p>
              {!isAuth ? (
                <div className="flex flex-wrap gap-4 mb-10">
                  <button onClick={() => navigate('/login')} className="flex items-center gap-2.5 px-8 py-3.5 bg-primary text-white text-[13px] font-bold uppercase tracking-wider hover:bg-accent transition-all shadow-md hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0">
                    <LogIn size={17} /> Iniciar Sesión
                  </button>
                  <button onClick={() => { navigate('/login'); setTimeout(() => window.dispatchEvent(new Event('toggle-auth')), 100) }} className="flex items-center gap-2.5 px-8 py-3.5 border-2 border-primary text-primary text-[13px] font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all hover:-translate-y-0.5 active:translate-y-0">
                    <UserPlusIcon size={17} /> Registrarse
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-4 mb-10">
                  <div className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-[#151522] border border-border-light/30 dark:border-white/10">
                    <div className={`w-10 h-10 flex items-center justify-center text-white font-bold text-[15px] ${roleBadge}`}>
                      {user?.nombre?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-text-dark dark:text-white">{user?.nombre}</p>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{roleLabel}</p>
                    </div>
                  </div>
                  {isAdmin && (
                    <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 px-6 py-3 bg-secondary text-white text-[12px] font-bold uppercase tracking-wider hover:bg-accent transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                      Panel Admin
                    </button>
                  )}
                </div>
              )}
              <div className="flex items-center gap-6 text-[12px] font-bold text-text-muted">
                <div className="flex items-center gap-2"><ShieldCheck size={15} className="text-primary" /> Datos seguros</div>
                <div className="flex items-center gap-2"><Leaf size={15} className="text-primary" /> 100% natural</div>
                <div className="flex items-center gap-2"><Heart size={15} className="text-primary" /> Hecho con amor</div>
              </div>
            </div>

            {/* RIGHT: Logo + Feature Cards */}
            <div className="hidden lg:flex flex-col items-center gap-6">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-[480px] h-[480px] bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/5 blur-[100px] rounded-full pointer-events-none animate-pulse-glow" />
                <div className="absolute w-[320px] h-[320px] border border-primary/10 rounded-full pointer-events-none animate-spin-slow" />
                <div className="absolute w-[220px] h-[220px] border border-secondary/10 rounded-full pointer-events-none animate-spin-slow-reverse" style={{ animationDelay: '1s' }} />
                <div className="absolute w-[420px] h-[420px] border border-dashed border-primary/5 rounded-full pointer-events-none animate-spin-slower" style={{ animationDelay: '2s' }} />
                <img src="/header_logo.jpg" alt="Aleslí" className="w-[320px] h-auto object-contain relative z-10 drop-shadow-2xl" />
              </div>
              <div className="grid grid-cols-2 gap-3 w-full max-w-[360px]">
                {[
                  { icon: Flower2, text: 'Catálogo completo', color: 'text-primary' },
                  { icon: Truck, text: 'Envíos mismo día', color: 'text-blue-500' },
                  { icon: Award, text: 'Puntos y beneficios', color: 'text-yellow-600' },
                  { icon: Bell, text: 'Notificaciones', color: 'text-secondary' },
                ].map((feat, i) => {
                  const Icon = feat.icon
                  return (
                    <div key={i} className="flex items-center gap-2 p-3 bg-white dark:bg-[#151522] border border-border-light/30 dark:border-white/10 hover:border-primary/30 hover:-translate-y-0.5 transition-all">
                      <Icon size={16} className={feat.color} />
                      <span className="text-[11px] font-bold text-text-dark dark:text-white">{feat.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GALERÍA DE LOCALES / DECORACIONES ─── */}
      <GallerySection />

      {/* ─── CARRUSEL DE TARJETITAS (HERO SLIDES) ─── */}
      <section className="py-24 border-b border-border-light/30 dark:border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-primary" />
              <Sparkles size={16} className="text-primary" />
              <span className="text-[11px] font-bold text-primary uppercase tracking-[4px]">Especialidades</span>
              <Sparkles size={16} className="text-primary" />
              <div className="w-8 h-0.5 bg-primary" />
            </div>
            <h2 className="text-[32px] md:text-[40px] font-heading font-black text-text-dark dark:text-white leading-tight">
              Nuestras colecciones destacadas
            </h2>
            <p className="text-[15px] text-text-muted mt-3 max-w-xl mx-auto font-medium">
              Cada arreglo cuenta una historia. Descubrí nuestra selección especial.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            {HERO_SLIDES.map((slide, i) => (
              <div key={i} className="relative group overflow-hidden shadow-xl animate-fade-in-up min-h-[420px]" style={{ animationDelay: `${i * 0.15}s`, animationFillMode: 'backwards' }}>
                <img
                  src={slide.image}
                  alt={slide.tag}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0" style={{ background: slide.bg, opacity: 0.4 }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                <div className="relative z-10 p-8 min-h-[420px] flex flex-col justify-end">
                  <span className="inline-block w-max px-4 py-1.5 bg-white/15 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[3px] mb-4 border border-white/20">
                    {slide.tag}
                  </span>
                  <h3 className="text-[24px] font-heading font-black text-white leading-tight mb-2 drop-shadow-lg">
                    {slide.title[0]}<br />{slide.title[1]}
                  </h3>
                  <p className="text-[14px] text-white/80 leading-relaxed font-medium drop-shadow-md max-w-[90%]">
                    {slide.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATÁLOGO CARRUSEL ─── */}
      <CatalogCarousel navigate={navigate} />
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
    </div>
  )
}

<<<<<<< HEAD
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
=======
const GALLERY_SLIDES = [
  { src: '/images/galeria/galeria_1.jpg', gradient: 'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)', label: 'Local Central' },
  { src: '/images/galeria/galeria_2.jpg', gradient: 'linear-gradient(135deg,#2d1b69,#512da8,#7c4dff)', label: 'Sucursal Sopocachi' },
  { src: '/images/galeria/galeria_3.jpg', gradient: 'linear-gradient(135deg,#1b4332,#2d6a4f,#40916c)', label: 'Decoración Bodas' },
  { src: '/images/galeria/galeria_4.jpg', gradient: 'linear-gradient(135deg,#7f1d1d,#b91c1c,#ef4444)', label: 'Evento Empresarial' },
  { src: '/images/galeria/galeria_5.jpg', gradient: 'linear-gradient(135deg,#5b1e4a,#9d4edd,#e040a0)', label: 'Taller Creativo' },
  { src: '/images/galeria/galeria_6.jpg', gradient: 'linear-gradient(135deg,#1e3a5f,#2563eb,#60a5fa)', label: 'Tienda Calacoto' },
]

function GallerySection() {
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState({})

  const next = useCallback(() => setCurrent(i => (i + 1) % GALLERY_SLIDES.length), [])
  const prev = useCallback(() => setCurrent(i => (i - 1 + GALLERY_SLIDES.length) % GALLERY_SLIDES.length), [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative w-full overflow-hidden bg-gray-100 dark:bg-[#0a0a14] border-b border-border-light/30 dark:border-white/10">
      <div className="relative max-w-[1400px] mx-auto h-[300px] md:h-[420px] lg:h-[480px]">
        {GALLERY_SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              i === current
                ? 'opacity-100 scale-100 pointer-events-auto'
                : 'opacity-0 scale-[1.02] pointer-events-none'
            }`}
          >
            <div className="absolute inset-0" style={{ background: slide.gradient }} />
            <img
              src={slide.src}
              alt={slide.label}
              onLoad={() => setLoaded(s => ({ ...s, [i]: true }))}
              onError={(e) => { e.target.style.display = 'none' }}
              className={`w-full h-full object-cover transition-opacity duration-700 ${loaded[i] ? 'opacity-100' : 'opacity-0'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[3px] border border-white/20">
                {slide.label}
              </span>
            </div>
          </div>
        ))}

        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md hover:bg-white/30 text-white border border-white/20 flex items-center justify-center transition-all z-10">
          <ChevronLeft size={20} />
        </button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-md hover:bg-white/30 text-white border border-white/20 flex items-center justify-center transition-all z-10">
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {GALLERY_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-500 rounded-full ${
                i === current ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CatalogCarousel({ navigate }) {
  const { isAuth, isCliente, isAdmin, isEncargado } = useApp()
  const { addToast } = useToast()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRoleWarning, setShowRoleWarning] = useState(false)
  const scrollRef = useRef(null)

  const [visibleCards, setVisibleCards] = useState(new Set())

  useEffect(() => {
    getProducts()
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (loading) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set(prev).add(entry.target.dataset.index))
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.1 }
    )
    document.querySelectorAll('[data-index]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [loading, products.length])

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' })
    }
  }

  const handleOrderClick = () => {
    if (!isAuth) {
      setShowLoginModal(true)
    } else if (isCliente) {
      navigate('/carrito')
    } else {
      setShowRoleWarning(true)
    }
  }

  return (
    <section className="py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-0.5 bg-primary" />
              <span className="text-[11px] font-bold text-primary uppercase tracking-[4px]">Nuestro Catálogo</span>
            </div>
            <h2 className="text-[32px] md:text-[38px] font-heading font-black text-text-dark dark:text-white leading-tight">
              Explorá nuestra<br />colección completa
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={() => scroll(-1)} className="w-10 h-10 border border-border-light/40 dark:border-white/10 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll(1)} className="w-10 h-10 border border-border-light/40 dark:border-white/10 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex gap-6 overflow-hidden">
            {[1,2,3,4].map(i => <div key={i} className="min-w-[280px] h-[380px] bg-cream dark:bg-white/5 animate-pulse flex-shrink-0" />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 border border-border-light/30 dark:border-white/10">
            <Flower2 size={48} className="mx-auto text-text-muted/30 mb-4" />
            <p className="text-[16px] font-bold text-text-dark dark:text-white mb-1">Catálogo próximo a cargarse</p>
            <p className="text-[13px] text-text-muted">Pronto tendremos productos disponibles.</p>
          </div>
        ) : (
          <div className="relative">
            <div ref={scrollRef} className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {products.map((product, i) => (
                <div key={product.id || i} data-index={i} className={`min-w-[280px] max-w-[280px] flex-shrink-0 snap-start bg-white dark:bg-[#151522] border border-border-light/30 dark:border-white/10 group hover:shadow-xl hover:-translate-y-2 hover:border-primary/30 transition-all duration-500 ease-out ${
                  visibleCards.has(String(i)) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                  style={{ transitionDuration: '600ms', transitionDelay: `${i * 80}ms`, transitionProperty: 'opacity, transform' }}
                >
                  <div className="h-[260px] overflow-hidden bg-cream dark:bg-white/5 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                    {product.imagen || product.imagen_url ? (
                      <img src={product.imagen || product.imagen_url} alt={product.nombre} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-[1deg]" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-110"><Flower2 size={48} className="text-border-light/50" /></div>
                    )}
                    <div className="absolute bottom-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <span className="px-3 py-1 bg-white/90 dark:bg-black/70 text-[10px] font-bold uppercase tracking-wider text-primary rounded shadow-lg">Ver más</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[2px] group-hover:tracking-[3px] transition-all duration-300">{product.categoria_nombre || 'General'}</span>
                    <h3 className="text-[16px] font-heading font-bold text-text-dark dark:text-white mt-1 leading-tight truncate group-hover:text-primary transition-colors duration-300">{product.nombre || `Producto ${i + 1}`}</h3>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[18px] font-heading font-black text-primary group-hover:scale-105 transition-transform duration-300 inline-block">Bs. {product.precio_venta || '0.00'}</span>
                      <button onClick={handleOrderClick} className="px-5 py-2.5 bg-primary text-white text-[11px] font-bold uppercase tracking-wider hover:bg-accent hover:shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300">Pedir</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-10">
          <button onClick={() => navigate('/flores')} className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary text-[12px] font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all">
            Ver catálogo completo <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowLoginModal(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="bg-white dark:bg-[#151522] w-full max-w-sm shadow-xl border border-border-light/30 dark:border-white/10 relative z-10 animate-fade-in-up p-8" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-text-muted hover:text-text-dark dark:hover:text-white transition-colors"><X size={18} /></button>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mx-auto mb-5"><LogIn size={24} className="text-primary" /></div>
              <h3 className="text-[20px] font-heading font-bold text-text-dark dark:text-white mb-2">Inicia sesión</h3>
              <p className="text-[13px] text-text-muted mb-6 leading-relaxed">Necesitás estar registrado para realizar pedidos. Ingresá o creá tu cuenta.</p>
              <div className="flex flex-col gap-3">
                <button onClick={() => { setShowLoginModal(false); navigate('/login') }} className="w-full py-3 bg-primary text-white text-[12px] font-bold uppercase tracking-wider hover:bg-accent transition-all">Iniciar sesión</button>
                <button onClick={() => { setShowLoginModal(false); navigate('/login'); setTimeout(() => window.dispatchEvent(new Event('toggle-auth')), 100) }} className="w-full py-3 border-2 border-primary text-primary text-[12px] font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all">Crear cuenta</button>
              </div>
              <button onClick={() => setShowLoginModal(false)} className="mt-4 text-[12px] font-bold text-text-muted hover:text-primary transition-colors">Seguir explorando</button>
            </div>
          </div>
        </div>
      )}

      {showRoleWarning && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" onClick={() => setShowRoleWarning(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="bg-white dark:bg-[#151522] w-full max-w-sm shadow-xl border border-border-light/30 dark:border-white/10 relative z-10 p-8" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowRoleWarning(false)} className="absolute top-4 right-4 text-text-muted hover:text-text-dark dark:hover:text-white transition-colors"><X size={18} /></button>
            <div className="text-center">
              <div className="w-14 h-14 bg-red-50 flex items-center justify-center mx-auto mb-5"><ShieldAlert size={24} className="text-red-500" /></div>
              <h3 className="text-[20px] font-heading font-bold text-text-dark dark:text-white mb-2">Acción denegada</h3>
              <p className="text-[13px] text-text-muted mb-6 leading-relaxed">Los usuarios con rol <strong>Administrador</strong> o <strong>Encargado</strong> no pueden realizar compras. Ingresá con una cuenta de cliente para agregar productos al carrito.</p>
              <button onClick={() => setShowRoleWarning(false)} className="w-full py-3 bg-gray-800 text-white text-[12px] font-bold uppercase tracking-wider hover:bg-gray-700 transition-all rounded-xl">Entendido</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function QuickAction({ icon: Icon, label, color, bg, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-4 p-4 hover:bg-cream dark:hover:bg-white/5 transition-all group border border-transparent hover:border-border-light/40 dark:hover:border-white/10">
      <div className={`w-10 h-10 ${bg} flex items-center justify-center ${color}`}>
        <Icon size={18} />
      </div>
      <span className="flex-1 text-left text-[13px] font-bold text-text-dark dark:text-white group-hover:text-primary transition-colors">{label}</span>
      <ArrowRight size={16} className="text-text-muted group-hover:text-primary transition-colors" />
    </button>
  )
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
}