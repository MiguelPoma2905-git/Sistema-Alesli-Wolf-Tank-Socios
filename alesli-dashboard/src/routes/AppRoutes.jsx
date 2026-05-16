import { Routes, Route } from 'react-router-dom'

import Layout from '../components/layout/Layout'

import Dashboard from '../pages/Dashboard'
import Finanzas from '../pages/Finanzas'

import Productos from '../pages/productos/Productos'
import ProductDetail from '../pages/productos/ProductDetail'
import Inventario from '../pages/productos/Inventario'
import Catalogo from '../pages/productos/Catalogo'
import CuidadoFlores from '../pages/productos/CuidadoFlores'

import Delivery from '../pages/operaciones/Delivery'
import Entregas from '../pages/operaciones/Entregas'
import PedidosClientes from '../pages/operaciones/PedidosClientes'
import PedidosProveedores from '../pages/operaciones/PedidosProveedores'

import Marketing from '../pages/crecimiento/Marketing'
import Campaigns from '../pages/crecimiento/Campaigns'

import Configuraciones from '../pages/perfil/Configuraciones'
import Notificaciones from '../pages/perfil/Notificaciones'
import Preferencias from '../pages/perfil/Preferencias'
import InicioSesion from '../pages/perfil/InicioSesion'

import { ROUTES } from '../utils/constants'

function AppRoutes() {
  return (
    <Routes>

      <Route path="/login" element={<InicioSesion />} />

      <Route element={<Layout />}>

        <Route
          path={ROUTES.DASHBOARD}
          element={<Dashboard />}
        />

        <Route
          path={ROUTES.FINANZAS}
          element={<Finanzas />}
        />

        <Route
          path={ROUTES.PRODUCTOS}
          element={<Productos />}
        />

        <Route
          path={ROUTES.PRODUCTO_DETALLE}
          element={<ProductDetail />}
        />

        <Route
          path={ROUTES.INVENTARIO}
          element={<Inventario />}
        />

        <Route
          path={ROUTES.CATALOGO}
          element={<Catalogo />}
        />

        <Route
          path={ROUTES.CUIDADO_FLORES}
          element={<CuidadoFlores />}
        />

        <Route
          path="/delivery"
          element={<Delivery />}
        />

        <Route
          path={ROUTES.ENTREGAS}
          element={<Entregas />}
        />

        <Route
          path={ROUTES.PEDIDOS_CLIENTES}
          element={<PedidosClientes />}
        />

        <Route
          path="/pedidos-prov"
          element={<PedidosProveedores />}
        />

        <Route
          path={ROUTES.MARKETING}
          element={<Marketing />}
        />

        <Route
          path={ROUTES.CAMPANIAS}
          element={<Campaigns />}
        />

        <Route
          path={ROUTES.CONFIGURACION}
          element={<Configuraciones />}
        />

        <Route
          path={ROUTES.NOTIFICACIONES}
          element={<Notificaciones />}
        />

        <Route
          path="/preferencias"
          element={<Preferencias />}
        />

      </Route>

    </Routes>
  )
}

export default AppRoutes