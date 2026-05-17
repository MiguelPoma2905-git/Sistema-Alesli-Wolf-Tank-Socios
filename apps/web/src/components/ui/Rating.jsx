import { Star, StarHalf } from 'lucide-react'

export default function Rating({ value = 5, showCount = false, count = 0 }) {
  const fullStars = Math.floor(value)
  const hasHalf = value % 1 !== 0

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex text-warning">
        {/* Estrellas llenas */}
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={13} fill="currentColor" strokeWidth={0} />
        ))}
        
        {/* Media estrella */}
        {hasHalf && <StarHalf size={13} fill="currentColor" strokeWidth={0} />}
        
        {/* Estrellas vacías */}
        {[...Array(5 - fullStars - (hasHalf ? 1 : 0))].map((_, i) => (
          <Star key={`empty-${i}`} size={13} className="text-gray-200 dark:text-white/10" fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      
      {/* Contador de reseñas */}
      {showCount && (
        <span className="text-[11px] font-medium text-text-muted">
          ({count})
        </span>
      )}
    </div>
  )
}