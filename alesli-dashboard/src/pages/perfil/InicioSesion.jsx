import { useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, LogIn, ShieldCheck, ShieldAlert } from 'lucide-react'
import Button from '../../components/ui/Button'
import { useApp } from '../../context/AppContext'
import { AUTH_USERS } from '../../data/mockData'
import { ROUTES } from '../../utils/constants'

const ROLE_REDIRECTS = {
  Admin: ROUTES.DASHBOARD,
  Vendedor: ROUTES.CATALOGO,
  'Producción': ROUTES.PEDIDOS_CLIENTES,
  Delivery: ROUTES.ENTREGAS,
  Finanzas: ROUTES.FINANZAS,
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function InicioSesion() {
  const navigate = useNavigate()
  const {
    login,
    rememberedEmail,
    captchaRequired,
    isAuthenticated,
    user,
  } = useApp()

  const [form, setForm] = useState({
    email: rememberedEmail || '',
    password: '',
    remember: Boolean(rememberedEmail),
    captchaChecked: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')
  const [fieldError, setFieldError] = useState({})
  const [recoveryOpen, setRecoveryOpen] = useState(false)
  const [recoveryStage, setRecoveryStage] = useState(1)
  const [recoveryEmail, setRecoveryEmail] = useState('')
  const [recoveryStatus, setRecoveryStatus] = useState('')
  const [recoveryPassword, setRecoveryPassword] = useState('')
  const [recoveryConfirm, setRecoveryConfirm] = useState('')
  const [recoveryError, setRecoveryError] = useState('')

  const hasRecovery = useMemo(() => recoveryStage > 1, [recoveryStage])

  if (isAuthenticated) {
    const destination = ROLE_REDIRECTS[user.role] || ROUTES.DASHBOARD
    return <Navigate to={destination} replace />
  }

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setFormError('')
    setFieldError({})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = login({
      email: form.email,
      password: form.password,
      remember: form.remember,
      captchaToken: form.captchaChecked,
    })

    if (!result.success) {
      setFormError(result.message)
      setFieldError(result.field ? { [result.field]: true } : {})
      return
    }

    const destination = ROLE_REDIRECTS[result.role] || ROUTES.DASHBOARD
    navigate(destination, { replace: true })
  }

  const openRecovery = () => {
    setRecoveryOpen(true)
    setRecoveryStage(1)
    setRecoveryEmail('')
    setRecoveryPassword('')
    setRecoveryConfirm('')
    setRecoveryError('')
    setRecoveryStatus('')
  }

  const closeRecovery = () => {
    setRecoveryOpen(false)
    setRecoveryStage(1)
  }

  const handleRecoveryRequest = (event) => {
    event.preventDefault()
    setRecoveryError('')
    if (!recoveryEmail) {
      setRecoveryError('El correo es obligatorio')
      return
    }
    if (!emailPattern.test(recoveryEmail)) {
      setRecoveryError('Formato de correo inválido')
      return
    }
    const userExists = AUTH_USERS.some((user) => user.email.toLowerCase() === recoveryEmail.toLowerCase())
    if (!userExists) {
      setRecoveryError('No existe una cuenta vinculada a este correo')
      return
    }
    setRecoveryStage(2)
    setRecoveryStatus(`Revisa tu correo: enviamos un enlace temporal a ${recoveryEmail}`)
  }

  const handleRecoveryReset = (event) => {
    event.preventDefault()
    setRecoveryError('')
    if (!recoveryPassword) {
      setRecoveryError('La nueva contraseña es obligatoria')
      return
    }
    if (recoveryPassword.length < 6) {
      setRecoveryError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    if (recoveryPassword !== recoveryConfirm) {
      setRecoveryError('Las contraseñas deben coincidir')
      return
    }
    setRecoveryStage(3)
    setRecoveryStatus('Restablecimiento completado. El enlace expira en 1 hora.')
  }

  return (
    <div className="min-h-screen bg-[#FFE4E6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl rounded-[28px] border border-white/70 bg-white/95 p-8 shadow-[0_30px_80px_-40px_rgba(219,39,119,0.35)] backdrop-blur-xl sm:p-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="space-y-6">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-pink-100 text-pink-700 shadow-sm">
              <LogIn className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-pink-600">Florería Aleslí</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Bienvenido de vuelta</h1>
              <p className="mt-3 max-w-xl text-base text-slate-600">Ingresa tus credenciales para continuar y accede al panel de operaciones con tu rol asignado.</p>
            </div>
            <div className="grid gap-3 rounded-[28px] bg-pink-50 p-6">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <ShieldCheck className="h-5 w-5 text-pink-600" />
                <span>Autenticación segura con bloqueo tras intentos fallidos</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <ShieldAlert className="h-5 w-5 text-slate-500" />
                <span>Tras 3 intentos fallidos, se solicita verificación extra</span>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Iniciar Sesión</p>
              <p className="mt-3 text-sm text-slate-600">Ingresa tu email y contraseña para acceder al dashboard con tu rol.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-4 inline-flex items-center text-slate-400">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => handleChange('email', event.target.value)}
                    className={`w-full rounded-3xl border px-12 py-3 text-sm text-slate-900 outline-none transition ${fieldError.email ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 focus:border-pink-300'}`}
                    placeholder="admin@floreria.com"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700">Contraseña</label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-4 inline-flex items-center text-slate-400">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(event) => handleChange('password', event.target.value)}
                    className={`w-full rounded-3xl border px-12 py-3 text-sm text-slate-900 outline-none transition ${fieldError.password ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 focus:border-pink-300'}`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {captchaRequired && (
                <label className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.captchaChecked}
                    onChange={(event) => handleChange('captchaChecked', event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-pink-600 focus:ring-pink-500"
                  />
                  <span>No soy un robot</span>
                </label>
              )}

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={form.remember}
                    onChange={(event) => handleChange('remember', event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-pink-600 focus:ring-pink-500"
                  />
                  Recordarme
                </label>
                <button
                  type="button"
                  onClick={openRecovery}
                  className="text-sm font-semibold text-pink-700 hover:text-pink-900"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {formError && <p className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{formError}</p>}

              <Button type="submit" variant="primary" size="lg" full>
                Ingresar
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              ¿No tienes cuenta? <span className="font-semibold text-pink-700">Contacta al administrador</span>
            </p>
          </div>
        </div>
      </div>

      {recoveryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-10">
          <div className="w-full max-w-xl rounded-[28px] bg-white p-8 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-pink-600">Recuperar contraseña</p>
                <h2 className="mt-3 text-2xl font-bold text-slate-900">{recoveryStage === 1 ? 'Solicita un enlace de recuperación' : recoveryStage === 2 ? 'Restablece tu contraseña' : '¡Listo!'}</h2>
              </div>
              <button type="button" onClick={closeRecovery} className="text-slate-500 transition hover:text-slate-900">Cerrar</button>
            </div>

            <div className="mt-6 space-y-4">
              {recoveryStage === 1 && (
                <form className="space-y-4" onSubmit={handleRecoveryRequest}>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Email registrado</label>
                    <input
                      type="email"
                      value={recoveryEmail}
                      onChange={(event) => setRecoveryEmail(event.target.value)}
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-pink-300"
                      placeholder="admin@floreria.com"
                    />
                  </div>
                  {recoveryError && <p className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{recoveryError}</p>}
                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="secondary" size="md" onClick={closeRecovery}>Cancelar</Button>
                    <Button type="submit" variant="primary" size="md">Enviar enlace</Button>
                  </div>
                </form>
              )}

              {recoveryStage === 2 && (
                <form className="space-y-4" onSubmit={handleRecoveryReset}>
                  <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">{recoveryStatus}</div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Nueva contraseña</label>
                    <input
                      type="password"
                      value={recoveryPassword}
                      onChange={(event) => setRecoveryPassword(event.target.value)}
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-pink-300"
                      placeholder="Mínimo 6 caracteres"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Confirmar contraseña</label>
                    <input
                      type="password"
                      value={recoveryConfirm}
                      onChange={(event) => setRecoveryConfirm(event.target.value)}
                      className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-pink-300"
                      placeholder="Repite la contraseña"
                    />
                  </div>
                  {recoveryError && <p className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{recoveryError}</p>}
                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="secondary" size="md" onClick={closeRecovery}>Cancelar</Button>
                    <Button type="submit" variant="primary" size="md">Restablecer</Button>
                  </div>
                </form>
              )}

              {recoveryStage === 3 && (
                <div className="space-y-4">
                  <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">{recoveryStatus}</div>
                  <div className="flex justify-end">
                    <Button type="button" variant="primary" size="md" onClick={closeRecovery}>Volver al login</Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InicioSesion