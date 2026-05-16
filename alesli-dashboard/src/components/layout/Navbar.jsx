import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Moon, Sun, Bell, ChevronDown } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { navConfig } from '../../data/navConfig'
import { notifications } from '../../data/mockData'
import { Avatar } from '../ui'

export default function Navbar() {
  const { dark, toggleDark } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [openDropdown, setOpenDropdown] = useState(null)
  const [showNotifs, setShowNotifs] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const navRef = useRef(null)

  const unread = notifications.filter(n => !n.leido).length

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null)
        setShowNotifs(false)
        setShowProfile(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = (item) => {
    if (location.pathname === item.path) return true
    if (item.children?.some(c => location.pathname.startsWith(c.path))) return true
    return false
  }

  const handleNavClick = (item) => {
    if (item.children?.length > 0) {
      setOpenDropdown(openDropdown === item.label ? null : item.label)
    } else {
      navigate(item.path)
      setOpenDropdown(null)
    }
  }

  const notifIcons = { urgente: '🚨', stock: '📦', pago: '💳', pedido: '🛍️', sistema: '⚙️' }

  return (
    <div ref={navRef} className="sticky top-2 z-50 mx-2 mt-2">
      <nav className="bg-white dark:bg-dark-card rounded-2xl shadow-card border border-brand-border dark:border-dark-border px-4 py-2 flex items-center gap-1">

        {/* Logo */}
        <button onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 mr-3 flex-shrink-0 hover:opacity-80 transition-opacity">
          <span className="text-2xl">🌸</span>
          <div className="leading-none">
            <div className="font-poppins font-extrabold text-base text-pink-primary">Aleslí</div>
            <div className="text-[8px] text-brand-muted dark:text-dark-muted tracking-widest uppercase">Naturalmente para ti</div>
          </div>
        </button>

        {/* Nav items */}
        <div className="flex items-center gap-0.5 flex-1 overflow-x-auto scrollbar-hide">
          {navConfig.map((item) => {
            const active = isActive(item)
            const isOpen = openDropdown === item.label
            const hasChildren = item.children.length > 0
            return (
              <div key={item.label} className="relative flex-shrink-0">
                <button
                  onClick={() => handleNavClick(item)}
                  className={`nav-item whitespace-nowrap ${active ? 'bg-pink-primary text-white font-semibold shadow-sm hover:bg-pink-hover' : ''}`}
                >
                  <span className="text-[10px] opacity-60 font-poppins">{item.num}</span>
                  {item.label}
                  {hasChildren && (
                    <ChevronDown
                      size={10}
                      className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                {/* Dropdown */}
                {hasChildren && isOpen && (
                  <div className="absolute top-[calc(100%+8px)] left-0 bg-white dark:bg-dark-card rounded-xl shadow-lg border border-brand-border dark:border-dark-border p-1.5 min-w-[180px] z-50 animate-slide-down">
                    {item.children.map((child) => {
                      const childActive = location.pathname === child.path
                      const Icon = child.icon
                      return (
                        <button
                          key={child.label}
                          onClick={() => { navigate(child.path); setOpenDropdown(null) }}
                          className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-xs font-poppins font-medium transition-all duration-150
                            ${childActive
                              ? 'bg-pink-soft text-pink-primary dark:bg-dark-card2'
                              : 'text-brand-muted dark:text-dark-muted hover:bg-brand-bg dark:hover:bg-dark-card2 hover:text-pink-primary'
                            }`}
                        >
                          <Icon size={13} />
                          {child.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
          {/* Theme toggle */}
          <button onClick={toggleDark}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-bg dark:bg-dark-card2 hover:bg-pink-soft dark:hover:bg-dark-border transition-colors">
            {dark ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-brand-muted" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false) }}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-brand-bg dark:bg-dark-card2 hover:bg-pink-soft dark:hover:bg-dark-border transition-colors relative">
              <Bell size={14} className="text-brand-muted dark:text-dark-muted" />
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-primary text-white rounded-full text-[9px] font-bold flex items-center justify-center font-poppins">
                  {unread}
                </span>
              )}
            </button>
            {showNotifs && (
              <div className="absolute top-[calc(100%+10px)] right-0 w-80 bg-white dark:bg-dark-card rounded-xl shadow-lg border border-brand-border dark:border-dark-border z-50 animate-slide-down overflow-hidden">
                <div className="px-4 py-3 border-b border-brand-border dark:border-dark-border flex items-center justify-between">
                  <span className="font-poppins font-semibold text-sm text-brand-text dark:text-dark-text">Notificaciones</span>
                  <span className="text-xs bg-pink-soft text-pink-primary px-2 py-0.5 rounded-full font-semibold">{unread} nuevas</span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.slice(0, 5).map(n => (
                    <div key={n.id} className={`flex gap-3 px-4 py-3 border-b border-brand-border/50 dark:border-dark-border/50 hover:bg-brand-bg dark:hover:bg-dark-card2 transition-colors cursor-pointer ${!n.leido ? 'bg-pink-soft/30' : ''}`}>
                      <span className="text-lg flex-shrink-0 mt-0.5">{notifIcons[n.tipo]}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold font-poppins text-brand-text dark:text-dark-text truncate">{n.titulo}</p>
                        <p className="text-[11px] text-brand-muted dark:text-dark-muted mt-0.5 truncate">{n.desc}</p>
                      </div>
                      <span className="text-[10px] text-brand-muted dark:text-dark-muted flex-shrink-0 mt-0.5">{n.hora}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => { navigate('/notificaciones'); setShowNotifs(false) }}
                  className="w-full py-2.5 text-xs font-poppins font-semibold text-pink-primary hover:bg-pink-soft transition-colors">
                  Ver todas →
                </button>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button onClick={() => { setShowProfile(!showProfile); setShowNotifs(false) }}
              className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-brand-bg dark:hover:bg-dark-card2 transition-colors">
              <Avatar name="AL" size="sm" />
              <div className="text-left hidden sm:block">
                <div className="text-xs font-poppins font-semibold text-brand-text dark:text-dark-text leading-tight">Aleslí Studio</div>
                <div className="text-[10px] text-brand-muted dark:text-dark-muted">Florista</div>
              </div>
              <ChevronDown size={10} className={`text-brand-muted transition-transform duration-200 ${showProfile ? 'rotate-180' : ''}`} />
            </button>
            {showProfile && (
              <div className="absolute top-[calc(100%+10px)] right-0 w-48 bg-white dark:bg-dark-card rounded-xl shadow-lg border border-brand-border dark:border-dark-border p-1.5 z-50 animate-slide-down">
                {[
                  { label: 'Configuraciones', path: '/perfil/configuraciones' },
                  { label: 'Preferencias',    path: '/perfil/preferencias' },
                  { label: 'Inicio de Sesión', path: '/perfil/inicio-sesion' },
                ].map(item => (
                  <button key={item.label} onClick={() => { navigate(item.path); setShowProfile(false) }}
                    className="flex w-full text-left px-3 py-2 rounded-lg text-xs font-poppins font-medium text-brand-muted dark:text-dark-muted hover:bg-brand-bg dark:hover:bg-dark-card2 hover:text-pink-primary transition-all duration-150">
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}