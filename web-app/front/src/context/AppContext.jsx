import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { getProfile } from '../services/auth'

const AppContext = createContext(null)

const ROLE_LABELS = {
  admin: 'Administrador',
  'encargad@': 'Encargado',
  cliente: 'Cliente',
}

const ROLE_BADGES = {
  admin: 'bg-purple-500',
  'encargad@': 'bg-blue-500',
  cliente: 'bg-green-500',
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      getProfile()
        .then(userData => {
          setUser(userData)
          setIsAuth(true)
        })
        .catch(() => {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
        })
    }
  }, [])

  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark'
    }
    return false
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  const toggleDark = useCallback(() => {
    setDark(prev => !prev)
  }, [])

  const roleLabel = user ? (ROLE_LABELS[user.rol] || user.rol) : ''
  const roleBadge = user ? (ROLE_BADGES[user.rol] || 'bg-gray-500') : ''
  const isAdmin = user?.rol === 'admin'
  const isEncargado = user?.rol === 'encargad@'
  const isCliente = user?.rol === 'cliente'

  const [favorites, setFavorites] = useState([])

  const toggleFav = useCallback((id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }, [])

  const isFav = useCallback((id) => favorites.includes(id), [favorites])

  const [cart, setCart] = useState([])

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }, [])

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) { removeFromCart(id); return }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }, [])

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartCount = cart.reduce((a, i) => a + i.qty, 0)
  const cartTotal = cart.reduce((a, i) => a + i.price * i.qty, 0)

  return (
    <AppContext.Provider value={{
      user, setUser, isAuth, setIsAuth,
      roleLabel, roleBadge, isAdmin, isEncargado, isCliente,
      dark, toggleDark,
      notifications, setNotifications,
      stats, setStats,
      cart, addToCart, updateQty, removeFromCart, clearCart, cartCount, cartTotal,
      favorites, toggleFav, isFav,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
