import { useState } from 'react'
import { ThumbsUp } from 'lucide-react'
import Rating from '../ui/Rating'

export default function ReviewCard({ review }) {
  const [useful, setUseful] = useState(review.useful)
  const [liked, setLiked]   = useState(false)

  const handleUseful = () => {
    if (!liked) { setUseful(u => u + 1); setLiked(true) }
    else        { setUseful(u => u - 1); setLiked(false) }
  }

  return (
    <div className="bg-white dark:bg-[#151522] border border-border-light/30 dark:border-white/10 shadow-sm p-4 mb-3">
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className="w-10 h-10 flex items-center justify-center text-white font-bold text-[14px] flex-shrink-0"
          style={{ background: review.color }}
        >
          {review.initial}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[14px] text-text-dark dark:text-white">{review.name}</span>
            <span className="text-[12px] text-text-muted">{review.date}</span>
          </div>
          <div className="text-[12px] text-primary font-semibold">Producto: {review.product}</div>
        </div>
        <Rating value={review.rating} />
      </div>

      <p className="text-[13px] text-text-dark dark:text-white leading-relaxed mb-3">{review.text}</p>

      <button
        onClick={handleUseful}
        className={`flex items-center gap-1.5 text-[11px] transition-colors ${liked ? 'text-primary' : 'text-text-muted hover:text-primary'}`}
      >
        <ThumbsUp size={12} fill={liked ? '#d0439d' : 'none'} />
        Útil ({useful})
      </button>
    </div>
  )
}