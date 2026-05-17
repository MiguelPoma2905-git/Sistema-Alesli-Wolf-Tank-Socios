import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Calendar, Plus, Trash2, Edit2, User, MapPin, Gift, 
  BellRing, Heart, X, Check, BellOff, Sparkles 
} from 'lucide-react'

export default function SpecialDates() {
  const navigate = useNavigate()
  
  // ESTADOS DE DATOS
  const [dates, setDates] = useState([
    { id: 1, title: 'Aniversario de Bodas', date: '2026-10-12', type: 'Aniversario', reminder: true },
    { id: 2, title: 'Cumpleaños Mamá', date: '2026-05-05', type: 'Cumpleaños', reminder: true }
  ])

  // ESTADOS DE UI
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDate, setEditingDate] = useState(null)
  const [formData, setFormData] = useState({ title: '', date: '', type: 'Cumpleaños', reminder: true })

  useEffect(() => { window.scrollTo(0, 0) }, [])

  // ACCIONES TÁCTICAS
  const openModal = (date = null) => {
    if (date) {
      setEditingDate(date)
      setFormData({ ...date })
    } else {
      setEditingDate(null)
      setFormData({ title: '', date: '', type: 'Cumpleaños', reminder: true })
    }
    setIsModalOpen(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (editingDate) {
      setDates(dates.map(d => d.id === editingDate.id ? { ...formData, id: d.id } : d))
    } else {
      setDates([...dates, { ...formData, id: Date.now() }])
    }
    setIsModalOpen(false)
    // Aquí iría el disparo de un Toast de éxito
  }

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta fecha? Perderás los recordatorios automáticos.')) {
      setDates(dates.filter(d => d.id !== id))
    }
  }

  const toggleReminder = (id) => {
    setDates(dates.map(d => d.id === id ? { ...d, reminder: !d.reminder } : d))
  }

  // MAPEO VISUAL POR TIPO
  const getTypeStyle = (type) => {
    const styles = {
      'Aniversario': 'bg-pink-50 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400',
      'Cumpleaños': 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
      'Otro': 'bg-gray-50 text-gray-600 dark:bg-white/10 dark:text-gray-400'
    }
    return styles[type] || styles['Otro']
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 animate-fade-in transition-colors duration-500">
      
      {/* HEADER CORPORATIVO */}
      <div className="mb-10 pb-8 border-b border-gray-200 dark:border-white/10">
        <h1 className="text-[32px] font-black text-text-dark dark:text-white leading-tight">Mi Cuenta</h1>
        <p className="text-[15px] text-text-muted dark:text-gray-400 font-medium mt-1">
          Gestiona tu información y nunca olvides un momento importante.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LADO IZQUIERDO: NAVEGACIÓN */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-white/10">
            <nav className="flex flex-col gap-2">
              <NavButton icon={<User size={18} />} label="Datos Personales" onClick={() => navigate('/perfil')} />
              <NavButton icon={<MapPin size={18} />} label="Direcciones" onClick={() => navigate('/perfil')} />
              <NavButton icon={<Gift size={18} />} label="Mis Fechas Especiales" active />
            </nav>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-primary/10 dark:to-secondary/10 rounded-2xl p-6 border border-pink-light/30 dark:border-white/5">
            <Sparkles className="text-primary mb-3" size={24} />
            <h3 className="text-[14px] font-black text-text-dark dark:text-white mb-2">Recordatorios VIP</h3>
            <p className="text-[12px] text-text-muted dark:text-gray-400 font-medium leading-relaxed">
              Te avisaremos 72 horas antes de cada evento para que la magia llegue a tiempo.
            </p>
          </div>
        </div>

        {/* LADO DERECHO: CONTENIDO */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-[20px] font-black text-text-dark dark:text-white mb-1">Fechas Guardadas</h2>
                <p className="text-[13px] font-medium text-text-muted">Tu agenda personal de momentos mágicos.</p>
              </div>
              <button onClick={() => openModal()} className="bg-text-dark dark:bg-white text-white dark:text-text-dark px-5 py-2.5 rounded-xl text-[12px] font-black uppercase tracking-widest hover:-translate-y-0.5 transition-all shadow-md flex items-center gap-2">
                <Plus size={16} /> Añadir Fecha
              </button>
            </div>

            {dates.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-gray-100 dark:border-white/5 rounded-2xl">
                <Calendar size={32} className="mx-auto text-gray-300 mb-3" />
                <p className="text-[14px] font-bold text-text-muted">No tienes fechas guardadas aún.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dates.map(date => (
                  <div key={date.id} className="border border-gray-100 dark:border-white/5 rounded-2xl p-5 hover:border-primary/50 transition-all group relative">
                    <div className="flex items-start justify-between mb-4">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${getTypeStyle(date.type)}`}>
{date.type}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openModal(date)} className="p-2 text-gray-400 hover:text-primary"><Edit2 size={14}/></button>
                        <button onClick={() => handleDelete(date.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={14}/></button>
                      </div>
                    </div>

                    <h3 className="text-[16px] font-black text-text-dark dark:text-white mb-4 leading-tight">{date.title}</h3>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 dark:border-white/5">
                      <div className="flex items-center gap-2 text-[14px] font-bold text-text-dark dark:text-white">
                        <Calendar size={16} className="text-primary" /> {new Date(date.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                      </div>
                      <button 
                        onClick={() => toggleReminder(date.id)}
                        className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-2 py-1 rounded-lg transition-colors ${date.reminder ? 'text-green-500 bg-green-50 dark:bg-green-500/10' : 'text-gray-400 bg-gray-50 dark:bg-white/5'}`}
                      >
                        {date.reminder ? <><BellRing size={12} /> On</> : <><BellOff size={12} /> Off</>}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL DE ACCIÓN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white dark:bg-[#1a1a2e] w-full max-w-md rounded-2xl p-8 relative z-10 shadow-2xl border border-gray-200 dark:border-white/10 animate-fade-in-up">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-text-dark"><X size={20}/></button>
            <h2 className="text-[24px] font-black text-text-dark dark:text-white mb-6">
              {editingDate ? 'Editar Fecha' : 'Nueva Fecha Especial'}
            </h2>
            
            <form onSubmit={handleSave} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-text-muted uppercase tracking-widest">Nombre del Evento</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej: Aniversario con mi esposa"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-5 py-3.5 text-[14px] font-bold text-text-dark dark:text-white outline-none focus:border-primary transition-all" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-text-muted uppercase tracking-widest">Fecha</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-[14px] font-bold text-text-dark dark:text-white outline-none focus:border-primary transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-text-muted uppercase tracking-widest">Tipo</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-[14px] font-bold text-text-dark dark:text-white outline-none focus:border-primary transition-all cursor-pointer"
                  >
                    <option value="Cumpleaños">Cumpleaños</option>
                    <option value="Aniversario">Aniversario</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-xl cursor-pointer group">
                <div className="flex items-center gap-3">
                  <BellRing size={18} className={formData.reminder ? "text-primary" : "text-gray-400"} />
                  <span className="text-[13px] font-bold text-text-dark dark:text-white">Activar recordatorio</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={formData.reminder}
                  onChange={(e) => setFormData({...formData, reminder: e.target.checked})}
                  className="w-5 h-5 accent-primary cursor-pointer"
                />
              </label>

              <button type="submit" className="w-full bg-text-dark dark:bg-white text-white dark:text-text-dark py-4 rounded-xl font-black text-[13px] uppercase tracking-widest shadow-md flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-transform mt-8">
                <Check size={18} /> {editingDate ? 'Guardar Cambios' : 'Crear Momento'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function NavButton({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all ${active ? 'bg-pink-50 dark:bg-primary/10 text-primary' : 'text-text-muted dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-text-dark dark:hover:text-white'}`}
    >
      {icon} {label}
    </button>
  )
}