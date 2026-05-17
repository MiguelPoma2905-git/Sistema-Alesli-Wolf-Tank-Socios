import { Navigate, useLocation } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export default function ProtectedRoute({ children, roles }) {
  const { isAuth, isAdmin, isEncargado, isCliente } = useApp()
  const location = useLocation()

  if (!isAuth) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />
  }

  if (roles && roles.length > 0) {
    const roleMap = { admin: isAdmin, 'encargad@': isEncargado, cliente: isCliente }
    const allowed = roles.some(r => roleMap[r])
    if (!allowed) {
      return <Navigate to="/" replace />
    }
  }

  return children
}
