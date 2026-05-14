import { NavLink } from 'react-router-dom'
import { SIDEBAR_ITEMS } from '../../utils/constants'
import * as Icons from 'lucide-react'

// Grupos actualizados según tus requerimientos
const MENU_GROUPS = [
  { title: 'Catálogo', items: ['inicio', 'flores', 'regalos', 'peluches', 'chocolates'] },
  { title: 'Experiencias', items: ['ocasiones', 'personalizar'] }, // Cursos eliminado
  { title: 'Mi Cuenta', items: ['pedidos', 'beneficios', 'favoritos'] }, // Beneficios engloba cupones/recompensas
  { title: 'Soporte', items: ['contacto'] }
]

export default function Sidebar({ isOpen }) {
  return (
    <aside className={`
      sticky top-0 z-[100] h-screen bg-white dark:bg-[#131320] border-r border-pink-light dark:border-white/5 
      flex flex-col shadow-xl transition-all duration-300 ease-in-out flex-shrink-0
      ${isOpen ? 'w-[240px]' : 'w-[0px] md:w-[80px]'} 
      overflow-hidden
    `}>
      
      {/* Navegación Interna */}
      <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden space-y-6 scrollbar-hide">
        {MENU_GROUPS.map((group, idx) => (
          <div key={idx} className="flex flex-col items-center w-full">
            {isOpen && (
              <h3 className="w-full px-6 mb-2 text-[10px] font-black uppercase tracking-[2px] text-text-muted/70 animate-fade-in">
                {group.title}
              </h3>
            )}
            
            <div className={`space-y-1 ${isOpen ? 'w-full px-4' : 'w-full px-3 flex flex-col items-center'}`}>
              {SIDEBAR_ITEMS.filter(i => group.items.includes(i.id)).map(item => {
                const Icon = Icons[item.icon] || Icons.Home
                return (
                  <NavLink
                    key={item.id}
                    to={item.route}
                    title={!isOpen ? item.label : undefined}
                    className={({ isActive }) => `
                      flex items-center rounded-xl font-bold transition-all duration-200 group relative
                      ${isOpen ? 'px-3 py-2.5 w-full justify-start gap-3' : 'w-12 h-12 justify-center hidden md:flex'}
                      ${isActive 
                        ? 'bg-pink-light text-primary dark:bg-primary/20 shadow-sm' 
                        : 'text-text-muted hover:text-primary hover:bg-bg-light dark:hover:bg-white/5'}
                    `}
                  >
                    <Icon size={18} strokeWidth={2.5} className="flex-shrink-0" />
                    {isOpen && <span className="text-[13px] whitespace-nowrap animate-fade-in">{item.label}</span>}
                    
                    {!isOpen && (
                      <span className="absolute left-14 bg-gray-900 text-white text-[11px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}