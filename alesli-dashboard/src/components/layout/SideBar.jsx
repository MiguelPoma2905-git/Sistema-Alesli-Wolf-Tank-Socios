import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, DollarSign, ShoppingBag, Truck, Package,
  Tag, BookOpen, TrendingUp, Bell, Settings, ChevronRight,
  Flower2, LogOut, Sun, Moon,
} from 'lucide-react'
import { clsx } from 'clsx'
import { NAV_SECTIONS } from '../../utils/constants'
import { useApp } from '../../context/AppContext'
import { NavBadge } from '../ui/Badge'

/* Mapa icono-nombre → componente Lucide */
const ICON_MAP = {
  LayoutDashboard, DollarSign, ShoppingBag, Truck, Package,
  Tag, BookOpen, TrendingUp, Bell, Settings, Flower2,
  Megaphone: Bell, /* fallback */
}

function NavItem({ item }) {
  const location = useLocation()
  const isActive = location.pathname === item.route ||
    (item.route !== '/' && location.pathname.startsWith(item.route))
  const Icon = ICON_MAP[item.icon] ?? LayoutDashboard

  return (
    <NavLink
      to={item.route}
      className={clsx('nav-item', isActive && 'active')}
    >
      <div className="nav-icon">
        <Icon size={15} strokeWidth={isActive ? 2.2 : 1.8} />
      </div>
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge != null && (
        <NavBadge
          count={item.badge}
          variant={item.id === 'campanias' ? 'green' : 'pink'}
        />
      )}
    </NavLink>
  )
}

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen, dark, toggleDark, user } = useApp()

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={clsx(
          'fixed top-0 left-0 h-full w-[210px] bg-white border-r border-gray-100',
          'flex flex-col z-50 transition-transform duration-300',
          'md:relative md:translate-x-0 md:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
      >
        {/* Logo */}
        <div className="px-4 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center shadow-pink flex-shrink-0">
              <Flower2 size={18} color="white" strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <div className="text-[17px] font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent leading-none truncate">
                Aleslí
              </div>
              <div className="text-[9px] text-gray-400 uppercase tracking-[1.5px] font-medium mt-0.5">
                Naturalmente para ti
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-4">
          {NAV_SECTIONS.map(section => (
            <div key={section.label}>
              <p className="text-[9.5px] font-bold text-gray-400 uppercase tracking-[1.5px] px-2 mb-1.5">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map(item => (
                  <NavItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom: theme + user */}
        <div className="px-3 pb-4 pt-2 border-t border-gray-100 space-y-2">
          {/* Theme toggle */}
          <div className="flex gap-1.5">
            <button
              onClick={() => dark && toggleDark()}
              className={clsx(
                'flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all',
                !dark ? 'bg-pink-500 text-white shadow-pink' : 'text-gray-400 hover:bg-gray-50 border border-gray-100',
              )}
            >
              <Sun size={12} /> Claro
            </button>
            <button
              onClick={() => !dark && toggleDark()}
              className={clsx(
                'flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all',
                dark ? 'bg-pink-500 text-white shadow-pink' : 'text-gray-400 hover:bg-gray-50 border border-gray-100',
              )}
            >
              <Moon size={12} /> Oscuro
            </button>
          </div>

          {/* User mini */}
          <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl cursor-pointer hover:bg-pink-50 transition-all group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0">
              {user.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] font-bold text-gray-700 truncate">{user.name}</div>
              <div className="text-[10px] text-gray-400 truncate">{user.role}</div>
            </div>
            <LogOut size={13} className="text-gray-300 group-hover:text-pink-400 transition-colors flex-shrink-0" />
          </div>
        </div>
      </aside>
    </>
  )
}