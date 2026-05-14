import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Rating from '../ui/Rating'
import { formatPrice } from '../../utils/helpers'

export default function ProductCard({ product }) {
  const { addToCart, toggleFav, isFav } = useApp()
  const navigate = useNavigate()
  
  if (!product) return null;

  const isFavorite = isFav(product.id)
  const category = product.cat || product.size || 'Premium'
  const rating = product.rating || 5.0
  const reviewsCount = product.reviews?.length || product.reviews || 0
  const hasStock = product.stock !== false 

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
        <div className="flex items-end justify-between border-t border-pink-light/30 dark:border-white/5 pt-2 h-[50px] shrink-0 mt-3">
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
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 ${hasStock ? 'bg-bg-light dark:bg-white/5 text-text-dark dark:text-white hover:bg-primary hover:text-white shadow-sm' : 'bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed'}`}
          >
            <ShoppingCart size={16} />
          </button>
        </div>

      </div>
    </div>
  )
}