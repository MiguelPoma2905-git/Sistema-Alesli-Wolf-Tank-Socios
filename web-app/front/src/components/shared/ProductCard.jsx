<<<<<<< HEAD
import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { useApp } from '../../context/AppContext'
=======
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, LogIn, X, ShieldAlert } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useToast } from '../../context/ToastContext'
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
import Rating from '../ui/Rating'
import { formatPrice } from '../../utils/helpers'

export default function ProductCard({ product }) {
<<<<<<< HEAD
  const { addToCart, toggleFav, isFav } = useApp()
  const navigate = useNavigate()
=======
  const { addToCart, toggleFav, isFav, isAuth, isCliente, isAdmin, isEncargado } = useApp()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [showRoleWarning, setShowRoleWarning] = useState(false)
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
  
  if (!product) return null;

  const isFavorite = isFav(product.id)
  const category = product.cat || product.size || 'Premium'
  const rating = product.rating || 5.0
  const reviewsCount = product.reviews?.length || product.reviews || 0
  const hasStock = product.stock !== false 

<<<<<<< HEAD
  // EL MOTOR DE TAMAÑOS INTACTO
  let emojiSize = 'text-[90px]'; 
  if (product.size === 'Pequeño') emojiSize = 'text-[55px]';
  if (product.size === 'Mediano') emojiSize = 'text-[85px]';
  if (product.size === 'Grande')  emojiSize = 'text-[115px]';
  if (product.size === 'Gigante') emojiSize = 'text-[150px]';

  return (
    // h-full asegura que todas las tarjetas en la misma fila del Grid midan exactamente lo mismo
    <div className="group bg-white dark:bg-[#1a1a2e] rounded-[32px] p-4 shadow-sm hover:shadow-card-lg transition-all duration-300 border border-pink-light/30 dark:border-white/5 flex flex-col h-full w-full relative">
      
      <button 
        onClick={(e) => { e.stopPropagation(); toggleFav(product.id); }}
        className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full bg-white/80 dark:bg-black/20 backdrop-blur-sm flex items-center justify-center text-text-muted hover:text-primary transition-colors"
      >
        <Heart size={18} className={isFavorite ? "fill-primary text-primary" : ""} />
      </button>

      {/* LA CAJA INAMOVIBLE: aspect-square + overflow-hidden neutraliza a los osos gigantes */}
      <div 
        onClick={() => navigate(`/flores/${product.id}`)}
        className="w-full aspect-square shrink-0 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-white/5 dark:to-transparent rounded-[24px] flex items-center justify-center cursor-pointer relative overflow-hidden"
      >
        <span className={`${emojiSize} transition-transform duration-500 drop-shadow-md leading-none group-hover:scale-110 flex items-center justify-center`}>
          {product.img || '🎁'}
        </span>
=======
  return (
    <div className="group bg-white dark:bg-[#1a1a2e] rounded-2xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1.5 transition-all duration-500 ease-out border border-gray-200/40 dark:border-white/8 hover:border-primary/20 flex flex-col h-full w-full relative">
      
      <button 
        onClick={(e) => { e.stopPropagation(); toggleFav(product.id); }}
        className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full bg-white/80 dark:bg-black/20 backdrop-blur-sm flex items-center justify-center text-text-muted hover:text-primary hover:scale-110 transition-all duration-300"
      >
        <Heart size={18} className={`transition-all duration-300 ${isFavorite ? "fill-primary text-primary scale-110" : ""}`} />
      </button>

      <div 
        onClick={() => navigate(`/flores/${product.id}`)}
        className="w-full aspect-square shrink-0 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-white/5 dark:to-transparent rounded-xl flex items-center justify-center cursor-pointer relative overflow-hidden group/img"
      >
        <img src={product.img || '/images/placeholder_product.jpg'} alt={product.name} className="w-full h-full object-contain transition-all duration-700 drop-shadow-md group-hover:scale-110 group-hover:rotate-[1deg]" />
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
        
        {!hasStock && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white text-text-dark px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest">Agotado</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col flex-1">
        
        {/* Categoría (Alto fijo: 20px) */}
        <div className="flex items-center justify-between h-[20px] mb-2 shrink-0">
          <span className="text-[10px] font-black text-primary uppercase tracking-wider truncate pr-2">{category}</span>
          <Rating value={rating} />
        </div>
        
        {/* Título (Alto fijo: 40px garantiza el espacio de 2 líneas) */}
        <h3 
          onClick={() => navigate(`/flores/${product.id}`)}
          className="text-[14px] font-black text-text-dark dark:text-white leading-tight cursor-pointer hover:text-primary transition-colors h-[40px] line-clamp-2 overflow-hidden shrink-0"
        >
          {product.name}
        </h3>
        
        {/* Reseñas (Alto fijo: 16px) */}
        <span className="text-[11px] text-text-muted font-medium block h-[16px] shrink-0 mt-1">
          {reviewsCount} reseñas
        </span>

        {/* Muelle expansor: Empuja el footer al fondo idénticamente en todas las tarjetas */}
        <div className="flex-1"></div>
        
        {/* ZONA DE COMPRA: Alto fijo: 50px */}
<<<<<<< HEAD
        <div className="flex items-end justify-between border-t border-pink-light/30 dark:border-white/5 pt-2 h-[50px] shrink-0 mt-3">
=======
        <div className="flex items-end justify-between border-t border-gray-200/30 dark:border-white/8 pt-2 h-[50px] shrink-0 mt-3">
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
          <div className="flex flex-col justify-end h-full">
            {/* Espacio fijo para Precio Antiguo: Evita saltos si no existe */}
            <div className="h-[14px]">
              {product.oldPrice && (
                <span className="text-[11px] text-text-muted line-through decoration-red-500/50 leading-none block">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
            <span className="text-[18px] font-black text-text-dark dark:text-white leading-none mt-1 block">
              {formatPrice(product.price)}
            </span>
          </div>
          
          <button 
            disabled={!hasStock}
<<<<<<< HEAD
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
=======
            onClick={(e) => {
              e.stopPropagation()
              if (!isAuth) { setShowLoginPrompt(true); return }
              if (!isCliente) { setShowRoleWarning(true); return }
              addToCart(product)
            }}
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${hasStock ? 'bg-bg-light dark:bg-white/5 text-text-dark dark:text-white hover:bg-primary hover:text-white shadow-sm' : 'bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed'}`}
          >
            <ShoppingCart size={16} />
          </button>
        </div>

<<<<<<< HEAD
=======
      {showLoginPrompt && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" onClick={() => setShowLoginPrompt(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="bg-white dark:bg-[#151522] w-full max-w-sm shadow-xl border border-border-light/30 dark:border-white/10 relative z-10 p-8" onClick={e => e.stopPropagation()}>
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

>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
      </div>
    </div>
  )
}