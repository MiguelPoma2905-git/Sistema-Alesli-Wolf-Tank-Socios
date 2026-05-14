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
      className={`flex rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(255,77,184,0.08)] bg-white transition-all ${expired ? 'opacity-60' : 'hover:shadow-[0_4px_24px_rgba(255,77,184,0.13)]'}`}
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
          <span className="font-extrabold text-[18px] text-[#1F2937]">{coupon.discount}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${expired ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-700'}`}>
            {coupon.status}
          </span>
        </div>
        <p className="text-[12px] text-[#64748B] mb-1">{coupon.desc}</p>
        <p className="text-[10px] text-[#64748B]">{coupon.min} · Vence: {coupon.vence}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-[11px] font-bold text-[#FF4DB8] font-mono tracking-widest">{coupon.code}</span>
          {!expired && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] text-[#64748B] hover:text-[#FF4DB8] transition-colors"
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