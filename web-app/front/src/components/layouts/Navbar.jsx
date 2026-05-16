import { useState, useRef, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import {
  Search, ShoppingBag, ChevronDown, User, LogOut,
  Package, Settings, Menu, Flower2, Gift, Candy,
  Trophy, X, Sun, Moon, LayoutDashboard, BarChart3,
  Users, Layers, Bell, Star
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { OCCASIONS } from '../../utils/constants'
import { getOccasionStatus } from '../../utils/helpers'

export default function Navbar({ onMenuToggle }) {
  const { cartCount, user, isAuth, isAdmin, isEncargado, isCliente, dark, toggleDark, setUser, setIsAuth } = useApp()
  const navigate = useNavigate()

  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const userMenuRef = useRef(null)
  const searchRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) setUserMenuOpen(false)
      if (searchRef.current && !searchRef.current.contains(event.target)) setSearchOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/flores?search=${encodeURIComponent(query)}`);
    setQuery('');
    setSearchOpen(false);
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    setIsAuth(false);
    setUserMenuOpen(false);
    navigate('/');
  }

  const activeSeasonalOccasion = OCCASIONS.find(o => {
    const status = getOccasionStatus(o.name);
    return status.seasonal && status.active;
  }) || OCCASIONS.find(o => o.name === 'Día de la Madre');

  const topGeneralOccasions = [
    { name: 'Cumpleaños', emoji: '🎂' },
    { name: 'Aniversario', emoji: '💍' },
    { name: 'Amor y Romance', emoji: '❤️' },
    { name: 'Nacimiento', emoji: '👶' },
    { name: 'Agradecimiento', emoji: '🙏' },
    { name: 'Recuperación', emoji: '💪' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#131320]/95 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 shadow-sm transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-[72px] flex items-center justify-between gap-6">

        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={onMenuToggle}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:bg-gray-50 dark:hover:bg-white/5 hover:text-primary transition-all md:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md text-[18px] group-hover:rotate-12 transition-transform">🌸</div>
            <div className="text-[22px] font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:block tracking-tight">Alesli</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center h-full gap-1">
          <NavLink to="/" className={({ isActive }) => `px-4 py-2 text-[12px] font-black uppercase tracking-wide transition-colors rounded-lg ${isActive ? 'text-primary bg-pink-50 dark:bg-primary/10' : 'text-text-muted hover:text-primary hover:bg-gray-50 dark:hover:bg-white/5'}`}>
            Dashboard
          </NavLink>

          {(isAdmin || isEncargado) && (
            <>
              <NavLink to="/pedidos" className={({ isActive }) => `px-4 py-2 text-[12px] font-black uppercase tracking-wide transition-colors rounded-lg ${isActive ? 'text-primary bg-pink-50 dark:bg-primary/10' : 'text-text-muted hover:text-primary hover:bg-gray-50 dark:hover:bg-white/5'}`}>
                Pedidos
              </NavLink>
              <NavLink to="/flores" className={({ isActive }) => `px-4 py-2 text-[12px] font-black uppercase tracking-wide transition-colors rounded-lg ${isActive ? 'text-primary bg-pink-50 dark:bg-primary/10' : 'text-text-muted hover:text-primary hover:bg-gray-50 dark:hover:bg-white/5'}`}>
                Catálogo
              </NavLink>
            </>
          )}

          {isAdmin && (
            <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 px-4 py-2 text-[12px] font-black uppercase tracking-wide text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-colors rounded-lg">
              <LayoutDashboard size={14} /> Admin
            </button>
          )}

          {isCliente && (
            <>
              <div className="relative h-full flex items-center group">
                <button className="flex items-center gap-1.5 px-4 py-2 text-[12px] font-black uppercase tracking-wide text-text-muted hover:text-primary transition-colors rounded-lg">
                  Tienda <ChevronDown size={14} className="transition-transform duration-300 group-hover:-rotate-180" />
                </button>
                <div className="absolute top-[72px] left-0 w-[200px] bg-white dark:bg-[#1a1a2e] shadow-lg rounded-2xl border border-gray-100 dark:border-white/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col p-2 translate-y-2 group-hover:translate-y-0">
                  <DropdownItem label="Flores" onClick={() => navigate('/flores')} icon={<Flower2 size={16}/>} />
                  <DropdownItem label="Regalos" onClick={() => navigate('/regalos')} icon={<Gift size={16}/>} />
                  <DropdownItem label="Peluches" onClick={() => navigate('/peluches')} icon={<Gift size={16}/>} />
                  <DropdownItem label="Chocolates" onClick={() => navigate('/chocolates')} icon={<Candy size={16}/>} />
                </div>
              </div>

              <button onClick={() => navigate('/ocasiones')} className="px-4 py-2 text-[12px] font-black uppercase tracking-wide text-text-muted hover:text-primary transition-colors rounded-lg">
                Ocasiones
              </button>
            </>
          )}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">

          <button
            onClick={toggleDark}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-text-dark dark:text-white hover:text-primary hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
            title={dark ? "Modo Claro" : "Modo Oscuro"}
          >
            {dark ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
          </button>

          <div className="relative flex items-center" ref={searchRef}>
            <button onClick={() => setSearchOpen(!searchOpen)} className="w-9 h-9 rounded-xl flex items-center justify-center text-text-dark dark:text-white hover:text-primary hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
              {searchOpen ? <X size={20} strokeWidth={1.5} /> : <Search size={20} strokeWidth={1.5} />}
            </button>
            {searchOpen && (
              <form onSubmit={handleSearch} className="absolute right-0 top-[56px] w-[280px] md:w-[350px] bg-white dark:bg-[#1a1a2e] shadow-lg rounded-2xl border border-gray-100 dark:border-white/5 p-3 z-50 animate-fade-in-up flex items-center gap-2">
                <input type="text" autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar productos..." className="flex-1 bg-gray-50 dark:bg-white/5 px-4 py-2.5 rounded-xl text-[13px] font-medium text-text-dark dark:text-white placeholder-text-muted outline-none border border-transparent focus:border-primary/30" />
                <button type="submit" className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-secondary transition-colors shadow-sm"><Search size={16} /></button>
              </form>
            )}
          </div>

          <div className="relative" ref={userMenuRef}>
            <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="w-9 h-9 rounded-xl flex items-center justify-center text-text-dark dark:text-white hover:text-primary hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
              <User size={20} strokeWidth={1.5} />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 top-[56px] w-[260px] bg-white dark:bg-[#1a1a2e] shadow-lg rounded-2xl border border-gray-100 dark:border-white/5 py-3 z-50 animate-fade-in-up">
                {user ? (
                  <>
                    <div className="px-5 py-3 border-b border-gray-100 dark:border-white/5 mb-2">
                      <p className="text-[15px] font-black text-text-dark dark:text-white truncate">{user.nombre}</p>
                      <p className="text-[11px] text-text-muted truncate">{user.email || 'usuario@alesli.bo'}</p>
                      <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-black text-white uppercase tracking-wider ${isAdmin ? 'bg-purple-500' : isEncargado ? 'bg-blue-500' : 'bg-green-500'}`}>
                        {user.rol}
                      </span>
                    </div>

                    {isCliente && (
                      <>
                        <DropdownAction label="Mi Perfil" icon={<Settings size={16} strokeWidth={1.5}/>} onClick={() => navigate('/perfil')} />
                        <DropdownAction label="Mis Pedidos" icon={<Package size={16} strokeWidth={1.5}/>} onClick={() => navigate('/pedidos')} />
                        <DropdownAction label="Fechas Especiales" icon={<Star size={16} strokeWidth={1.5}/>} onClick={() => navigate('/fechas')} />
                        <DropdownAction label="Beneficios" icon={<Trophy size={16} strokeWidth={1.5}/>} onClick={() => navigate('/recompensas')} />
                      </>
                    )}

                    {(isAdmin || isEncargado) && (
                      <>
                        <div className="h-[1px] bg-gray-100 dark:bg-white/5 my-2 mx-4" />
                        <DropdownAction label="Gestión de Pedidos" icon={<Package size={16} strokeWidth={1.5}/>} onClick={() => navigate('/pedidos')} />
                        {isAdmin && (
                          <DropdownAction label="Panel Admin" icon={<LayoutDashboard size={16} strokeWidth={1.5}/>} onClick={() => navigate('/admin/dashboard')} />
                        )}
                      </>
                    )}

                    <div className="h-[1px] bg-gray-100 dark:bg-white/5 my-2 mx-4" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                      <LogOut size={16} strokeWidth={1.5} /> Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <div className="p-4">
                    <p className="text-[12px] text-text-muted text-center mb-4 px-2 font-medium">Inicia sesión para acceder al sistema.</p>
                    <button onClick={() => navigate('/login')} className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-[13px] font-black shadow-md hover:scale-[1.02] transition-all">Ingresar ahora</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {isCliente && (
            <button onClick={() => navigate('/carrito')} className="relative w-9 h-9 rounded-xl flex items-center justify-center text-text-dark dark:text-white hover:text-primary hover:bg-gray-50 dark:hover:bg-white/5 transition-all group">
              <ShoppingBag size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform"/>
              <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full min-w-[16px] h-[16px] px-1 text-[9px] font-black flex items-center justify-center shadow-sm border-2 border-white dark:border-[#131320]">{cartCount}</span>
            </button>
          )}

        </div>
      </div>
    </header>
  )
}

function DropdownItem({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 text-text-muted hover:text-primary dark:hover:text-white transition-all text-[13px] font-bold group">
      {icon && <span className="text-primary group-hover:scale-110 transition-transform">{icon}</span>}{label}
    </button>
  )
}

function DropdownAction({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-bold text-text-muted hover:text-primary hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
      <span className="group-hover:scale-110 transition-transform">{icon}</span>{label}
    </button>
  )
}
