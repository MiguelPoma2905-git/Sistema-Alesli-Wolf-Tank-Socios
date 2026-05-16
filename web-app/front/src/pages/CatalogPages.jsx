import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, ArrowLeft, Star, Info, CheckCircle, AlertCircle, Zap, Check, Loader2, LogIn, X, Search } from 'lucide-react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/shared/ProductCard'
import FilterBar from '../components/ui/Filter'
import Rating from '../components/ui/Rating'
import { formatPrice } from '../utils/helpers'
import { OCCASIONS } from '../utils/constants'
import { getProducts, getCategories } from '../services/productos'

function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts()
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  return { products, loading }
}

function useCategorias() {
  const [cats, setCats] = useState([])
  useEffect(() => {
    getCategories()
      .then(data => setCats(Array.isArray(data) ? data : []))
      .catch(() => setCats([]))
  }, [])
  return cats
}

function mapProduct(p) {
  return {
    id: p.id_producto,
    name: p.nombre,
    price: parseFloat(p.precio_venta),
    img: p.imagen_url || '/images/placeholder_product.jpg',
    cat: p.categoria_nombre || 'General',
    desc: p.descripcion || '',
    rating: 5.0,
    reviews: 0,
    stock: p.activo ? 10 : 0,
  }
}

function CatalogGrid({ products, filter, setFilter, cats, emptyMsg }) {
  const filtered = filter === 'Todos' || filter === 'Todas' ? products : products.filter(p => p.cat === filter)

  return (
    <div className="animate-fade-in transition-colors duration-500">
      <FilterBar tabs={cats} active={filter} onChange={setFilter} />
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Search size={40} className="mx-auto text-text-muted/30 mb-4" />
          <p className="text-[16px] font-bold text-text-dark dark:text-white mb-1">{emptyMsg || 'No hay productos en esta categoría'}</p>
          <p className="text-[13px] text-text-muted">Pronto tendremos novedades.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-8">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}

// ─── 1. Catálogo completo (unifica todas las categorías) ─────────────────────
export function Flores() {
  const [filter, setFilter] = useState('Todas')
  const { products, loading } = useProducts()
  const dbCats = useCategorias()
  const allCats = useMemo(() => ['Todas', ...dbCats.map(c => c.nombre)], [dbCats])
  const mapped = useMemo(() => products.map(mapProduct), [products])

  if (loading) return <LoadingSkeleton />

  return (
    <div className="px-6 md:px-12 py-10 max-w-[1400px] mx-auto animate-fade-in transition-colors duration-500">
      <div className="mb-8">
        <h1 className="text-[32px] md:text-[42px] font-black text-text-dark dark:text-white leading-tight transition-colors duration-500">Catálogo Alesli</h1>
        <p className="text-[14px] md:text-[16px] text-text-muted mt-2 font-medium transition-colors duration-500">Todos nuestros productos en un solo lugar — seleccioná una categoría para explorar.</p>
      </div>
      <CatalogGrid products={mapped} filter={filter} setFilter={setFilter} cats={allCats} emptyMsg="No hay productos en esta categoría" />
    </div>
  )
}

// ─── 2. DetalleProducto ────────────────────────────────────────────────────────
function ProductNotFound() {
  const navigate = useNavigate()
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 animate-fade-in">
      <div className="w-24 h-24 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-6"><AlertCircle size={40} /></div>
      <h2 className="text-[32px] font-black text-text-dark dark:text-white mb-4">Producto no encontrado</h2>
      <p className="text-text-muted dark:text-gray-400 mb-8 text-center max-w-sm">El arreglo que buscas ya no está disponible o el enlace es incorrecto.</p>
      <button onClick={() => navigate('/')} className="bg-primary text-white px-10 py-3 rounded-full font-black text-[13px] uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">Volver al Catálogo</button>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="px-6 md:px-12 py-10 max-w-[1400px] mx-auto">
      <div className="w-48 h-8 bg-cream dark:bg-white/5 animate-pulse rounded mb-4" />
      <div className="w-72 h-4 bg-cream dark:bg-white/5 animate-pulse rounded mb-8" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {[1,2,3,4,5].map(i => <div key={i} className="aspect-[3/4] bg-cream dark:bg-white/5 animate-pulse rounded-2xl" />)}
      </div>
    </div>
  )
}

export function DetalleProducto() {
  const { id } = useParams()
  const { addToCart, toggleFav, isFav, isAuth, isCliente } = useApp()
  const navigate = useNavigate()
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    setLoading(true)
    getProducts()
      .then(data => {
        const found = Array.isArray(data) ? data.find(p => p.id_producto === Number(id)) : null
        setProduct(found ? mapProduct(found) : null)
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id])

  const [actionStatus, setActionStatus] = useState('idle')

  useEffect(() => { setQty(1); setActionStatus('idle'); window.scrollTo({ top: 0, behavior: 'smooth' }) }, [id, product])

  if (loading) return <LoadingSkeleton />
  if (!product) return <ProductNotFound />

  const currentPrice = product.price
  const isOutOfStock = product.stock === 0

  const checkCliente = () => {
    if (!isAuth) { setShowLoginPrompt(true); return false }
    if (!isCliente) return false
    return true
  }

  const handleAddToCart = () => {
    if (isOutOfStock || actionStatus !== 'idle') return
    if (!checkCliente()) return
    setActionStatus('cart')
    addToCart({ ...product, price: currentPrice, qty })
    setTimeout(() => navigate(-1), 800)
  }

  const handleBuyNow = () => {
    if (isOutOfStock || actionStatus !== 'idle') return
    if (!checkCliente()) return
    setActionStatus('buy')
    addToCart({ ...product, price: currentPrice, qty })
    setTimeout(() => navigate('/checkout'), 500)
  }

  return (
    <div className="px-4 md:px-12 py-10 max-w-[1400px] mx-auto animate-fade-in transition-colors duration-500">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[13px] font-bold text-text-muted hover:text-primary mb-8 group transition-colors">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver al catálogo
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-20">
        <div className="space-y-4 lg:sticky lg:top-[100px] max-w-md mx-auto w-full">
          <div className={`aspect-square bg-gradient-to-br from-pink-50/50 to-pink-100/50 dark:from-white/5 dark:to-transparent rounded-3xl flex items-center justify-center shadow-inner relative overflow-hidden group transition-all duration-500 border border-gray-200/50 dark:border-white/10 ${isOutOfStock ? 'grayscale opacity-60' : 'hover:shadow-lg'}`}>
            <img src={product.img} alt={product.name} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-md" />
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                <div className="bg-red-500 text-white px-8 py-3 rounded-full font-black uppercase tracking-widest rotate-[-12deg] shadow-2xl border-2 border-white">Agotado</div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col h-full justify-center">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-black text-primary uppercase tracking-[3px] bg-pink-50 dark:bg-primary/10 px-3 py-1.5 rounded-md">{product.cat}</div>
            {isOutOfStock ? (
              <span className="text-[12px] text-red-500 font-bold bg-red-50 dark:bg-red-500/10 px-3 py-1.5 rounded-full flex items-center gap-1.5"><AlertCircle size={14} /> Agotado</span>
            ) : (
              <span className="text-[12px] text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-500/10 px-3 py-1.5 rounded-full flex items-center gap-1.5"><CheckCircle size={14} /> Disponible</span>
            )}
          </div>

          <h1 className="text-[34px] md:text-[44px] font-black text-text-dark dark:text-white leading-tight mb-4 tracking-tight">{product.name}</h1>
          <p className="text-[14px] text-text-muted dark:text-gray-400 leading-relaxed mb-8 font-medium max-w-xl">{product.desc || 'Producto de primera calidad preparado por nuestros floristas expertos.'}</p>

          <div className="text-[40px] font-black text-text-dark dark:text-white mb-8 leading-none tracking-tight">{formatPrice(currentPrice)}</div>

          <div className="flex flex-col gap-4 mb-10">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-5 h-14 rounded-full px-2 border shadow-inner transition-colors ${isOutOfStock || actionStatus !== 'idle' ? 'opacity-50 pointer-events-none bg-gray-100 dark:bg-white/5' : 'bg-bg-light dark:bg-white/5 border-gray-200/50 dark:border-white/10'}`}>
                <button disabled={qty <= 1} onClick={() => setQty(q => q - 1)} className="w-10 h-10 rounded-full flex items-center justify-center text-[20px] font-bold text-text-dark dark:text-white hover:bg-white dark:hover:bg-white/10 transition-all">-</button>
                <span className="font-black text-[15px] w-6 text-center text-text-dark dark:text-white">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 rounded-full flex items-center justify-center text-[20px] font-bold text-text-dark dark:text-white hover:bg-white dark:hover:bg-white/10 transition-all">+</button>
              </div>

              <button disabled={isOutOfStock || actionStatus !== 'idle'} onClick={handleAddToCart}
                className={`flex-1 border-2 font-black text-[13px] uppercase tracking-widest h-14 rounded-full flex items-center justify-center gap-2 transition-all duration-300 ${
                  isOutOfStock ? 'bg-gray-100 border-gray-200 text-gray-400' : 
                  actionStatus === 'cart' ? 'bg-green-500 border-green-500 text-white scale-[1.02] shadow-lg' : 
                  'bg-white dark:bg-white/5 border-gray-300 dark:border-white/20 text-text-dark dark:text-white hover:border-primary hover:text-primary active:scale-95'
                }`}>
                {isOutOfStock ? 'Agotado' : actionStatus === 'cart' ? <><Check size={18} /> ¡Agregado!</> : <><ShoppingCart size={18} /> Al Carrito</>}
              </button>

              <button onClick={() => toggleFav(product.id)} className="w-14 h-14 rounded-full border-2 border-gray-200 dark:border-white/10 flex items-center justify-center text-[24px] hover:border-primary hover:bg-pink-50 dark:hover:bg-primary/10 transition-all group shrink-0">
                <Heart size={22} className={`transition-all duration-300 ${isFav(product.id) ? 'fill-primary text-primary scale-110' : 'text-text-muted group-hover:text-primary'}`} />
              </button>
            </div>

            <button disabled={isOutOfStock || actionStatus !== 'idle'} onClick={handleBuyNow}
              className={`w-full font-black text-[15px] uppercase tracking-[2px] h-14 rounded-full flex items-center justify-center gap-2 shadow-xl transition-all duration-300 ${
                isOutOfStock ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' : 
                actionStatus === 'buy' ? 'bg-secondary text-white scale-[0.98]' :
                'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-primary/40 hover:-translate-y-1'
              }`}>
              {actionStatus === 'buy' ? <><Loader2 size={20} className="animate-spin" /> Procesando...</> : <><Zap size={20} /> Comprar Ahora</>}
            </button>
          </div>
        </div>
      </div>

      {showLoginPrompt && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" onClick={() => setShowLoginPrompt(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="bg-white dark:bg-[#151522] w-full max-w-sm shadow-xl border border-gray-200/50 dark:border-white/10 relative z-10 p-8" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowLoginPrompt(false)} className="absolute top-4 right-4 text-text-muted hover:text-text-dark dark:hover:text-white transition-colors"><X size={18} /></button>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary/10 flex items-center justify-center mx-auto mb-5"><LogIn size={24} className="text-primary" /></div>
              <h3 className="text-[20px] font-heading font-bold text-text-dark dark:text-white mb-2">Inicia sesión</h3>
              <p className="text-[13px] text-text-muted mb-6 leading-relaxed">Necesitás estar registrado como cliente para comprar. Ingresá o creá tu cuenta.</p>
              <button onClick={() => { setShowLoginPrompt(false); navigate('/login') }} className="w-full py-3 bg-primary text-white text-[12px] font-bold uppercase tracking-wider hover:bg-accent transition-all">Iniciar sesión</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── 3. Regalos ────────────────────────────────────────────────────────────────
export function Regalos() {
  const [filter, setFilter] = useState('Todos')
  const { products, loading } = useProducts()
  const dbCats = useCategorias()
  const giftNames = ['Cajas regalo', 'Combos flores', 'Desayunos', 'Ramos + regalo']
  const cats = useMemo(() => ['Todos', ...dbCats.filter(c => giftNames.includes(c.nombre)).map(c => c.nombre)], [dbCats])
  const mapped = useMemo(() => products.filter(p => giftNames.includes(p.categoria_nombre)).map(mapProduct), [products])

  if (loading) return <LoadingSkeleton />

  return (
    <div className="px-6 md:px-12 py-10 max-w-[1400px] mx-auto animate-fade-in">
      <h1 className="text-[32px] md:text-[42px] font-black text-text-dark dark:text-white mb-8 transition-colors">Regalos Especiales</h1>
      <CatalogGrid products={mapped} filter={filter} setFilter={setFilter} cats={cats} emptyMsg="No hay regalos en esta categoría" />
    </div>
  )
}

// ─── 4. Peluches ───────────────────────────────────────────────────────────────
export function Peluches() {
  const [filter, setFilter] = useState('Todos')
  const { products, loading } = useProducts()
  const mapped = useMemo(() => products.filter(p => p.categoria_nombre === 'Peluches').map(mapProduct), [products])

  if (loading) return <LoadingSkeleton />

  return (
    <div className="px-6 md:px-12 py-10 max-w-[1400px] mx-auto animate-fade-in">
      <h1 className="text-[32px] md:text-[42px] font-black text-text-dark dark:text-white mb-8 transition-colors">Peluches Adorables</h1>
      <CatalogGrid products={mapped} filter={filter} setFilter={setFilter} cats={['Todos']} emptyMsg="No hay peluches en esta categoría" />
    </div>
  )
}

// ─── 5. Chocolate ──────────────────────────────────────────────────────────────
export function Chocolate() {
  const [filter, setFilter] = useState('Todos')
  const { products, loading } = useProducts()
  const mapped = useMemo(() => products.filter(p => p.categoria_nombre === 'Chocolates').map(mapProduct), [products])

  if (loading) return <LoadingSkeleton />

  return (
    <div className="px-6 md:px-12 py-10 max-w-[1400px] mx-auto animate-fade-in">
      <h1 className="text-[32px] md:text-[42px] font-black text-text-dark dark:text-white mb-8 transition-colors">Chocolates Premium</h1>
      <CatalogGrid products={mapped} filter={filter} setFilter={setFilter} cats={['Todos']} emptyMsg="No hay chocolates en esta categoría" />
    </div>
  )
}

// ─── 6. Ocasiones ──────────────────────────────────────────────────────────────
export function Ocasiones() {
  const navigate = useNavigate()
  const currentMonth = new Date().getMonth() + 1

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
  ]

  const fullCalendar = calendarData.map(item => {
    const base = OCCASIONS.find(o => o.name === item.name) || {}
    return { ...base, ...item }
  })

  const nextBigDate = fullCalendar.find(o => o.month >= currentMonth) || fullCalendar[0]

  return (
    <div className="px-6 md:px-12 py-10 max-w-[1400px] mx-auto animate-fade-in space-y-16 transition-colors duration-500">
      <section className="text-center max-w-2xl mx-auto">
        <h1 className="text-[36px] md:text-[52px] font-black text-text-dark dark:text-white transition-colors">Momentos Alesli</h1>
        <p className="text-[15px] md:text-[17px] text-text-muted mt-4 font-medium transition-colors">Organizamos el año floral para que siempre estés un paso adelante.</p>
      </section>

      <section className="w-full min-h-[300px] md:h-[400px] rounded-3xl overflow-hidden relative shadow-lg group" style={{ background: nextBigDate.bg }}>
        <div className="absolute inset-0 bg-black/20 dark:bg-black/50 transition-colors z-0"></div>
        <img src={nextBigDate.image} alt={nextBigDate.name} className="absolute top-0 right-0 h-full w-auto opacity-30 object-contain select-none group-hover:rotate-12 transition-transform duration-700 z-0" />
        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center max-w-2xl z-10">
          <span className="inline-flex items-center px-5 py-2 bg-white/20 text-white backdrop-blur-md text-[11px] font-black uppercase tracking-[3px] rounded-full w-max mb-6">PRÓXIMAMENTE</span>
          <h2 className="text-[44px] md:text-[72px] font-black text-white leading-none mb-4 drop-shadow-lg">{nextBigDate.name}</h2>
          <button onClick={() => navigate('/flores')} className="px-10 py-4 rounded-full font-black text-[14px] uppercase tracking-widest shadow-xl w-max bg-white text-gray-900 hover:bg-pink-50 transition-all">Ver Colección Especial</button>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {fullCalendar.map((o) => (
          <div key={o.name} onClick={() => navigate('/flores')} className="group bg-white dark:bg-[#1a1a2e] rounded-3xl p-8 cursor-pointer border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-[100px] h-[100px] opacity-[0.03] group-hover:scale-125 transition-transform duration-500 pointer-events-none">
              <img src={o.image} alt={o.name} className="w-full h-full object-contain" />
            </div>
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner" style={{ background: o.bg, color: 'white' }}>
                <img src={o.image} alt={o.name} className="w-full h-full object-contain" />
              </div>
              <span className="bg-pink-50 dark:bg-white/5 text-primary text-[11px] font-black px-3 py-1.5 rounded-full border border-pink-light/50">{o.date}</span>
            </div>
            <h4 className="text-[20px] font-black text-text-dark dark:text-white mb-2 group-hover:text-primary transition-colors">{o.name}</h4>
            <button className="flex items-center gap-2 text-[12px] font-black text-primary uppercase tracking-wider mt-4">Ver más <ArrowLeft size={14} className="rotate-180 group-hover:translate-x-2 transition-transform" /></button>
          </div>
        ))}
      </div>
    </div>
  )
}
