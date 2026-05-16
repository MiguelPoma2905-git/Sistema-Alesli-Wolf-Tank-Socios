import { useState, useRef, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
<<<<<<< HEAD
import { 
  Search, ShoppingBag, ChevronDown, User, LogOut, 
  Package, Settings, Menu, Flower2, Gift, Candy, 
  Trophy, X, Sun, Moon, LayoutDashboard 
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { OCCASIONS } from '../../utils/constants'
import { getOccasionStatus } from '../../utils/helpers'

export default function Navbar({ onMenuToggle }) {
  const { cartCount, user, dark, toggleDark } = useApp()
  const navigate = useNavigate()
  
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  
=======
import {
  Search, ShoppingBag, ChevronDown, User, LogOut,
  Package, Settings, Menu, Flower2, Gift, Candy,
  Trophy, X, Sun, Moon, LayoutDashboard,
  Users, Bell, Star, LogIn, UserPlus, Info,
  Grid3X3, ChevronRight
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function Navbar({ onMenuToggle }) {
  const {
    cartCount, user, isAuth, isAdmin, isEncargado, isCliente,
    dark, toggleDark, setUser, setIsAuth, roleLabel, roleBadge
  } = useApp()
  const navigate = useNavigate()

  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)

>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
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
<<<<<<< HEAD
=======
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    setIsAuth(false);
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
    setUserMenuOpen(false);
    navigate('/');
  }

<<<<<<< HEAD
  // Lógica de Ocasiones
  const activeSeasonalOccasion = OCCASIONS.find(o => {
    const status = getOccasionStatus(o.name);
    return status.seasonal && status.active;
  }) || OCCASIONS.find(o => o.name === 'Día de la Madre'); // Fallback

  // Ocasiones perennes (Las que siempre venden)
  const topGeneralOccasions = [
    { name: 'Cumpleaños', emoji: '🎂' },
    { name: 'Aniversario', emoji: '💍' },
    { name: 'Amor y Romance', emoji: '❤️' },
    { name: 'Nacimiento', emoji: '👶' },
    { name: 'Agradecimiento', emoji: '🙏' },
    { name: 'Recuperación', emoji: '💪' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#131320]/95 backdrop-blur-xl border-b border-pink-light dark:border-white/5 shadow-sm transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-[80px] flex items-center justify-between gap-6">

        {/* ─── LADO IZQUIERDO ─── */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button 
            onClick={onMenuToggle} 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:bg-pink-50 dark:hover:bg-white/5 hover:text-primary transition-all md:hidden"
          >
            <Menu size={22} />
          </button>
          
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md text-[20px] group-hover:rotate-12 transition-transform">🌸</div>
            <div className="text-[24px] font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:block tracking-tight">Alesli</div>
          </div>
        </div>

        {/* ─── CENTRO: Catálogo ─── */}
        <nav className="hidden md:flex items-center h-full gap-2">
          <NavLink to="/" className={({ isActive }) => `px-4 py-2 text-[13px] font-black uppercase tracking-wide transition-colors ${isActive ? 'text-primary' : 'text-text-muted hover:text-primary'}`}>
            Inicio
          </NavLink>

          <div className="relative h-full flex items-center group">
            <button className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-black uppercase tracking-wide text-text-muted group-hover:text-primary transition-colors">
              Catálogo <ChevronDown size={14} className="transition-transform duration-300 group-hover:-rotate-180" />
            </button>
            <div className="absolute top-[80px] left-0 w-[220px] bg-white dark:bg-[#1a1a2e] shadow-card-lg rounded-2xl border border-pink-light/50 dark:border-white/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col p-2 translate-y-2 group-hover:translate-y-0">
              <DropdownItem label="Flores Frescas" onClick={() => navigate('/flores')} icon={<Flower2 size={16}/>} />
              <DropdownItem label="Regalos Especiales" onClick={() => navigate('/regalos')} icon={<Gift size={16}/>} />
              <DropdownItem label="Peluches Adorables" onClick={() => navigate('/peluches')} icon={<Gift size={16}/>} />
              <DropdownItem label="Chocolates Premium" onClick={() => navigate('/chocolates')} icon={<Candy size={16}/>} />
            </div>
          </div>

          {/* MENÚ OCASIONES REDISEÑADO */}
          <div className="relative h-full flex items-center group">
            <button className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-black uppercase tracking-wide text-text-muted group-hover:text-primary transition-colors">
              Ocasiones <ChevronDown size={14} className="transition-transform duration-300 group-hover:-rotate-180" />
            </button>
            
            <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[700px] bg-white dark:bg-[#1a1a2e] shadow-card-lg rounded-[32px] border border-pink-light/50 dark:border-white/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex p-5 translate-y-2 group-hover:translate-y-0 gap-5">
              
              {/* TARJETA GIGANTE (Fecha inminente) */}
              <div 
                onClick={() => navigate('/ocasiones')} 
                className="flex-1 rounded-[24px] p-6 cursor-pointer hover:scale-[1.02] transition-transform relative overflow-hidden flex flex-col justify-between min-h-[220px] shadow-inner" 
                style={{ background: activeSeasonalOccasion.bg }}
              >
                {/* Capa de contraste oscuro para legibilidad perfecta */}
                <div className="absolute inset-0 bg-black/40 z-0"></div>
                <div className="absolute -right-4 -bottom-4 text-[100px] opacity-30 z-0 drop-shadow-2xl">{activeSeasonalOccasion.emoji}</div>
                
                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[2px] rounded-full mb-4 shadow-sm border border-white/20">
                      PRÓXIMAMENTE
                    </span>
                    <h4 className="text-[28px] font-black text-white leading-none mb-2 drop-shadow-md">
                      {activeSeasonalOccasion.name}
                    </h4>
                    <p className="text-[13px] text-white/90 font-medium drop-shadow-sm leading-snug max-w-[90%]">
                      La fecha más importante se acerca. Destaca con un detalle único.
                    </p>
                  </div>
                
                <div className="relative z-10 mt-6">
                  <span className="inline-flex items-center gap-2 text-[12px] font-black text-white uppercase tracking-wider bg-white/20 px-4 py-2 rounded-xl backdrop-blur-md border border-white/30 hover:bg-white hover:text-black transition-colors shadow-sm">
                    Ver colección →
                  </span>
                </div>
              </div>

              {/* MATRIZ DE OCASIONES DIARIAS */}
              <div className="flex-[1.4] flex flex-col">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {topGeneralOccasions.map(o => (
                    <MiniOccasionCard key={o.name} label={o.name} emoji={o.emoji} onClick={() => navigate('/ocasiones')} />
                  ))}
                </div>
                <button 
                  onClick={() => navigate('/ocasiones')} 
                  className="w-full mt-auto py-3 text-center text-[12px] font-black uppercase tracking-widest text-text-muted hover:text-primary bg-bg-light dark:bg-white/5 rounded-xl transition-all border border-pink-light/30 dark:border-white/5 hover:border-primary/30 shadow-sm"
                >
                  Ver todo el calendario
                </button>
              </div>

            </div>
          </div>

          <button onClick={() => navigate('/personalizar')} className="flex items-center gap-2 px-4 py-2 text-[13px] font-black uppercase tracking-wide text-text-muted hover:text-primary transition-colors">
            Personalizar
          </button>
        </nav>

        {/* ─── LADO DERECHO ─── */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          
          <button 
            onClick={toggleDark}
            className="w-10 h-10 rounded-full flex items-center justify-center text-text-dark dark:text-white hover:text-primary hover:bg-pink-50 dark:hover:bg-white/5 transition-all"
            title={dark ? "Modo Claro" : "Modo Oscuro"}
          >
            {dark ? <Sun size={22} strokeWidth={1.5} /> : <Moon size={22} strokeWidth={1.5} />}
          </button>

          <div className="relative flex items-center" ref={searchRef}>
            <button onClick={() => setSearchOpen(!searchOpen)} className="w-10 h-10 rounded-full flex items-center justify-center text-text-dark dark:text-white hover:text-primary hover:bg-pink-50 dark:hover:bg-white/5 transition-all">
              {searchOpen ? <X size={22} strokeWidth={1.5} /> : <Search size={22} strokeWidth={1.5} />}
            </button>
            {searchOpen && (
              <form onSubmit={handleSearch} className="absolute right-0 top-[60px] w-[280px] md:w-[350px] bg-white dark:bg-[#1a1a2e] shadow-card-lg rounded-2xl border border-pink-light/50 dark:border-white/5 p-3 z-50 animate-fade-in-up flex items-center gap-2">
                <input type="text" autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="¿Qué estás buscando hoy?" className="flex-1 bg-bg-light dark:bg-white/5 px-4 py-2.5 rounded-xl text-[13px] font-medium text-text-dark dark:text-white placeholder-text-muted outline-none border border-transparent focus:border-primary/30" />
                <button type="submit" className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-secondary transition-colors shadow-sm"><Search size={18} /></button>
=======
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0f0f1a]/95 backdrop-blur-xl border-b border-border-light/30 dark:border-white/10 shadow-sm transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-[76px] flex items-center justify-between gap-6">

        {/* ─── LOGO ─── */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={onMenuToggle}
            className="w-10 h-10 flex items-center justify-center text-text-muted hover:bg-cream dark:hover:bg-white/5 hover:text-primary transition-all md:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center cursor-pointer group flex-1 max-w-[320px]" onClick={() => navigate('/')}>
            <img
              src="/layout_logo.jpg" alt="Aleslí"
              className="w-full h-auto max-h-[76px] object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        {/* ─── NAV CENTER (varía según auth) ─── */}
        <nav className="hidden md:flex items-center h-full gap-1">
          {!isAuth ? (
            <>
              <NavLink to="/" className={({ isActive }) => `flex items-center gap-1.5 px-5 py-2 text-[12px] font-bold uppercase tracking-wider transition-colors border-b-2 ${isActive ? 'text-primary border-primary bg-primary/5' : 'text-text-muted border-transparent hover:text-primary hover:border-primary/30'}`}>
                <Info size={14} /> Nosotros
              </NavLink>
              <NavLink to="/flores" className={({ isActive }) => `flex items-center gap-1.5 px-5 py-2 text-[12px] font-bold uppercase tracking-wider transition-colors border-b-2 ${isActive ? 'text-primary border-primary bg-primary/5' : 'text-text-muted border-transparent hover:text-primary hover:border-primary/30'}`}>
                <Grid3X3 size={14} /> Catálogo
              </NavLink>
              <NavLink to="/ocasiones" className={({ isActive }) => `flex items-center gap-1.5 px-5 py-2 text-[12px] font-bold uppercase tracking-wider transition-colors border-b-2 ${isActive ? 'text-primary border-primary bg-primary/5' : 'text-text-muted border-transparent hover:text-primary hover:border-primary/30'}`}>
                <Star size={14} /> Ocasiones
              </NavLink>
              <NavLink to="/contacto" className={({ isActive }) => `flex items-center gap-1.5 px-5 py-2 text-[12px] font-bold uppercase tracking-wider transition-colors border-b-2 ${isActive ? 'text-primary border-primary bg-primary/5' : 'text-text-muted border-transparent hover:text-primary hover:border-primary/30'}`}>
                Contacto
              </NavLink>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  if (isAdmin) navigate('/admin')
                  else if (isEncargado) navigate('/')
                  else navigate('/')
                }}
                className="flex items-center gap-2 px-5 py-2 text-[12px] font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/30 hover:bg-primary hover:text-white transition-all"
              >
                <LayoutDashboard size={15} /> Mi Panel
              </button>

              {(isAdmin || isEncargado) && (
                <>
                  <NavLink to="/pedidos" className={({ isActive }) => `px-4 py-2 text-[12px] font-bold uppercase tracking-wider transition-colors border-b-2 ${isActive ? 'text-primary border-primary' : 'text-text-muted border-transparent hover:text-primary hover:border-primary/30'}`}>
                    Pedidos
                  </NavLink>
                  <NavLink to="/flores" className={({ isActive }) => `px-4 py-2 text-[12px] font-bold uppercase tracking-wider transition-colors border-b-2 ${isActive ? 'text-primary border-primary' : 'text-text-muted border-transparent hover:text-primary hover:border-primary/30'}`}>
                    Catálogo
                  </NavLink>
                </>
              )}

              {isAdmin && (
                <button onClick={() => navigate('/admin')} className="flex items-center gap-2 px-4 py-2 text-[12px] font-bold uppercase tracking-wider text-secondary border border-secondary/40 hover:bg-secondary hover:text-white transition-all ml-2">
                  <LayoutDashboard size={14} /> Admin
                </button>
              )}

              {isCliente && (
                <>
                  <div className="relative h-full flex items-center group">
                    <button className="flex items-center gap-1.5 px-4 py-2 text-[12px] font-bold uppercase tracking-wider text-text-muted hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary/30">
                      Tienda <ChevronDown size={14} />
                    </button>
                    <div className="absolute top-[76px] left-0 w-[200px] bg-white dark:bg-[#151522] shadow-lg border border-border-light/30 dark:border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col p-2 translate-y-2 group-hover:translate-y-0">
                      <DropdownItem label="Flores" onClick={() => navigate('/flores')} icon={<Flower2 size={16}/>} />
                      <DropdownItem label="Regalos" onClick={() => navigate('/regalos')} icon={<Gift size={16}/>} />
                      <DropdownItem label="Peluches" onClick={() => navigate('/peluches')} icon={<Gift size={16}/>} />
                      <DropdownItem label="Chocolates" onClick={() => navigate('/chocolates')} icon={<Candy size={16}/>} />
                    </div>
                  </div>

                  <NavLink to="/ocasiones" className={({ isActive }) => `px-4 py-2 text-[12px] font-bold uppercase tracking-wider transition-colors border-b-2 ${isActive ? 'text-primary border-primary' : 'text-text-muted border-transparent hover:text-primary hover:border-primary/30'}`}>
                    Ocasiones
                  </NavLink>
                </>
              )}
            </>
          )}
        </nav>

        {/* ─── RIGHT SECTION ─── */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">

          <button
            onClick={toggleDark}
            className="w-9 h-9 flex items-center justify-center text-text-dark dark:text-white hover:text-primary hover:bg-cream dark:hover:bg-white/5 transition-all"
            title={dark ? "Modo Claro" : "Modo Oscuro"}
          >
            {dark ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
          </button>

          <div className="relative flex items-center" ref={searchRef}>
            <button onClick={() => setSearchOpen(!searchOpen)} className="w-9 h-9 flex items-center justify-center text-text-dark dark:text-white hover:text-primary hover:bg-cream dark:hover:bg-white/5 transition-all">
              {searchOpen ? <X size={20} strokeWidth={1.5} /> : <Search size={20} strokeWidth={1.5} />}
            </button>
            {searchOpen && (
              <form onSubmit={handleSearch} className="absolute right-0 top-[56px] w-[280px] md:w-[350px] bg-white dark:bg-[#151522] shadow-lg border border-border-light/30 dark:border-white/10 p-4 z-50 animate-fade-in-up flex items-center gap-2">
                <input
                  type="text" autoFocus value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  className="flex-1 bg-cream dark:bg-white/5 px-4 py-2.5 text-[13px] font-medium text-text-dark dark:text-white placeholder-text-muted outline-none border border-border-light/40 dark:border-white/10 focus:border-primary"
                />
                <button type="submit" className="w-9 h-9 bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors shadow-sm">
                  <Search size={16} />
                </button>
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
              </form>
            )}
          </div>

<<<<<<< HEAD
          <div className="relative" ref={userMenuRef}>
            <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="w-10 h-10 rounded-full flex items-center justify-center text-text-dark dark:text-white hover:text-primary hover:bg-pink-50 dark:hover:bg-white/5 transition-all">
              <User size={22} strokeWidth={1.5} />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 top-[60px] w-[250px] bg-white dark:bg-[#1a1a2e] shadow-card-lg rounded-[28px] border border-pink-light/50 dark:border-white/5 py-3 z-50 animate-fade-in-up">
                {user ? (
                  <>
                    <div className="px-5 py-3 border-b border-pink-light/50 dark:border-white/5 mb-2">
                      <p className="text-[15px] font-black text-text-dark dark:text-white truncate">{user.name}</p>
                      <p className="text-[12px] text-text-muted truncate mb-2">{user.email || 'usuario@alesli.bo'}</p>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-yellow-200 dark:border-yellow-500/30">
                        <Trophy size={12} /> {user.points || 0} Puntos
                      </div>
                    </div>
                    <DropdownAction label="Mi Perfil" icon={<Settings size={18} strokeWidth={1.5}/>} onClick={() => navigate('/perfil')} />
                    <DropdownAction label="Mis Pedidos" icon={<Package size={18} strokeWidth={1.5}/>} onClick={() => navigate('/pedidos')} showBadge />
                    <DropdownAction label="Mis Fechas Especiales" icon={<Flower2 size={18} strokeWidth={1.5}/>} onClick={() => navigate('/fechas')} />
                    <DropdownAction label="Mis Beneficios" icon={<Trophy size={18} strokeWidth={1.5}/>} onClick={() => navigate('/recompensas')} />
                    {(user.role === 'admin' || user.role === 'florist') && (
                      <>
                        <div className="h-[1px] bg-pink-light/50 dark:bg-white/5 my-2 mx-4" />
                        <button onClick={() => navigate('/admin/dashboard')} className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-black text-secondary hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-colors uppercase tracking-wide">
                          <LayoutDashboard size={18} strokeWidth={2} /> Panel de Gestión
                        </button>
                      </>
                    )}
                    <div className="h-[1px] bg-pink-light/50 dark:bg-white/5 my-2 mx-4" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                      <LogOut size={18} strokeWidth={1.5} /> Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <div className="p-4">
                    <p className="text-[12px] text-text-muted text-center mb-4 px-2 font-medium">Únete para acumular puntos y recibir regalos exclusivos.</p>
                    <button onClick={() => navigate('/login')} className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl text-[13px] font-black shadow-md hover:scale-[1.02] transition-all">Ingresar ahora</button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button onClick={() => navigate('/carrito')} className="relative w-10 h-10 rounded-full flex items-center justify-center text-text-dark dark:text-white hover:text-primary hover:bg-pink-50 dark:hover:bg-white/5 transition-all group">
            <ShoppingBag size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform"/>
            <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full min-w-[18px] h-[18px] px-1 text-[10px] font-black flex items-center justify-center shadow-sm border-2 border-white dark:border-[#131320]">{cartCount}</span>
          </button>
          
=======
          {/* ─── NO AUTH: BOTONES LOGIN / REGISTER ─── */}
          {!isAuth && (
            <div className="hidden sm:flex items-center gap-2 ml-2">
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-[12px] font-bold uppercase tracking-wider hover:bg-accent transition-all"
              >
                <LogIn size={15} /> Ingresar
              </button>
              <button
                onClick={() => { navigate('/login'); setTimeout(() => window.dispatchEvent(new Event('toggle-auth')), 100) }}
                className="flex items-center gap-2 px-5 py-2.5 border-2 border-primary text-primary text-[12px] font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all"
              >
                <UserPlus size={15} /> Registrarse
              </button>
            </div>
          )}

          {/* ─── AUTH: USUARIO ─── */}
          {isAuth && (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-border-light/40 dark:border-white/10 hover:border-primary/50 transition-all group"
              >
                <div className={`w-8 h-8 flex items-center justify-center text-white font-bold text-[13px] ${roleBadge}`}>
                  {user?.nombre?.charAt(0)?.toUpperCase() || <User size={16} />}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-[13px] font-bold text-text-dark dark:text-white leading-tight">{user?.nombre || 'Usuario'}</p>
                  <p className="text-[9px] font-bold text-text-muted uppercase tracking-wider leading-tight">{roleLabel}</p>
                </div>
                <ChevronDown size={14} className="text-text-muted" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-[56px] w-[280px] bg-white dark:bg-[#151522] shadow-lg border border-border-light/30 dark:border-white/10 py-3 z-50 animate-fade-in-up">
                  <div className="px-5 py-3 border-b border-border-light/30 dark:border-white/10 mb-2">
                    <p className="text-[15px] font-heading font-bold text-text-dark dark:text-white truncate">{user?.nombre}</p>
                    <p className="text-[11px] text-text-muted truncate">{user?.email || ''}</p>
                    <span className={`inline-block mt-1.5 px-2.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider ${roleBadge}`}>
                      {roleLabel}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setUserMenuOpen(false)
                      if (isAdmin) navigate('/admin/dashboard')
                      else navigate('/')
                    }}
                    className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-bold text-primary hover:bg-cream dark:hover:bg-white/5 transition-colors"
                  >
                    <LayoutDashboard size={16} /> Entrar a mi panel <ChevronRight size={14} className="ml-auto" />
                  </button>

                  <div className="h-[1px] bg-border-light/30 dark:bg-white/10 my-2 mx-4" />

                  {isCliente && (
                    <>
                      <DropdownAction label="Mi Perfil" icon={<Settings size={16} strokeWidth={1.5}/>} onClick={() => { setUserMenuOpen(false); navigate('/perfil') }} />
                      <DropdownAction label="Mis Pedidos" icon={<Package size={16} strokeWidth={1.5}/>} onClick={() => { setUserMenuOpen(false); navigate('/pedidos') }} />
                      <DropdownAction label="Fechas Especiales" icon={<Star size={16} strokeWidth={1.5}/>} onClick={() => { setUserMenuOpen(false); navigate('/fechas') }} />
                      <DropdownAction label="Beneficios" icon={<Trophy size={16} strokeWidth={1.5}/>} onClick={() => { setUserMenuOpen(false); navigate('/recompensas') }} />
                    </>
                  )}

                  {(isAdmin || isEncargado) && (
                    <>
                      <DropdownAction label="Gestión de Pedidos" icon={<Package size={16} strokeWidth={1.5}/>} onClick={() => { setUserMenuOpen(false); navigate('/pedidos') }} />
                      {isAdmin && (
                        <DropdownAction label="Panel Admin" icon={<LayoutDashboard size={16} strokeWidth={1.5}/>} onClick={() => { setUserMenuOpen(false); navigate('/admin/dashboard') }} />
                      )}
                    </>
                  )}

                  <div className="h-[1px] bg-border-light/30 dark:bg-white/10 my-2 mx-4" />
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-bold text-primary-dark hover:bg-cream dark:hover:bg-white/5 transition-colors">
                    <LogOut size={16} strokeWidth={1.5} /> Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          )}

          {isCliente && (
            <button onClick={() => navigate('/carrito')} className="relative w-9 h-9 flex items-center justify-center text-text-dark dark:text-white hover:text-primary hover:bg-cream dark:hover:bg-white/5 transition-all group">
              <ShoppingBag size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform"/>
              <span className="absolute -top-1 -right-1 bg-primary text-white min-w-[16px] h-[16px] px-1 text-[9px] font-bold flex items-center justify-center shadow-sm border-2 border-white dark:border-[#0f0f1a]">
                {cartCount}
              </span>
            </button>
          )}

>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
        </div>
      </div>
    </header>
  )
}

function DropdownItem({ icon, label, onClick }) {
  return (
<<<<<<< HEAD
    <button onClick={onClick} className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl hover:bg-pink-light dark:hover:bg-white/5 text-text-muted hover:text-primary dark:hover:text-white transition-all text-[13px] font-bold group">
=======
    <button onClick={onClick} className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-cream dark:hover:bg-white/5 text-text-muted hover:text-primary dark:hover:text-white transition-all text-[13px] font-bold group">
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
      {icon && <span className="text-primary group-hover:scale-110 transition-transform">{icon}</span>}{label}
    </button>
  )
}

<<<<<<< HEAD
function DropdownAction({ icon, label, onClick, showBadge = false }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between px-5 py-2.5 text-[13px] font-bold text-text-muted hover:text-primary hover:bg-pink-light/50 dark:hover:bg-white/5 transition-colors group">
      <div className="flex items-center gap-3"><span className="group-hover:scale-110 transition-transform">{icon}</span>{label}</div>
      {showBadge && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
    </button>
  )
}

function MiniOccasionCard({ emoji, label, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-bg-light dark:bg-white/5 hover:bg-pink-50 dark:hover:bg-primary/20 text-left transition-all group border border-transparent hover:border-pink-light/50 dark:hover:border-primary/30">
      <span className="text-[20px] group-hover:scale-110 transition-transform drop-shadow-sm">{emoji}</span>
      <span className="text-[13px] font-bold text-text-dark dark:text-white group-hover:text-primary transition-colors leading-tight">{label}</span>
    </button>
  )
}
=======
function DropdownAction({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-5 py-2.5 text-[13px] font-bold text-text-muted hover:text-primary hover:bg-cream dark:hover:bg-white/5 transition-colors group">
      <span className="group-hover:scale-110 transition-transform">{icon}</span>{label}
    </button>
  )
}
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
