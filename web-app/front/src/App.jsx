import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
<<<<<<< HEAD
import { ToastProvider } from './context/ToastContext' // <-- MOTOR DE NOTIFICACIONES

// Layouts
import Layout from './components/layouts/Layout'

// Páginas Principales
import Dashboard from './pages/Dashboard'
import { Flores, DetalleProducto, Regalos, Peluches, Chocolate, Ocasiones } from './pages/CatalogPages'
import Cart from './pages/Cart' 
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import Auth from './pages/Auth' 
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail' 
=======
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
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
import Profile from './pages/Profile'
import SpecialDates from './pages/SpecialDates'
import Rewards from './pages/Rewards'
import CustomGift from './pages/CustomGift'
<<<<<<< HEAD

// Componentes Temporales
const TempPage = ({ title }) => (
  <div className="flex-1 flex items-center justify-center py-20 animate-fade-in transition-colors duration-500">
    <div className="text-center">
      <span className="text-[60px] mb-4 block">🚧</span>
      <h1 className="text-[24px] font-black text-text-dark dark:text-white mb-2 transition-colors duration-500">Página en construcción</h1>
      <p className="text-text-muted transition-colors duration-500">La vista de <b>{title}</b> será construida en el siguiente paso.</p>
    </div>
  </div>
)
=======
import ClienteDashboard from './pages/ClienteDashboard'

import AdminDashboard from './pages/admin/Dashboard'
import AdminProductos from './pages/admin/Productos'
import AdminInventario from './pages/admin/Inventario'
import AdminPedidos from './pages/admin/Pedidos'
import AdminEntregas from './pages/admin/Entregas'
import AdminFinanzas from './pages/admin/Finanzas'
import AdminMarketing from './pages/admin/Marketing'
import AdminNotificaciones from './pages/admin/Notificaciones'
import AdminConfiguracion from './pages/admin/Configuraciones'
import AdminCatalogo from './pages/admin/Catalogo'
import AdminDelivery from './pages/admin/Delivery'
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9

export default function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
<<<<<<< HEAD
            <Route path="/" element={<Layout />}>
              
              {/* RUTAS ACTIVAS Y BLINDADAS */}
=======
            <Route path="/login" element={<Auth />} />

            <Route path="/" element={<Layout />}>
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
              <Route index element={<Dashboard />} />
              <Route path="flores" element={<Flores />} />
              <Route path="flores/:id" element={<DetalleProducto />} />
              <Route path="regalos" element={<Regalos />} />
              <Route path="peluches" element={<Peluches />} />
              <Route path="chocolates" element={<Chocolate />} />
              <Route path="ocasiones" element={<Ocasiones />} />
<<<<<<< HEAD
              <Route path="carrito" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order-confirmation" element={<OrderConfirmation />} />
              <Route path="pedidos" element={<Orders />} />
              <Route path="pedido/:id" element={<OrderDetail />} />
              <Route path="login" element={<Auth />} />
              <Route path="perfil" element={<Profile />} />
              <Route path="fechas" element={<SpecialDates />} />
              <Route path="recompensas" element={<Rewards />} />
              <Route path="personalizar" element={<CustomGift />} />

              {/* RUTAS PENDIENTES */}
              <Route path="admin/dashboard" element={<TempPage title="Panel Administrativo" />} />
              
              {/* RUTA 404 */}
=======

              <Route path="carrito" element={<ProtectedRoute roles={['cliente']}><Cart /></ProtectedRoute>} />
              <Route path="checkout" element={<ProtectedRoute roles={['cliente']}><Checkout /></ProtectedRoute>} />
              <Route path="order-confirmation" element={<ProtectedRoute roles={['cliente']}><OrderConfirmation /></ProtectedRoute>} />

              <Route path="pedidos" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="pedido/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
              <Route path="perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="fechas" element={<ProtectedRoute roles={['cliente']}><SpecialDates /></ProtectedRoute>} />
              <Route path="recompensas" element={<ProtectedRoute roles={['cliente']}><Rewards /></ProtectedRoute>} />
              <Route path="personalizar" element={<ProtectedRoute><CustomGift /></ProtectedRoute>} />
              <Route path="mi-cuenta" element={<ProtectedRoute roles={['cliente']}><ClienteDashboard /></ProtectedRoute>} />
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
              <Route path="*" element={
                <div className="py-20 text-center transition-colors duration-500">
                  <h1 className="text-[40px] font-black text-primary">404</h1>
                  <p className="text-text-muted font-bold mt-2 transition-colors duration-500">La página que buscas no existe.</p>
                </div>
              } />
<<<<<<< HEAD

=======
            </Route>

            <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="productos" element={<AdminProductos />} />
              <Route path="productos/:id" element={<AdminProductos />} />
              <Route path="inventario" element={<AdminInventario />} />
              <Route path="pedidos" element={<AdminPedidos />} />
              <Route path="entregas" element={<AdminEntregas />} />
              <Route path="delivery" element={<AdminDelivery />} />
              <Route path="finanzas" element={<AdminFinanzas />} />
              <Route path="marketing" element={<AdminMarketing />} />
              <Route path="notificaciones" element={<AdminNotificaciones />} />
              <Route path="catalogo" element={<AdminCatalogo />} />
              <Route path="configuracion" element={<AdminConfiguracion />} />
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AppProvider>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> 53e1d1c2008caf04649d50daafa4f47ac4009bb9
