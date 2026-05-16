import { createContext, useContext, useState, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { ORDERS, USER, NOTIFICATIONS, DELIVERIES, AUTH_USERS } from '../data/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // ── UI state ──────────────────────────────────────────────
  const [sidebarOpen,  setSidebarOpen]  = useState(false)
  const [dark,         setDark]         = useState(false)
  const [activeRoute,  setActiveRoute]  = useState('/')

  // ── Modal / Toast ──────────────────────────────────────────
  const [modal,  setModal]  = useState({ open: false, type: null, data: null })
  const [toasts, setToasts] = useState([])

  // ── Datos ──────────────────────────────────────────────────
  const [orders,        setOrders]        = useState(ORDERS)
  const [deliveries,    setDeliveries]    = useState(DELIVERIES)
  const [notifications, setNotifications] = useState(NOTIFICATIONS)
  const [currentUser,   setCurrentUser]   = useState(null)
  const [rememberedEmail, setRememberedEmail] = useLocalStorage('rememberedEmail', '')
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [lockUntil,     setLockUntil]     = useState(null)
  const [captchaRequired, setCaptchaRequired] = useState(false)
  const user = currentUser || USER
  const isAuthenticated = Boolean(currentUser)

  // ── Theme ──────────────────────────────────────────────────
  const toggleDark = useCallback(() => {
    setDark(d => {
      document.documentElement.classList.toggle('dark', !d)
      return !d
    })
  }, [])

  // ── Toasts ────────────────────────────────────────────────
  const showToast = useCallback((message, type = 'success', icon = '🌸') => {
    const id = Date.now()
    setToasts(t => [...t, { id, message, type, icon }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(t => t.filter(x => x.id !== id))
  }, [])

  // ── Modal ─────────────────────────────────────────────────
  const openModal  = useCallback((type, data = null) => setModal({ open: true,  type, data }), [])
  const closeModal = useCallback(()                   => setModal({ open: false, type: null, data: null }), [])

  // ── Orders ────────────────────────────────────────────────
  const addOrder = useCallback((order) => {
    setOrders(prev => [order, ...prev])
    showToast(`Pedido ${order.id} creado exitosamente`, 'success', '🌸')
  }, [showToast])

  const updateOrderStatus = useCallback((id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
    showToast(`Estado actualizado a "${status}"`, 'success', '✅')
  }, [showToast])

  const editOrder = useCallback((id, updates) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o))
    showToast('Pedido actualizado', 'success', '✅')
  }, [showToast])

  const deleteOrder = useCallback((id) => {
    setOrders(prev => prev.filter(o => o.id !== id))
    showToast('Pedido eliminado', 'error', '🗑️')
  }, [showToast])

  const login = useCallback(({ email, password, remember, captchaToken }) => {
    const now = Date.now()
    if (lockUntil && lockUntil > now) {
      const remaining = Math.ceil((lockUntil - now) / 60000)
      return { success: false, message: `Cuenta bloqueada. Intenta de nuevo en ${remaining} min.` }
    }

    if (!email) return { success: false, field: 'email', message: 'El correo es obligatorio' }
    if (!password) return { success: false, field: 'password', message: 'La contraseña es obligatoria' }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) return { success: false, field: 'email', message: 'Formato de correo inválido' }

    const user = AUTH_USERS.find((item) => item.email.toLowerCase() === email.toLowerCase())
    if (!user || user.password !== password) {
      const failedAttempts = loginAttempts + 1
      setLoginAttempts(failedAttempts)
      if (failedAttempts >= 5) {
        setLockUntil(now + 15 * 60 * 1000)
        setCaptchaRequired(true)
        return { success: false, message: 'Has alcanzado el límite de intentos. Intenta nuevamente en 15 minutos.' }
      }
      if (failedAttempts >= 3) setCaptchaRequired(true)
      return { success: false, message: 'Usuario o contraseña incorrectos' }
    }

    if (user.status === 'inactive') {
      return { success: false, message: 'Tu cuenta está desactivada. Contacta al administrador' }
    }

    if (captchaRequired && !captchaToken) {
      return { success: false, message: 'Completa la verificación de seguridad' }
    }

    setCurrentUser({ id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, status: user.status })
    setLoginAttempts(0)
    setLockUntil(null)
    setCaptchaRequired(false)
    setRememberedEmail(remember ? email : '')

    return { success: true, role: user.role }
  }, [loginAttempts, lockUntil, captchaRequired, setRememberedEmail])

  const logout = useCallback(() => {
    setCurrentUser(null)
    showToast('Sesión cerrada', 'secondary', '👋')
  }, [showToast])

  const updateDelivery = useCallback((id, updates) => {
    setDeliveries(prev => prev.map(d => {
      if (d.id !== id) return d
      return { ...d, ...updates }
    }))
  }, [])

  const addDeliveryNotification = useCallback((message) => {
    const id = Date.now()
    setNotifications(prev => [
      { id, type: 'delivery', title: message, desc: message, time: 'Ahora', read: false },
      ...prev,
    ])
  }, [])

  // ── Notifications ─────────────────────────────────────────
  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const markNotificationRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }, [])

  const deleteNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <AppContext.Provider value={{
      // UI
      sidebarOpen, setSidebarOpen,
      dark, toggleDark,
      activeRoute, setActiveRoute,
      // Modal
      modal, openModal, closeModal,
      // Toasts
      toasts, showToast, removeToast,
      // Data
      user,
      isAuthenticated,
      login, logout, rememberedEmail, loginAttempts, captchaRequired,
      orders, addOrder, updateOrderStatus, editOrder, deleteOrder,
      deliveries, updateDelivery, addDeliveryNotification,
      notifications, markAllRead, markNotificationRead, deleteNotification, unreadCount,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp debe usarse dentro de AppProvider')
  return ctx
}