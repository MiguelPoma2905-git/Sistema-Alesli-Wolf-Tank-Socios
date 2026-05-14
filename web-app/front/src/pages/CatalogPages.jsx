import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, ArrowLeft, Star, Info, CheckCircle, AlertCircle, Zap, Check, Loader2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/shared/ProductCard'
import FilterBar from '../components/ui/Filter'
import Rating from '../components/ui/Rating'
import { formatPrice } from '../utils/helpers'
import { OCCASIONS } from '../utils/constants'
import { flowers, gifts, peluches, chocolates } from '../data/mockData'

// ─── 1. Flores.jsx ───────────────────────────────────────────────────────────
export function Flores() {
  const [filter, setFilter] = useState('Todas')
  const cats = ['Todas','Rosas','Tulipanes','Girasoles','Orquídeas','Lirios','Mixtos']
  const filtered = filter === 'Todas' ? flowers : flowers.filter(f => f.cat === filter)

  return (
    <div className="px-6 md:px-12 py-10 max-w-[1400px] mx-auto animate-fade-in transition-colors duration-500">
      <div className="mb-8">
        <h1 className="text-[32px] md:text-[42px] font-black text-text-dark dark:text-white leading-tight transition-colors duration-500">
          Flores frescas
        </h1>
        <p className="text-[14px] md:text-[16px] text-text-muted mt-2 font-medium transition-colors duration-500">
          Seleccionadas cada mañana en La Paz — llegan perfectas a tu puerta.
        </p>
      </div>
      <FilterBar tabs={cats} active={filter} onChange={setFilter} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}

// ─── 2.1 COMPONENTE DE ERROR (Product Not Found) ─────────────────────────────
function ProductNotFound() {
  const navigate = useNavigate()
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 animate-fade-in">
      <div className="w-24 h-24 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-6">
        <AlertCircle size={40} />
      </div>
      <h2 className="text-[32px] font-black text-text-dark dark:text-white mb-4">Producto no encontrado</h2>
      <p className="text-text-muted dark:text-gray-400 mb-8 text-center max-w-sm">
        El arreglo que buscas ya no está disponible o el enlace es incorrecto.
      </p>
      <button onClick={() => navigate('/')} className="bg-primary text-white px-10 py-3 rounded-full font-black text-[13px] uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
        Volver al Catálogo
      </button>
    </div>
  )
}

// ─── 2.2 DetalleProducto.jsx (MOTOR CON NAVEGACIÓN Y ANIMACIONES) ────────────
export function DetalleProducto() {
  const { id } = useParams()
  const { addToCart, toggleFav, isFav } = useApp()
  const navigate = useNavigate()
  
  const allProducts = useMemo(() => [...flowers, ...gifts, ...peluches, ...chocolates], [])
  const product = allProducts.find(p => p.id === Number(id))

  const [qty, setQty] = useState(1)
  const [imgIdx, setImg] = useState(0)
  
  const sizes = ['Pequeño', 'Mediano', 'Grande']
  const [selectedSize, setSelectedSize] = useState('Mediano')
  
  // 🔴 ESTADO DE ANIMACIÓN Y FLUJO
  const [actionStatus, setActionStatus] = useState('idle') // 'idle' | 'cart' | 'buy'

  useEffect(() => { 
    setQty(1); 
    setImg(0); 
    setSelectedSize('Mediano');
    setActionStatus('idle');
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }, [id, product])

  if (!product) return <ProductNotFound />

  const getDynamicPrice = () => {
    const base = Number(product.price)
    if (selectedSize === 'Pequeño') return base * 0.8 
    if (selectedSize === 'Grande') return base * 1.4  
    return base
  }

  const currentPrice = getDynamicPrice()
  const fav = isFav(product.id)
  const imgs = [product.img || '🎁', '✨', '🎀', '💝']
  
  const stockLeft = product.stock !== undefined ? product.stock : 12; 
  const isStockLow = stockLeft <= 3 && stockLeft > 0;
  const isOutOfStock = stockLeft === 0;

  const relatedProducts = useMemo(() => {
    return allProducts
      .filter(p => (p.cat === product.cat || p.size === product.size) && p.id !== product.id)
      .slice(0, 4)
  }, [allProducts, product])

  // 🔴 LÓGICA BLINDADA: CARRITO -> ANIMACIÓN -> RETORNO AL CATÁLOGO
  const handleAddToCart = () => {
    if (isOutOfStock || actionStatus !== 'idle') return;
    setActionStatus('cart');
    addToCart({ ...product, price: currentPrice, qty, selectedSize });
    
    // Mostramos la animación de éxito por 800ms y regresamos a la tienda
    setTimeout(() => {
      navigate(-1);
    }, 800);
  }

  // 🔴 LÓGICA BLINDADA: COMPRAR AHORA -> ANIMACIÓN -> CHECKOUT DIRECTO
  const handleBuyNow = () => {
    if (isOutOfStock || actionStatus !== 'idle') return;
    setActionStatus('buy');
    addToCart({ ...product, price: currentPrice, qty, selectedSize });
    
    // Teletransporte al checkout después de una micro-animación
    setTimeout(() => {
      navigate('/checkout');
    }, 500);
  }

  const displaySizes = product.sizes || ['Estándar', 'Premium', 'Deluxe'];
  const currentSize = selectedSize || displaySizes[0];

  return (
    <div className="px-4 md:px-12 py-10 max-w-[1400px] mx-auto animate-fade-in transition-colors duration-500">
      
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[13px] font-bold text-text-muted hover:text-primary mb-8 group transition-colors">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver al catálogo
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-20">
        
        <div className="space-y-4 lg:sticky lg:top-[100px] max-w-md mx-auto w-full">
          <div className={`aspect-square bg-gradient-to-br from-pink-50/50 to-pink-100/50 dark:from-white/5 dark:to-transparent rounded-[32px] flex items-center justify-center text-[120px] md:text-[140px] shadow-inner relative overflow-hidden group transition-all duration-500 border border-pink-light/50 dark:border-white/5 ${isOutOfStock ? 'grayscale opacity-60' : 'hover:scale-[1.01]'}`}>
            <span className="drop-shadow-lg transition-transform duration-500 group-hover:scale-110">{imgs[imgIdx]}</span>
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                <div className="bg-red-500 text-white px-8 py-3 rounded-full font-black uppercase tracking-widest rotate-[-12deg] shadow-2xl border-2 border-white">Agotado</div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {imgs.map((img, i) => (
              <div key={i} onClick={() => setImg(i)} className={`aspect-square rounded-[20px] flex items-center justify-center text-[36px] cursor-pointer transition-all duration-300 border-2 ${imgIdx === i ? 'border-primary bg-pink-50 dark:bg-primary/20 scale-105' : 'border-transparent bg-bg-light dark:bg-white/5 hover:border-primary/30'}`}>
                {img}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col h-full justify-center">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-black text-primary uppercase tracking-[3px] bg-pink-50 dark:bg-primary/10 px-3 py-1.5 rounded-md">
              {product.cat || 'Colección Alesli'}
            </div>
            
            {isOutOfStock ? (
              <span className="text-[12px] text-red-500 font-bold bg-red-50 dark:bg-red-500/10 px-3 py-1.5 rounded-full flex items-center gap-1.5"><AlertCircle size={14} /> Agotado temporalmente</span>
            ) : isStockLow ? (
              <span className="text-[12px] text-orange-500 dark:text-orange-400 font-bold bg-orange-50 dark:bg-orange-500/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-pulse"><AlertCircle size={14} /> ¡Solo quedan {stockLeft}!</span>
            ) : (
              <span className="text-[12px] text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-500/10 px-3 py-1.5 rounded-full flex items-center gap-1.5"><CheckCircle size={14} /> Disponible</span>
            )}
          </div>
          
          <h1 className="text-[34px] md:text-[44px] font-black text-text-dark dark:text-white leading-tight mb-4 tracking-tight">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-3 mb-6">
            <Rating value={product.rating || 4.9} showCount count={product.reviews || 128} />
          </div>
          
          <div className="text-[40px] font-black text-text-dark dark:text-white mb-6 leading-none tracking-tight transition-all duration-300">
            {formatPrice(currentPrice)}
          </div>
          
          <p className="text-[14px] text-text-muted dark:text-gray-400 leading-relaxed mb-8 font-medium max-w-xl">
            {product.desc || 'Una selección exclusiva preparada con los más altos estándares de calidad. Creado por expertos floristas en La Paz para garantizar frescura y una presentación impecable.'}
          </p>

          <div className="mb-10">
            <h3 className="text-[12px] font-black text-text-muted dark:text-gray-400 uppercase tracking-[2px] mb-4">Elige el Tamaño</h3>
            <div className="grid grid-cols-3 gap-3">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-[20px] font-black text-[13px] uppercase tracking-wider transition-all duration-300 border-2 ${selectedSize === size ? 'border-primary bg-pink-50 dark:bg-primary/10 text-primary shadow-sm scale-105' : 'border-pink-light/50 dark:border-white/10 bg-transparent text-text-muted hover:border-primary/50 dark:hover:border-primary/50'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* BOTONERA TÁCTICA Y ANIMADA */}
          <div className="flex flex-col gap-4 mb-10">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-5 h-14 rounded-full px-2 border shadow-inner transition-colors ${isOutOfStock || actionStatus !== 'idle' ? 'opacity-50 pointer-events-none bg-gray-100 dark:bg-white/5 dark:border-white/5' : 'bg-bg-light dark:bg-white/5 border-pink-light/50 dark:border-white/10'}`}>
                <button disabled={qty <= 1} onClick={() => setQty(q => q - 1)} className="w-10 h-10 rounded-full flex items-center justify-center text-[20px] font-bold text-text-dark dark:text-white hover:bg-white dark:hover:bg-white/10 transition-all">-</button>
                <span className="font-black text-[15px] w-6 text-center text-text-dark dark:text-white">{qty}</span>
                <button disabled={qty >= stockLeft} onClick={() => setQty(q => q + 1)} className="w-10 h-10 rounded-full flex items-center justify-center text-[20px] font-bold text-text-dark dark:text-white hover:bg-white dark:hover:bg-white/10 transition-all">+</button>
              </div>
              
              {/* Botón Carrito Animado */}
              <button 
                disabled={isOutOfStock || actionStatus !== 'idle'}
                onClick={handleAddToCart} 
                className={`flex-1 border-2 font-black text-[13px] uppercase tracking-widest h-14 rounded-full flex items-center justify-center gap-2 transition-all duration-300 ${
                  isOutOfStock ? 'bg-gray-100 border-gray-200 text-gray-400 dark:bg-white/5 dark:border-white/5 dark:text-gray-600' : 
                  actionStatus === 'cart' ? 'bg-green-500 border-green-500 text-white scale-[1.02] shadow-lg shadow-green-500/30' : 
                  'bg-white dark:bg-white/5 border-primary text-primary dark:text-white hover:bg-pink-50 dark:hover:bg-white/10 active:scale-95'
                }`}
              >
                {isOutOfStock ? 'Agotado' : 
                 actionStatus === 'cart' ? <><Check size={18} className="animate-bounce" /> ¡Agregado!</> : 
                 <><ShoppingCart size={18} /> Al Carrito</>}
              </button>

              <button onClick={() => toggleFav(product.id)} className="w-14 h-14 rounded-full border-2 border-pink-light dark:border-white/10 flex items-center justify-center text-[24px] hover:border-primary hover:bg-pink-50 dark:hover:bg-primary/10 transition-all group shrink-0">
                <Heart size={22} className={`transition-all duration-300 ${fav ? 'fill-primary text-primary scale-110' : 'text-text-muted group-hover:text-primary'}`} />
              </button>
            </div>

            {/* Botón Comprar Ahora Animado */}
            <button 
              disabled={isOutOfStock || actionStatus !== 'idle'}
              onClick={handleBuyNow} 
              className={`w-full font-black text-[15px] uppercase tracking-[2px] h-14 rounded-full flex items-center justify-center gap-2 shadow-xl transition-all duration-300 ${
                isOutOfStock ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none dark:bg-white/10 dark:text-gray-600' : 
                actionStatus === 'buy' ? 'bg-secondary text-white scale-[0.98]' :
                'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-primary/40 hover:-translate-y-1'
              }`}
            >
              {actionStatus === 'buy' ? <><Loader2 size={20} className="animate-spin" /> Procesando...</> : <><Zap size={20} className={isOutOfStock ? "fill-gray-400" : "fill-white"} /> Comprar Ahora</>}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-pink-light/50 dark:border-white/5">
            {['🚚 Envío seguro en La Paz', '🔒 Pagos 100% protegidos', '✨ Calidad Premium', '💌 Tarjeta dedicatoria'].map(f => (
              <div key={f} className="flex items-center gap-3 text-[13px] font-bold text-text-muted dark:text-gray-400">
                <div className="w-6 h-6 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-500"><CheckCircle size={12}/></div>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="pt-16 border-t border-pink-light/50 dark:border-white/5 mt-10">
          <h3 className="text-[24px] font-black text-text-dark dark:text-white mb-8">También te podría gustar</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── 3. Regalos.jsx ──────────────────────────────────────────────────────────
export function Regalos() {
  const [filter, setFilter] = useState('Todos')
  const cats = ['Todos','Cajas regalo','Combos flores','Desayunos','Ramos + regalo']
  return (
    <div className="px-6 md:px-12 py-10 max-w-[1400px] mx-auto animate-fade-in">
      <h1 className="text-[32px] md:text-[42px] font-black text-text-dark dark:text-white mb-8 transition-colors">Regalos Especiales</h1>
      <FilterBar tabs={cats} active={filter} onChange={setFilter} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
        {gifts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}

// ─── 4. Peluches.jsx ─────────────────────────────────────────────────────────
export function Peluches() {
  const [filter, setFilter] = useState('Todos')
  const sizes2 = ['Todos','Pequeño','Mediano','Grande','Gigante']
  const filtered = filter === 'Todos' ? peluches : peluches.filter(p => p.size === filter)
  return (
    <div className="px-6 md:px-12 py-10 max-w-[1400px] mx-auto animate-fade-in">
      <h1 className="text-[32px] md:text-[42px] font-black text-text-dark dark:text-white mb-8 transition-colors">Peluches Adorables</h1>
      <FilterBar tabs={sizes2} active={filter} onChange={setFilter} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}

// ─── 5. Chocolate.jsx ────────────────────────────────────────────────────────
export function Chocolate() {
  const [filter, setFilter] = useState('Todos')
  const cats2 = ['Todos','Bombones','Caja premium','Trufas','Artesanal']
  const filtered = filter === 'Todos' ? chocolates : chocolates.filter(c => c.cat === filter)
  return (
    <div className="px-6 md:px-12 py-10 max-w-[1400px] mx-auto animate-fade-in">
      <h1 className="text-[32px] md:text-[42px] font-black text-text-dark dark:text-white mb-8 transition-colors">Chocolates Premium</h1>
      <FilterBar tabs={cats2} active={filter} onChange={setFilter} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}

// ─── 6. Ocasiones.jsx (REDISEÑO CALENDARIO PREMIUM) ──────────────────────────
export function Ocasiones() {
  const navigate = useNavigate();
  const currentMonth = new Date().getMonth() + 1; 

  const calendarData = [
    { name: 'San Valentín', date: '14 de Febrero', month: 2 },
    { name: 'Día de la Mujer', date: '8 de Marzo', month: 3 },
    { name: 'Día del Padre', date: '19 de Marzo', month: 3 },
    { name: 'Día del Niño', date: '12 de Abril', month: 4 },
    { name: 'Día de la Madre', date: '27 de Mayo', month: 5 },
    { name: 'Día del Maestro', date: '6 de Junio', month: 6 },
    { name: 'Día de la Amistad', date: '23 de Julio', month: 7 },
    { name: 'Día de la Primavera', date: '21 de Septiembre', month: 9 },
    { name: 'Todos Santos', date: '2 de Noviembre', month: 11 },
    { name: 'Navidad', date: '25 de Diciembre', month: 12 },
  ];

  const fullCalendar = calendarData.map(item => {
    const base = OCCASIONS.find(o => o.name === item.name) || {};
    return { ...base, ...item };
  });

  let nextBigDate = fullCalendar.find(o => o.month >= currentMonth) || fullCalendar[0];

  return (
    <div className="px-6 md:px-12 py-10 max-w-[1400px] mx-auto animate-fade-in space-y-16 transition-colors duration-500">
      <section className="text-center max-w-2xl mx-auto">
        <h1 className="text-[36px] md:text-[52px] font-black text-text-dark dark:text-white transition-colors">Momentos Alesli</h1>
        <p className="text-[15px] md:text-[17px] text-text-muted mt-4 font-medium transition-colors">Organizamos el año floral para que siempre estés un paso adelante.</p>
      </section>

      <section className="w-full min-h-[300px] md:h-[400px] rounded-[48px] overflow-hidden relative shadow-card-lg group" style={{ background: nextBigDate.bg }}>
        <div className="absolute inset-0 bg-black/20 dark:bg-black/50 transition-colors z-0"></div>
        <div className="absolute top-0 right-0 p-10 opacity-30 text-[180px] md:text-[300px] select-none group-hover:rotate-12 transition-transform duration-700 z-0">{nextBigDate.emoji}</div>
        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center max-w-2xl z-10">
          <span className="inline-flex items-center px-5 py-2 bg-white/20 text-white backdrop-blur-md text-[11px] font-black uppercase tracking-[3px] rounded-full w-max mb-6">PRÓXIMAMENTE</span>
          <h2 className="text-[44px] md:text-[72px] font-black text-white leading-none mb-4 drop-shadow-lg">{nextBigDate.name}</h2>
          <button onClick={() => navigate('/regalos')} className="px-10 py-4 rounded-full font-black text-[14px] uppercase tracking-widest shadow-xl w-max bg-white text-gray-900 hover:bg-pink-50 transition-all">Ver Colección Especial</button>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {fullCalendar.map((o) => (
          <div key={o.name} onClick={() => navigate('/regalos')} className="group bg-white dark:bg-[#1a1a2e] rounded-[40px] p-8 cursor-pointer border border-pink-light/30 dark:border-white/5 shadow-sm hover:shadow-card-md transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-[100px] opacity-[0.03] group-hover:scale-125 transition-transform duration-500 pointer-events-none">{o.emoji}</div>
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[32px] shadow-inner" style={{ background: o.bg, color: 'white' }}>{o.emoji}</div>
              <span className="bg-pink-50 dark:bg-white/5 text-primary text-[11px] font-black px-3 py-1.5 rounded-full border border-pink-light/50">{o.date}</span>
            </div>
            <h4 className="text-[20px] font-black text-text-dark dark:text-white mb-2 group-hover:text-primary transition-colors">{o.name}</h4>
            <button className="flex items-center gap-2 text-[12px] font-black text-primary uppercase tracking-wider mt-4">Ver más <ArrowLeft size={14} className="rotate-180 group-hover:translate-x-2 transition-transform" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}