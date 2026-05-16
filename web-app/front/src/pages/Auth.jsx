import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, User, ArrowRight, Sparkles, ShieldCheck, Loader2, AlertCircle, CheckCircle2, X, Briefcase, Users, UserCircle } from 'lucide-react'
import { loginUser, registerUser } from '../services/auth'
import { useApp } from '../context/AppContext'

const ROLES = [
  { value: 'cliente', label: 'Cliente', icon: UserCircle, desc: 'Compra y acumula puntos' },
  { value: 'encargad@', label: 'Encargado', icon: Users, desc: 'Gestiona pedidos y entregas' },
  { value: 'admin', label: 'Administrador', icon: Briefcase, desc: 'Control total del sistema' },
]

export default function Auth() {
  const navigate = useNavigate()
  const { setUser, setIsAuth } = useApp()

  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotModal, setShowForgotModal] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('cliente')

  const [emailError, setEmailError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleEmailChange = (e) => {
    const val = e.target.value
    setEmail(val)
    setAuthError('')
    if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailError('Formato de correo inválido')
    } else {
      setEmailError('')
    }
  }

  const handlePasswordChange = (e) => {
    const val = e.target.value
    setPassword(val)
    setAuthError('')
    let strength = 0
    if (val.length >= 6) strength += 1
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) strength += 1
    if (val.length >= 10) strength += 1
    setPasswordStrength(strength)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (emailError || password.length < 6) {
      setAuthError('Por favor, corrige los errores antes de continuar.')
      return
    }
    setIsLoading(true)
    setAuthError('')

    try {
      let data
      if (isLogin) {
        data = await loginUser(email, password)
      } else {
        await registerUser({
          nombre: name,
          email,
          password,
          password_confirm: password,
          rol: role,
        })
        data = await loginUser(email, password)
      }

      localStorage.setItem('access_token', data.tokens.access)
      localStorage.setItem('refresh_token', data.tokens.refresh)
      setUser(data.user)
      setIsAuth(true)

      navigate('/')
    } catch (err) {
      const msg = err.response?.data?.error
        || err.response?.data?.detail
        || err.response?.data?.email?.[0]
        || 'Error al conectar con el servidor'
      setAuthError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-12 py-12 animate-fade-in transition-colors duration-500 relative"
      style={{
        backgroundImage: "url('/fondo_login.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      <div className="max-w-[1000px] w-full grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-[#151522] shadow-lg border border-border-light/30 dark:border-white/10 relative z-10">

        <div className="p-8 md:p-14 flex flex-col justify-center relative">

          <div className="mb-8">
            <h1 className="text-[32px] md:text-[36px] font-heading font-black text-text-dark dark:text-white leading-tight mb-2">
              {isLogin ? 'Bienvenido' : 'Crear cuenta'}
            </h1>
            <p className="text-[14px] text-text-muted font-medium">
              {isLogin ? 'Ingresa para gestionar tu cuenta.' : 'Selecciona tu rol y únete al sistema.'}
            </p>
          </div>

          {authError && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex items-start gap-3 animate-fade-in-up">
              <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-[13px] font-bold text-red-600 dark:text-red-400">{authError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {!isLogin && (
              <>
                <div className="relative group animate-fade-in">
                  <input
                    type="text"
                    placeholder="Tu nombre completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-cream dark:bg-white/5 border border-border-light/40 dark:border-white/10 pl-12 pr-6 py-4 text-[14px] font-bold text-text-dark dark:text-white outline-none focus:border-primary transition-all"
                  />
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
                </div>

                <div className="animate-fade-in">
                  <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest pl-4 mb-3 block">
                    Selecciona tu rol <span className="text-primary-dark">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {ROLES.map(r => {
                      const Icon = r.icon
                      const selected = role === r.value
                      return (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() => setRole(r.value)}
                          className={`flex flex-col items-center gap-2 p-4 border-2 transition-all ${
                            selected
                              ? 'border-primary bg-cream dark:bg-primary/10 shadow-md'
                              : 'border-border-light/40 dark:border-white/10 bg-cream dark:bg-white/5 hover:border-primary/50'
                          }`}
                        >
                          <Icon size={22} className={selected ? 'text-primary' : 'text-text-muted'} />
                          <span className={`text-[12px] font-bold ${selected ? 'text-primary' : 'text-text-muted'}`}>{r.label}</span>
                          <span className="text-[9px] text-text-muted text-center leading-tight">{r.desc}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </>
            )}

            <div className="relative group">
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={handleEmailChange}
                required
                className={`w-full bg-cream dark:bg-white/5 border pl-12 pr-10 py-4 text-[14px] font-bold text-text-dark dark:text-white outline-none transition-all ${emailError ? 'border-red-500' : 'border-border-light/40 dark:border-white/10 focus:border-primary'}`}
              />
              <Mail size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${emailError ? 'text-red-500' : 'text-text-muted group-focus-within:text-primary'}`} />
              {email && !emailError && <CheckCircle2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600" />}
            </div>

            <div className="relative group flex flex-col gap-2">
              <div className="relative">
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="w-full bg-cream dark:bg-white/5 border border-border-light/40 dark:border-white/10 pl-12 pr-6 py-4 text-[14px] font-bold text-text-dark dark:text-white outline-none focus:border-primary transition-all"
                />
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
              </div>

              {!isLogin && password.length > 0 && (
                <div className="flex items-center gap-2 px-1">
                  <div className="flex-1 flex gap-1 h-1">
                    <div className={`flex-1 transition-all ${passwordStrength >= 1 ? 'bg-red-600' : 'bg-border-light dark:bg-white/10'}`}></div>
                    <div className={`flex-1 transition-all ${passwordStrength >= 2 ? 'bg-yellow-600' : 'bg-border-light dark:bg-white/10'}`}></div>
                    <div className={`flex-1 transition-all ${passwordStrength >= 3 ? 'bg-green-600' : 'bg-border-light dark:bg-white/10'}`}></div>
                  </div>
                  <span className="text-[10px] font-bold text-text-muted uppercase w-12 text-right">
                    {passwordStrength === 1 && 'Débil'}
                    {passwordStrength === 2 && 'Media'}
                    {passwordStrength === 3 && 'Fuerte'}
                  </span>
                </div>
              )}
            </div>

            {isLogin && (
              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 border border-border-light/50 dark:border-white/20 group-hover:border-primary transition-colors bg-white dark:bg-transparent">
                    <input type="checkbox" className="peer sr-only" />
                    <CheckCircle2 size={14} className="opacity-0 peer-checked:opacity-100 text-primary absolute transition-opacity" />
                  </div>
                  <span className="text-[13px] font-medium text-text-muted select-none">Recordarme</span>
                </label>
                <button type="button" onClick={() => setShowForgotModal(true)} className="text-[13px] font-bold text-primary hover:text-accent transition-all">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            <button disabled={isLoading} type="submit" className="w-full mt-4 bg-text-dark dark:bg-white text-white dark:text-text-dark py-4 font-bold text-[14px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-md hover:opacity-90 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
              {isLoading ? (
                <><Loader2 size={18} className="animate-spin" /> Verificando...</>
              ) : (
                <>{isLogin ? 'Ingresar' : 'Crear Cuenta'} <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4 before:h-[1px] before:flex-1 before:bg-border-light/50 dark:before:bg-white/10 after:h-[1px] after:flex-1 after:bg-border-light/50 dark:after:bg-white/10">
            <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest">O continúa con</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button className="flex items-center justify-center gap-3 py-3 border border-border-light/40 dark:border-white/10 hover:bg-cream dark:hover:bg-white/5 transition-colors text-[13px] font-bold text-text-dark dark:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-3 py-3 border border-border-light/40 dark:border-white/10 hover:bg-cream dark:hover:bg-white/5 transition-colors text-[13px] font-bold text-text-dark dark:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-text-dark dark:fill-white"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.68.827-1.35 2.241-1.166 3.6 1.341.104 2.611-.571 3.453-1.588z"/></svg>
              Apple
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[13px] font-bold text-text-muted">
              {isLogin ? '¿Aún no tienes cuenta?' : '¿Ya eres parte de Alesli?'}
              <button onClick={() => {setIsLogin(!isLogin); setAuthError('');}} type="button" className="ml-2 text-primary hover:underline underline-offset-4 transition-all">
                {isLogin ? 'Regístrate aquí' : 'Inicia Sesión'}
              </button>
            </p>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-center justify-center p-14 bg-cream dark:bg-[#151522] relative overflow-hidden text-center border-l border-border-light/30 dark:border-white/10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 blur-[120px] pointer-events-none"></div>

          <div className="relative z-10">
            <div className="relative mx-auto mb-8 flex items-center justify-center">
              <div className="absolute w-[260px] h-[260px] bg-primary/15 blur-[100px] rounded-full pointer-events-none" />
              <img
                src="/header_logo.jpg" alt="Alesli"
                className="w-[200px] h-auto object-contain relative z-10 drop-shadow-lg"
              />
            </div>

            <h2 className="text-[32px] font-heading font-black leading-tight mb-4 text-text-dark dark:text-white">
              Sistema de Gestión<br />Alesli
            </h2>

            <p className="text-[14px] font-medium text-text-muted max-w-sm mx-auto mb-10 leading-relaxed">
              ERP/CRM completo para la gestión de pedidos, clientes, inventario y más.
            </p>

            <div className="flex flex-col gap-3 max-w-xs mx-auto text-left">
              <div className="flex items-center gap-3 text-[13px] font-bold text-text-dark dark:text-white bg-white dark:bg-white/5 p-3 border border-border-light/30 dark:border-white/10">
                <ShieldCheck size={18} className="text-green-600" /> Datos cifrados y seguros
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowForgotModal(false)}></div>

          <div className="bg-white dark:bg-[#151522] w-full max-w-md shadow-2xl border border-border-light/30 dark:border-white/10 relative z-10 animate-fade-in-up p-8">
            <button onClick={() => setShowForgotModal(false)} className="absolute top-6 right-6 text-text-muted hover:text-text-dark dark:hover:text-white transition-colors">
              <X size={20} />
            </button>

            <div className="w-12 h-12 bg-cream dark:bg-primary/10 text-primary flex items-center justify-center mb-6">
              <Lock size={20} />
            </div>

            <h3 className="text-[24px] font-heading font-bold text-text-dark dark:text-white mb-2">Restablecer clave</h3>
            <p className="text-[14px] text-text-muted mb-6">Ingresa tu correo y te enviaremos un enlace mágico para volver a entrar.</p>

            <div className="relative group mb-6">
              <input type="email" placeholder="Correo electrónico" className="w-full bg-cream dark:bg-white/5 border border-border-light/40 dark:border-white/10 pl-12 pr-6 py-4 text-[14px] font-bold text-text-dark dark:text-white outline-none focus:border-primary transition-all" />
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
            </div>

            <button onClick={() => setShowForgotModal(false)} className="w-full bg-text-dark dark:bg-white text-white dark:text-text-dark py-4 font-bold text-[13px] uppercase tracking-widest shadow-md hover:opacity-90 transition-all">
              Enviar enlace
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
