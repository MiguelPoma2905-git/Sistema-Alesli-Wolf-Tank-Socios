import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User, MapPin, Gift, LogOut, Edit2, Plus, ArrowRight, Star,
  Trash2, ShieldCheck, Camera, ShoppingBag, Heart, X, Check
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/helpers'

export default function Profile() {
  const navigate = useNavigate()
  const { user: contextUser, isAuth } = useApp()

  const [activeModal, setActiveModal] = useState(null)

  const [user, setUser] = useState({
    name: contextUser?.nombre || 'Usuario',
    email: contextUser?.email || 'usuario@alesli.bo',
    phone: contextUser?.telefono || '77712345',
    points: 0,
    avatar: null,
    ordersCount: 0,
    favoriteCat: 'General'
  })

  const [addresses, setAddresses] = useState([
    { id: 1, tag: 'Casa', address: 'Av. Ballivián, Calle 15, Edificio Girasoles, Depto 4B, Calacoto', isDefault: true },
    { id: 2, tag: 'Oficina', address: 'Torre Ketal, Piso 8, Oficina 802, Obrajes', isDefault: false }
  ])

  const pointHistory = [
    { id: 1, desc: 'Pedido AL-84721', date: '13 May', pts: 80, type: 'gain' },
    { id: 2, desc: 'Canje Envío Gratis', date: '02 Abr', pts: -100, type: 'loss' },
    { id: 3, desc: 'Bono Bienvenida', date: '01 Ene', pts: 50, type: 'gain' }
  ]

  useEffect(() => {
    window.scrollTo(0, 0)
    if (contextUser) {
      setUser(prev => ({
        ...prev,
        name: contextUser.nombre || prev.name,
        email: contextUser.email || prev.email,
        phone: contextUser.telefono || prev.phone,
      }))
    }
  }, [contextUser])

  useEffect(() => {
    if (!isAuth) navigate('/login')
  }, [isAuth, navigate])

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 animate-fade-in transition-colors duration-500">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-8 flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-[#1a1a2e] p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
          <div className="relative group">
            <div className="w-28 h-28 bg-gradient-to-tr from-primary to-secondary rounded-2xl flex items-center justify-center text-[40px] font-black text-white shadow-lg overflow-hidden">
              {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user.name.charAt(0)}
            </div>
            <button className="absolute -bottom-2 -right-2 bg-white dark:bg-text-dark p-2 rounded-xl border border-gray-200 dark:border-white/10 shadow-md hover:text-primary transition-colors">
              <Camera size={16} />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-[32px] font-black text-text-dark dark:text-white leading-tight mb-1">{user.name}</h1>
            <p className="text-[14px] text-text-muted font-medium mb-6">{user.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="px-4 py-2 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-0.5">Pedidos</p>
                <p className="text-[16px] font-black text-text-dark dark:text-white">{user.ordersCount}</p>
              </div>
              <div className="px-4 py-2 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-0.5">Favorito</p>
                <p className="text-[16px] font-black text-text-dark dark:text-white">{user.favoriteCat}</p>
              </div>
            </div>
          </div>

          <button onClick={() => setActiveModal('profile')} className="p-3 text-gray-400 hover:text-primary border border-gray-100 dark:border-white/10 rounded-xl hover:bg-pink-50 transition-all">
            <Edit2 size={20} />
          </button>
        </div>

        <div className="lg:col-span-4 bg-text-dark dark:bg-[#151522] rounded-2xl p-8 text-white relative overflow-hidden group border border-transparent dark:border-white/5">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-black uppercase tracking-[3px] text-primary flex items-center gap-2"><Star size={14} className="fill-primary" /> Alesli Gold</span>
              <button onClick={() => navigate('/recompensas')} className="text-[11px] font-bold text-gray-400 hover:text-white">Ver catálogo</button>
            </div>
            <p className="text-[48px] font-black leading-none mb-1">{user.points}</p>
            <p className="text-[12px] font-medium text-gray-400 mb-6">Puntos de fidelidad</p>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">

          <div className="bg-white dark:bg-[#1a1a2e] p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[20px] font-black text-text-dark dark:text-white">Direcciones Guardadas</h3>
              <button onClick={() => setActiveModal('address')} className="flex items-center gap-2 text-[12px] font-black text-primary uppercase tracking-widest hover:text-secondary transition-colors">
                <Plus size={16} /> Nueva Dirección
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map(addr => (
                <div key={addr.id} className="p-5 border border-gray-100 dark:border-white/5 rounded-2xl hover:border-primary/50 transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-black text-text-dark dark:text-white">{addr.tag}</span>
                      {addr.isDefault && <span className="text-[9px] font-black bg-pink-50 text-primary px-2 py-0.5 rounded uppercase">Default</span>}
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-gray-400 hover:text-primary"><Edit2 size={14} /></button>
                      <button className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </div>
                  <p className="text-[13px] text-text-muted leading-relaxed mb-4">{addr.address}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#1a1a2e] p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-xl flex items-center justify-center text-gray-400">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-[16px] font-black text-text-dark dark:text-white">Seguridad de la cuenta</h3>
                <p className="text-[13px] text-text-muted">Protege tu acceso con una clave fuerte.</p>
              </div>
            </div>
            <button onClick={() => setActiveModal('password')} className="px-6 py-2.5 border border-gray-200 dark:border-white/10 rounded-xl text-[12px] font-black uppercase tracking-widest hover:border-primary transition-colors">
              Cambiar Clave
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">

          <div className="bg-white dark:bg-[#1a1a2e] p-8 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
            <h3 className="text-[14px] font-black text-text-muted uppercase tracking-widest mb-6 flex items-center gap-2">
              <Star size={16} /> Historial de Puntos
            </h3>
            <div className="flex flex-col gap-4">
              {pointHistory.map(h => (
                <div key={h.id} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-white/5 last:border-0">
                  <div>
                    <p className="text-[13px] font-bold text-text-dark dark:text-white">{h.desc}</p>
                    <p className="text-[11px] text-text-muted">{h.date}</p>
                  </div>
                  <span className={`text-[13px] font-black ${h.type === 'gain' ? 'text-green-500' : 'text-text-dark dark:text-white'}`}>
                    {h.type === 'gain' ? '+' : ''}{h.pts}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <QuickLink icon={<Gift />} label="Mis Fechas Especiales" onClick={() => navigate('/fechas')} />
            <QuickLink icon={<ShoppingBag />} label="Historial de Pedidos" onClick={() => navigate('/pedidos')} />
            <QuickLink icon={<LogOut />} label="Cerrar Sesión" onClick={() => navigate('/login')} danger />
          </div>
        </div>
      </div>

      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setActiveModal(null)}></div>
          <div className="bg-white dark:bg-[#1a1a2e] w-full max-w-md rounded-2xl p-8 relative z-10 shadow-2xl border border-gray-200 dark:border-white/10 animate-fade-in-up">
            <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 text-gray-400 hover:text-text-dark"><X size={20}/></button>
            <h2 className="text-[24px] font-black mb-6 text-text-dark dark:text-white">
              {activeModal === 'profile' ? 'Editar Perfil' : activeModal === 'password' ? 'Cambiar Clave' : 'Nueva Dirección'}
            </h2>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setActiveModal(null); }}>
              {activeModal === 'profile' && (
                <>
                  <input type="text" defaultValue={user.name} placeholder="Nombre completo" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-5 py-3.5 text-[14px] font-bold outline-none focus:border-primary" />
                  <input type="tel" defaultValue={user.phone} placeholder="Teléfono" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-5 py-3.5 text-[14px] font-bold outline-none focus:border-primary" />
                </>
              )}
              {activeModal === 'password' && (
                <>
                  <input type="password" placeholder="Contraseña actual" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-5 py-3.5 text-[14px] font-bold outline-none focus:border-primary" />
                  <input type="password" placeholder="Nueva contraseña" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-5 py-3.5 text-[14px] font-bold outline-none focus:border-primary" />
                </>
              )}
              <button type="submit" className="w-full bg-text-dark dark:bg-white text-white dark:text-text-dark py-4 rounded-xl font-black text-[13px] uppercase tracking-widest shadow-md flex items-center justify-center gap-2">
                <Check size={18} /> Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function QuickLink({ icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 bg-white dark:bg-[#1a1a2e] border rounded-2xl transition-all group ${danger ? 'border-red-100 hover:bg-red-50 text-red-500' : 'border-gray-100 dark:border-white/10 hover:border-primary/50 text-text-dark dark:text-gray-300'}`}
    >
      <div className="flex items-center gap-3 font-black text-[13px] uppercase tracking-wider">
        {icon} {label}
      </div>
      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </button>
  )
}
