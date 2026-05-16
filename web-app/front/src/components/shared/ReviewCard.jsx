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
<<<<<<< HEAD
    <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(255,77,184,0.08)] p-4 mb-3">
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[14px] flex-shrink-0"
=======
    <div className="bg-white dark:bg-[#151522] border border-border-light/30 dark:border-white/10 shadow-sm p-4 mb-3">
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className="w-10 h-10 flex items-center justify-center text-white font-bold text-[14px] flex-shrink-0"
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
          style={{ background: review.color }}
        >
          {review.initial}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
<<<<<<< HEAD
            <span className="font-bold text-[14px] text-[#1F2937]">{review.name}</span>
            <span className="text-[12px] text-[#64748B]">{review.date}</span>
          </div>
          <div className="text-[12px] text-[#FF4DB8] font-semibold">Producto: {review.product}</div>
=======
            <span className="font-bold text-[14px] text-text-dark dark:text-white">{review.name}</span>
            <span className="text-[12px] text-text-muted">{review.date}</span>
          </div>
          <div className="text-[12px] text-primary font-semibold">Producto: {review.product}</div>
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
        </div>
        <Rating value={review.rating} />
      </div>

<<<<<<< HEAD
      <p className="text-[13px] text-[#1F2937] leading-relaxed mb-3">{review.text}</p>

      <button
        onClick={handleUseful}
        className={`flex items-center gap-1.5 text-[11px] transition-colors ${liked ? 'text-[#FF4DB8]' : 'text-[#64748B] hover:text-[#FF4DB8]'}`}
      >
        <ThumbsUp size={12} fill={liked ? '#FF4DB8' : 'none'} />
=======
      <p className="text-[13px] text-text-dark dark:text-white leading-relaxed mb-3">{review.text}</p>

      <button
        onClick={handleUseful}
        className={`flex items-center gap-1.5 text-[11px] transition-colors ${liked ? 'text-primary' : 'text-text-muted hover:text-primary'}`}
      >
        <ThumbsUp size={12} fill={liked ? '#d0439d' : 'none'} />
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
        Útil ({useful})
      </button>
    </div>
  )
}