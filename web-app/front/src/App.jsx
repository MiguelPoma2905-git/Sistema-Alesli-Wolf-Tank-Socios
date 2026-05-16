import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { ToastProvider } from './context/ToastContext'

import Layout from './components/layouts/Layout'

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
import AdminDashboard from './pages/AdminDashboard'

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
              <Route path="carrito" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order-confirmation" element={<OrderConfirmation />} />
              <Route path="pedidos" element={<Orders />} />
              <Route path="pedido/:id" element={<OrderDetail />} />
              <Route path="perfil" element={<Profile />} />
              <Route path="fechas" element={<SpecialDates />} />
              <Route path="recompensas" element={<Rewards />} />
              <Route path="personalizar" element={<CustomGift />} />
              <Route path="admin/dashboard" element={<AdminDashboard />} />
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
