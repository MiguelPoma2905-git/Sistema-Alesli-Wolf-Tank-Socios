import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { ToastProvider } from './context/ToastContext'

import Layout from './components/layouts/Layout'
import ProtectedRoute from './components/shared/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'

import Dashboard from './pages/Dashboard'
import { Flores, DetalleProducto, Regalos, Peluches, Chocolate, Ocasiones } from './pages/CatalogPages'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import Auth from './pages/Auth'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import Profile from './pages/Profile'
import SpecialDates from './pages/SpecialDates'
import Rewards from './pages/Rewards'
import CustomGift from './pages/CustomGift'

import AdminDashboard from './pages/admin/Dashboard'
import AdminProductos from './pages/admin/Productos'
import AdminInventario from './pages/admin/Inventario'
import AdminPedidos from './pages/admin/Pedidos'
import AdminEntregas from './pages/admin/Entregas'
import AdminFinanzas from './pages/admin/Finanzas'
import AdminMarketing from './pages/admin/Marketing'
import AdminNotificaciones from './pages/admin/Notificaciones'
import AdminConfiguracion from './pages/admin/Configuraciones'

export default function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Auth />} />

            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="flores" element={<Flores />} />
              <Route path="flores/:id" element={<DetalleProducto />} />
              <Route path="regalos" element={<Regalos />} />
              <Route path="peluches" element={<Peluches />} />
              <Route path="chocolates" element={<Chocolate />} />
              <Route path="ocasiones" element={<Ocasiones />} />

              <Route path="carrito" element={<ProtectedRoute roles={['cliente']}><Cart /></ProtectedRoute>} />
              <Route path="checkout" element={<ProtectedRoute roles={['cliente']}><Checkout /></ProtectedRoute>} />
              <Route path="order-confirmation" element={<ProtectedRoute roles={['cliente']}><OrderConfirmation /></ProtectedRoute>} />

              <Route path="pedidos" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="pedido/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
              <Route path="perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="fechas" element={<ProtectedRoute roles={['cliente']}><SpecialDates /></ProtectedRoute>} />
              <Route path="recompensas" element={<ProtectedRoute roles={['cliente']}><Rewards /></ProtectedRoute>} />
              <Route path="personalizar" element={<ProtectedRoute><CustomGift /></ProtectedRoute>} />
              <Route path="*" element={
                <div className="py-20 text-center transition-colors duration-500">
                  <h1 className="text-[40px] font-black text-primary">404</h1>
                  <p className="text-text-muted font-bold mt-2 transition-colors duration-500">La página que buscas no existe.</p>
                </div>
              } />
            </Route>

            <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="productos" element={<AdminProductos />} />
              <Route path="productos/:id" element={<AdminProductos />} />
              <Route path="inventario" element={<AdminInventario />} />
              <Route path="pedidos" element={<AdminPedidos />} />
              <Route path="entregas" element={<AdminEntregas />} />
              <Route path="finanzas" element={<AdminFinanzas />} />
              <Route path="marketing" element={<AdminMarketing />} />
              <Route path="notificaciones" element={<AdminNotificaciones />} />
              <Route path="configuracion" element={<AdminConfiguracion />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AppProvider>
  )
}
