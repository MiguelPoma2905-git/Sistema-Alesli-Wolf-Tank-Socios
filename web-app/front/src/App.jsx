import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
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
import Profile from './pages/Profile'
import SpecialDates from './pages/SpecialDates'
import Rewards from './pages/Rewards'
import CustomGift from './pages/CustomGift'

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

export default function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              
              {/* RUTAS ACTIVAS Y BLINDADAS */}
              <Route index element={<Dashboard />} />
              <Route path="flores" element={<Flores />} />
              <Route path="flores/:id" element={<DetalleProducto />} />
              <Route path="regalos" element={<Regalos />} />
              <Route path="peluches" element={<Peluches />} />
              <Route path="chocolates" element={<Chocolate />} />
              <Route path="ocasiones" element={<Ocasiones />} />
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
              <Route path="*" element={
                <div className="py-20 text-center transition-colors duration-500">
                  <h1 className="text-[40px] font-black text-primary">404</h1>
                  <p className="text-text-muted font-bold mt-2 transition-colors duration-500">La página que buscas no existe.</p>
                </div>
              } />

            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AppProvider>
  )
}