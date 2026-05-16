import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Phone, CreditCard, Wallet, Smartphone, SendHorizontal } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const paymentMethods = [
<<<<<<< HEAD
    { name: 'Efectivo', icon: <Wallet size={16} />, color: 'bg-[#FFF0F8] text-primary dark:bg-primary/20 dark:text-[#FF4DB8]' },
    { name: 'Transf.', icon: <SendHorizontal size={16} />, color: 'bg-rose-50 text-rose-500 dark:bg-rose-500/20 dark:text-rose-400' },
    { name: 'Pagos QR', icon: <Smartphone size={16} />, color: 'bg-fuchsia-50 text-fuchsia-500 dark:bg-fuchsia-500/20 dark:text-fuchsia-400' },
    { name: 'Tarjetas', icon: <CreditCard size={16} />, color: 'bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400' },
  ]

  return (
    <footer className="w-full bg-white dark:bg-[#090910] border-t border-pink-light/50 dark:border-white/5 pt-16 pb-24 transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* AHORA SON 4 COLUMNAS EXACTAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Columna 1: Marca */}
          <div className="flex flex-col">
            <div className="text-[28px] font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">🌸 Alesli</div>
=======
    { name: 'Efectivo', icon: <Wallet size={16} />, color: 'bg-[#f9e5ed] text-primary dark:bg-primary/20 dark:text-primary' },
    { name: 'Transf.', icon: <SendHorizontal size={16} />, color: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400' },
    { name: 'Pagos QR', icon: <Smartphone size={16} />, color: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/20 dark:text-fuchsia-400' },
    { name: 'Tarjetas', icon: <CreditCard size={16} />, color: 'bg-primary/10 text-primary-dark dark:bg-primary/20 dark:text-primary' },
  ]

  return (
    <footer className="w-full bg-white dark:bg-[#090910] border-t border-border-light/30 dark:border-white/10 pt-16 pb-24 transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Columna 1: Marca */}
          <div className="flex flex-col">
            <div className="mb-4">
              <img
                src="/header_logo.jpg" alt="Aleslí"
                className="h-[70px] w-auto object-contain drop-shadow-md"
              />
            </div>
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
            <p className="text-[13px] text-text-muted font-medium leading-relaxed mb-6">
              Creamos experiencias florales únicas en La Paz. Elegancia, luz y frescura en cada detalle para tus momentos más especiales.
            </p>
            <div className="flex gap-3">
              <SocialButton href="https://www.facebook.com/AlesliNaturalmenteParaTi/" icon={<FBIcon />} />
              <SocialButton href="https://www.instagram.com/floreria_alesli?igsh=bmJ0ZnpmZDJ1bnZm" icon={<IGIcon />} />
              <SocialButton href="https://www.tiktok.com/@alesli_floreria_lp?is_from_webapp=1&sender_device=pc" icon={<TikTokIcon />} />
            </div>
          </div>

<<<<<<< HEAD
          {/* Columna 2: Enlaces Rápidos (EL RELLENO PERFECTO) */}
          <div className="flex flex-col">
            <h4 className="text-[14px] font-black text-text-dark dark:text-white mb-6 uppercase tracking-wider">Enlaces Rápidos</h4>
            <div className="space-y-3 flex flex-col">
              <button onClick={() => navigate('/flores')} className="text-left text-[13px] text-text-muted font-bold hover:text-primary transition-colors w-max">Catálogo de Flores</button>
              <button onClick={() => navigate('/regalos')} className="text-left text-[13px] text-text-muted font-bold hover:text-primary transition-colors w-max">Regalos Especiales</button>
              <button onClick={() => navigate('/personalizar')} className="text-left text-[13px] text-text-muted font-bold hover:text-primary transition-colors w-max">Personaliza tu Regalo</button>
              <button onClick={() => navigate('/pedidos')} className="text-left text-[13px] text-text-muted font-bold hover:text-primary transition-colors w-max">Rastrear mi Pedido</button>
=======
          {/* Columna 2: Enlaces Rápidos */}
          <div className="flex flex-col">
            <h4 className="text-[14px] font-heading font-bold text-text-dark dark:text-white mb-6 uppercase tracking-wider border-b border-border-light/30 dark:border-white/10 pb-2">Enlaces Rápidos</h4>
            <div className="space-y-3 flex flex-col">
              <button onClick={() => navigate('/flores')} className="text-left text-[13px] text-text-muted font-bold hover:text-primary transition-colors w-max border-b border-transparent hover:border-primary/30 pb-0.5">Catálogo de Flores</button>
              <button onClick={() => navigate('/regalos')} className="text-left text-[13px] text-text-muted font-bold hover:text-primary transition-colors w-max border-b border-transparent hover:border-primary/30 pb-0.5">Regalos Especiales</button>
              <button onClick={() => navigate('/personalizar')} className="text-left text-[13px] text-text-muted font-bold hover:text-primary transition-colors w-max border-b border-transparent hover:border-primary/30 pb-0.5">Personaliza tu Regalo</button>
              <button onClick={() => navigate('/pedidos')} className="text-left text-[13px] text-text-muted font-bold hover:text-primary transition-colors w-max border-b border-transparent hover:border-primary/30 pb-0.5">Rastrear mi Pedido</button>
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
            </div>
          </div>

          {/* Columna 3: Formas de Pago */}
          <div className="flex flex-col">
<<<<<<< HEAD
            <h4 className="text-[14px] font-black text-text-dark dark:text-white mb-6 uppercase tracking-wider">Formas de Pago</h4>
            <div className="grid grid-cols-2 gap-3 max-w-[280px]">
              {paymentMethods.map((m) => (
                <div key={m.name} className={`flex flex-col items-center justify-center py-3 px-2 rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-default ${m.color}`}>
                  <div className="mb-1.5">{m.icon}</div>
                  <span className="text-[10px] font-extrabold text-center uppercase tracking-tighter">{m.name}</span>
=======
            <h4 className="text-[14px] font-heading font-bold text-text-dark dark:text-white mb-6 uppercase tracking-wider border-b border-border-light/30 dark:border-white/10 pb-2">Formas de Pago</h4>
            <div className="grid grid-cols-2 gap-3 max-w-[280px]">
              {paymentMethods.map((m) => (
                <div key={m.name} className={`flex flex-col items-center justify-center py-3 px-2 border border-border-light/30 dark:border-white/10 hover:border-primary/40 transition-all cursor-default ${m.color}`}>
                  <div className="mb-1.5">{m.icon}</div>
                  <span className="text-[10px] font-bold text-center uppercase tracking-tighter">{m.name}</span>
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
                </div>
              ))}
            </div>
          </div>

          {/* Columna 4: Contacto */}
          <div className="flex flex-col">
<<<<<<< HEAD
            <h4 className="text-[14px] font-black text-text-dark dark:text-white mb-6 uppercase tracking-wider">Ubicación y Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[13px] text-text-muted font-bold group cursor-default">
                <div className="w-8 h-8 rounded-lg bg-pink-50 dark:bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-all flex-shrink-0"><MapPin size={16} /></div>
                <span>Campos & Av. Arce, La Paz</span>
              </div>
              <div className="flex items-start gap-3 text-[13px] text-text-muted font-bold group cursor-default">
                <div className="w-8 h-8 rounded-lg bg-pink-50 dark:bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-all flex-shrink-0"><Phone size={16} /></div>
=======
            <h4 className="text-[14px] font-heading font-bold text-text-dark dark:text-white mb-6 uppercase tracking-wider border-b border-border-light/30 dark:border-white/10 pb-2">Ubicación y Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[13px] text-text-muted font-bold group cursor-default">
                <div className="w-8 h-8 bg-cream dark:bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-all flex-shrink-0"><MapPin size={16} /></div>
                <span>Campos & Av. Arce, La Paz</span>
              </div>
              <div className="flex items-start gap-3 text-[13px] text-text-muted font-bold group cursor-default">
                <div className="w-8 h-8 bg-cream dark:bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-all flex-shrink-0"><Phone size={16} /></div>
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
                <div className="flex flex-col"><span>+591 77793200</span><span>+591 70634636</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Suscripción Inferior */}
<<<<<<< HEAD
        <div className="border-t border-pink-light/30 dark:border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[12px] text-text-muted font-bold">© 2026 Alesli Floricultura. Naturalmente para ti.</p>
          <div className="flex w-full md:w-auto max-w-md rounded-full overflow-hidden border border-pink-light/30 dark:border-white/10 shadow-inner">
            <input type="email" placeholder="Tu email para novedades" className="flex-1 px-5 py-2.5 text-[12px] bg-bg-light dark:bg-white/5 outline-none text-text-dark dark:text-white" />
            <button className="bg-primary text-white font-black text-[11px] px-6 py-2.5 uppercase tracking-widest hover:bg-secondary transition-colors">Unirme</button>
=======
        <div className="border-t border-border-light/30 dark:border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[12px] text-text-muted font-bold">© 2026 Aleslí Floricultura. Naturalmente para ti.</p>
          <div className="flex w-full md:w-auto max-w-md border border-border-light/30 dark:border-white/10">
            <input type="email" placeholder="Tu email para novedades" className="flex-1 px-5 py-2.5 text-[12px] bg-bg-light dark:bg-white/5 outline-none text-text-dark dark:text-white placeholder-text-muted" />
            <button className="bg-primary text-white font-bold text-[11px] px-6 py-2.5 uppercase tracking-widest hover:bg-accent transition-colors">Unirme</button>
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
          </div>
        </div>
      </div>
    </footer>
  )
}

const SocialButton = ({ href, icon }) => (
<<<<<<< HEAD
  <a href={href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-bg-light dark:bg-white/5 flex items-center justify-center text-primary hover:scale-110 hover:bg-primary hover:text-white transition-all shadow-sm border border-pink-light/20 dark:border-white/10">
=======
  <a href={href} target="_blank" rel="noreferrer" className="w-10 h-10 bg-cream dark:bg-white/5 flex items-center justify-center text-primary hover:scale-110 hover:bg-primary hover:text-white transition-all shadow-sm border border-border-light/30 dark:border-white/10">
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
    {icon}
  </a>
)
const FBIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
const IGIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
const TikTokIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.39-2.27 1.94-5.46 2.58-8.28 1.7-2.69-.85-4.83-2.92-5.63-5.64-.78-2.69-.13-5.7 1.63-7.81 1.83-2.2 4.8-3.32 7.6-2.95v4.06c-1.74-.26-3.64.12-4.87 1.41-1.34 1.4-1.46 3.56-.25 4.96 1.09 1.25 2.97 1.62 4.54 1.04 1.49-.55 2.52-1.95 2.69-3.54.12-5.4.04-10.8.06-16.21h1.76z" /></svg>