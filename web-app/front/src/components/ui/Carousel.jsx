import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { HERO_SLIDES } from '../../utils/constants'
import { useNavigate } from 'react-router-dom'

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  const total = HERO_SLIDES.length
  const slide = HERO_SLIDES[current]

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % total), 5000)
    return () => clearInterval(t)
  }, [total])

  const prev = () => setCurrent(c => (c - 1 + total) % total)
  const next = () => setCurrent(c => (c + 1) % total)

  return (
    <div 
      className="relative rounded-3xl overflow-hidden min-h-[320px] flex items-center px-8 md:px-14 py-10 shadow-lg transition-all duration-700 ease-in-out group"
      style={{ background: slide.bg }}
    >
      {/* Etiqueta superior */}
      <div className="absolute top-5 left-8 bg-white/20 backdrop-blur-md text-white text-[12px] font-bold px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-white/10">
        <span>🌺</span> {slide.tag}
      </div>

      {/* Contador */}
      <div className="absolute top-5 right-8 bg-black/20 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full border border-white/10">
        {current + 1} / {total}
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 max-w-lg mt-4 animate-fade-in">
        <h1 className="text-[32px] md:text-[44px] font-black text-white leading-[1.1] mb-4 drop-shadow-md">
          {slide.title[0]} <br />
          <span className="text-white/90 italic font-extrabold">{slide.title[1]}</span>
        </h1>
        <p className="text-[14px] md:text-[15px] text-white/80 mb-8 leading-relaxed font-medium max-w-md">
          {slide.sub}
        </p>
        <button
          onClick={() => navigate('/flores')}
          className="bg-white text-gray-900 px-6 py-3 rounded-full text-[14px] font-bold shadow-lg hover:scale-105 hover:bg-pink-50 transition-all duration-300"
        >
          Ver colecciones ✨
        </button>

        {/* Indicadores (Dots) */}
        <div className="flex gap-2 mt-8">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-500 ${i === current ? 'w-8 bg-white shadow-md' : 'w-2 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      {/* Decoración (Emoji gigante) */}
      <div className="absolute right-[-20px] md:right-12 top-1/2 -translate-y-1/2 text-[140px] md:text-[180px] opacity-20 md:opacity-40 select-none pointer-events-none drop-shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
        {slide.emoji}
      </div>

      {/* Controles de navegación */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}