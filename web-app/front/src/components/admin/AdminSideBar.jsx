import { NavLink, useLocation, Link } from 'react-router-dom'
import {
  LayoutDashboard, DollarSign, ShoppingBag, Truck, Package,
  Tag, BookOpen, TrendingUp, Bell, Settings, LogOut,
  Flower2, Sun, Moon, Bike, ArrowLeft
} from 'lucide-react'
import { clsx } from 'clsx'
import { ADMIN_NAV_SECTIONS } from '../../utils/constants'
import { useApp } from '../../context/AppContext'

const ICON_MAP = {
  LayoutDashboard, DollarSign, ShoppingBag, Truck, Package,
  Tag, BookOpen, TrendingUp, Bell, Settings, Flower2, Bike,
  Megaphone: TrendingUp,
}

function NavItem({ item, dark }) {
  const location = useLocation()
  const isActive = location.pathname === item.route ||
    (item.route !== '/admin' && location.pathname.startsWith(item.route))
  const Icon = ICON_MAP[item.icon] ?? LayoutDashboard

  return (
    <NavLink
      to={item.route}
      className={clsx(
        'flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[12.5px] font-medium transition-all',
        isActive
          ? (dark ? 'bg-pink-900/30 text-pink-300 font-semibold' : 'bg-pink-50 text-pink-600 font-semibold')
          : (dark ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200' : 'text-gray-500 hover:bg-pink-50 hover:text-pink-500')
      )}
    >
      <div className={clsx(
        'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all',
        isActive
          ? (dark ? 'bg-pink-900/50 text-pink-300' : 'bg-pink-100 text-pink-600')
          : (dark ? 'bg-gray-800 text-gray-500' : 'bg-transparent text-gray-400')
      )}>
        <Icon size={15} strokeWidth={isActive ? 2.2 : 1.8} />
      </div>
      <span className="flex-1 truncate">{item.label}</span>
    </NavLink>
  )
}

export default function AdminSidebar() {
  const { sidebarOpen, setSidebarOpen, dark, toggleDark, user, roleLabel } = useApp()

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={clsx(
          'fixed top-0 left-0 h-full w-[220px] flex flex-col z-50 transition-all duration-300',
          'md:relative md:translate-x-0 md:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          dark ? 'bg-gray-900 border-r border-gray-800' : 'bg-white border-r border-gray-100'
        )}
      >
        <div className={clsx(
          'px-4 pt-4 pb-4',
          dark ? 'border-gray-800' : 'border-gray-100'
        )}>
          <Link to="/" className="flex items-center group w-full">
            <img
              src="/layout_logo.jpg" alt="Aleslí"
              className="w-full h-auto max-h-[60px] object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        <nav className={clsx(
          'flex-1 px-3 py-3 overflow-y-auto space-y-4',
          dark ? 'scrollbar-thin scrollbar-thumb-gray-800' : ''
        )}>
          {ADMIN_NAV_SECTIONS.map(section => (
            <div key={section.label}>
              <p className={clsx(
                'text-[9.5px] font-bold uppercase tracking-[1.5px] px-2 mb-1.5',
                dark ? 'text-gray-500' : 'text-gray-400'
              )}>
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map(item => (
                  <NavItem key={item.id} item={item} dark={dark} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className={clsx(
          'px-3 pb-4 pt-2 space-y-2',
          dark ? 'border-t border-gray-800' : 'border-t border-gray-100'
        )}>
          <Link to="/" className={clsx(
            'flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] font-semibold transition-all',
            dark ? 'text-gray-500 hover:bg-gray-800 hover:text-gray-300' : 'text-gray-500 hover:bg-pink-50 hover:text-pink-500'
          )}>
            <ArrowLeft size={14} /> Volver a la tienda
          </Link>
          <div className="flex gap-1.5">
            <button
              onClick={toggleDark}
              className={clsx(
                'flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all',
                !dark
                  ? 'bg-pink-500 text-white shadow-pink'
                  : 'text-gray-400 hover:bg-gray-800 border border-gray-800'
              )}
            >
              <Sun size={12} /> Claro
            </button>
            <button
              onClick={toggleDark}
              className={clsx(
                'flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all',
                dark
                  ? 'bg-pink-500 text-white shadow-pink'
                  : 'text-gray-400 hover:bg-gray-50 border border-gray-200'
              )}
            >
              <Moon size={12} /> Oscuro
            </button>
          </div>

          <div className={clsx(
            'flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-all',
            dark ? 'hover:bg-gray-800' : 'hover:bg-pink-50'
          )}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0">
              {user?.nombre?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <div className={clsx('text-[12px] font-bold truncate', dark ? 'text-gray-200' : 'text-gray-700')}>{user?.nombre || 'Admin'}</div>
              <div className={clsx('text-[10px] truncate', dark ? 'text-gray-500' : 'text-gray-400')}>{roleLabel}</div>
            </div>
            <LogOut size={13} className="text-gray-300 group-hover:text-pink-400 transition-colors flex-shrink-0" />
          </div>
        </div>
      </aside>
    </>
  )
}