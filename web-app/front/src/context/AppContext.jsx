import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { mockUser } from '../data/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // ─── Auth (mock) ──────────────────────────────────────────────
  const [user, setUser]   = useState(mockUser)
  const [isAuth, setIsAuth] = useState(true)

  // ─── Theme (MOTOR RECONSTRUIDO Y BLINDADO) ────────────────────
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark'
    }
    return false
  })

  // Sincronización absoluta con el DOM y almacenamiento local
  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark])

  const toggleDark = useCallback(() => {
    setDark(prev => !prev)
  }, [])

  // ─── Cart ─────────────────────────────────────────────────────
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

  // ─── Favorites ────────────────────────────────────────────────
  const [favorites, setFavorites] = useState([])

  const toggleFav = useCallback((id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }, [])

  const isFav = useCallback((id) => favorites.includes(id), [favorites])

  // ─── Context value ────────────────────────────────────────────
  return (
    <AppContext.Provider value={{
      user, setUser, isAuth, setIsAuth,
      dark, toggleDark,
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