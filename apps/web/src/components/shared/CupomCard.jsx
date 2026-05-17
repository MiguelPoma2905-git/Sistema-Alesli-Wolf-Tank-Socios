import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CupomCard({ coupon }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(coupon.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const expired = coupon.status === 'Expirado'

  return (
    <div
      className={`flex border border-border-light/30 dark:border-white/10 shadow-sm bg-white dark:bg-[#151522] transition-all ${expired ? 'opacity-60' : 'hover:shadow-card-md'}`}
    >
      {/* Color strip */}
      <div
        className="w-16 flex items-center justify-center text-white font-black text-[13px] flex-shrink-0"
        style={{ background: coupon.bg }}
      >
        %
      </div>

      {/* Body */}
      <div className="flex-1 p-3.5">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-extrabold text-[18px] text-text-dark dark:text-white">{coupon.discount}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 ${expired ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-700'}`}>
            {coupon.status}
          </span>
        </div>
        <p className="text-[12px] text-text-muted mb-1">{coupon.desc}</p>
        <p className="text-[10px] text-text-muted">{coupon.min} · Vence: {coupon.vence}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-[11px] font-bold text-primary font-mono tracking-widest">{coupon.code}</span>
          {!expired && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] text-text-muted hover:text-primary transition-colors"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}