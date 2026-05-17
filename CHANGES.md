# Cambios Realizados en el Frontend — Alesli ERP/CRM

## 1. Registro con Selección de Rol
**Archivo:** `apps/web/src/pages/Auth.jsx`

- Se agregó un selector visual de 3 roles durante el registro: **Administrador**, **Encargado**, **Cliente**
- Cada rol muestra un ícono y descripción:
  - **Administrador** (`admin`): Control total del sistema
  - **Encargado** (`encargad@`): Gestión de pedidos y entregas
  - **Cliente** (`cliente`): Compra y acumula puntos
- El rol seleccionado se envía al backend en `POST /api/usuarios/`
- Diseño responsive con tarjetas seleccionables (efecto scale + border highlight)

## 2. Nueva Arquitectura de Servicios API
**Creados en `apps/web/src/services/`:**

| Archivo | Endpoints que consume |
|---------|----------------------|
| `productos.js` | CRUD de productos y categorías |
| `pedidos.js` | CRUD de pedidos + detalles |
| `clientes.js` | CRUD de clientes + puntos + interacciones + notificaciones |
| `proveedores.js` | CRUD de proveedores |
| `notificaciones.js` | Notificaciones, no leídas, marcar leídas |
| `reportes.js` | Transacciones, campañas, cupones, entregas, materiales |

- `api.js` mejorado con **token refresh automático** (interceptor que reintenta con refresh token si 401)

## 3. Contexto Mejorado (`AppContext.jsx`)
**Archivo:** `apps/web/src/context/AppContext.jsx`

- Nuevos campos derivados del usuario:
  - `roleLabel` → "Administrador", "Encargado", "Cliente"
  - `roleBadge` → color correspondiente (purple, blue, green)
  - `isAdmin`, `isEncargado`, `isCliente` → booleanos para renderizado condicional
- Nuevos estados: `notifications`, `stats`

## 4. Dashboard por Rol
**Archivo:** `apps/web/src/pages/Dashboard.jsx`

### Si no ha iniciado sesión:
- Pantalla de bienvenida con botones de "Iniciar Sesión" y "Registrarse"

### Administrador:
- 4 tarjetas KPI: Usuarios, Pedidos, Ingresos, Productos
- Tabla de pedidos recientes con estado, cliente, total
- Accesos rápidos: Nuevo Usuario, Gestionar Pedidos, Catálogo, Reportes
- Alertas del sistema

### Encargado:
- KPIs: Pedidos Pendientes, En Camino, Completados Hoy
- Lista de pedidos por atender con estados visuales

### Cliente:
- KPIs: Mis Pedidos, Puntos Acumulados, Beneficios
- Accesos rápidos: Catálogo, Pedidos, Perfil, Beneficios, Fechas
- Resumen de actividad reciente

## 5. Panel de Administración
**Archivo:** `apps/web/src/pages/AdminDashboard.jsx` (NUEVO)

- 4 pestañas navegables: **Resumen**, **Productos**, **Pedidos**, **Usuarios**
- CRUD completo de productos (crear, editar, eliminar) con modal
- Tablas de pedidos y clientes con datos desde el backend
- Vista de proveedores
- Estados de carga (loading skeleton)

## 6. Navbar por Rol
**Archivo:** `apps/web/src/components/layouts/Navbar.jsx`

- Navegación se adapta según el rol:
  - **Admin**: Dashboard, Pedidos, Catálogo, Admin (destacado en púrpura)
  - **Encargado**: Dashboard, Pedidos, Catálogo
  - **Cliente**: Dashboard, Tienda (dropdown), Ocasiones
- Menú de usuario muestra el rol como badge
- Sin carrito para admin/encargado (solo visible para clientes)
- Sin dropdown de tienda para admin/encargado
- Diseño más limpio y profesional (altura 72px, bordes sutiles)

## 7. Perfil Integrado con Contexto
**Archivo:** `apps/web/src/pages/Profile.jsx`

- Ahora obtiene los datos del usuario desde `AppContext` en lugar de mock data
- Sincroniza nombre, email y teléfono con el backend
- Redirecciona al login si no hay sesión activa

## 8. Router Actualizado
**Archivo:** `apps/web/src/App.jsx`

- Nueva ruta: `/admin/dashboard` → Panel de Administración completo
- Carga directa sin `TempPage`

## 9. main.jsx Simplificado
**Archivo:** `apps/web/src/main.jsx`

- Eliminado el `AppProvider` redundante (ya está dentro de `App.jsx`)

---

*(cambios anteriores fueron migrados de `web-app/front/` a `apps/web/`)*

## 10. Rediseño Visual Completo + Placeholders JPG
**Commit:** `cbed6e1a`

- Rediseño visual completo de todos los componentes del frontend
- Imágenes placeholder JPG agregadas para carrusel, ocasiones y productos
- Nuevos assets gráficos: `fondo_login.jpg`, `header_logo.jpg`, `layout_logo.jpg`
- Mejoras en `Navbar`, `Sidebar`, `Footer`, `ProductCard`, `ReviewCard`, `RewardCard`
- Actualización de estilos globales (`index.css` + `globals.css`)
- Componentes UI mejorados: `Badge`, `Button`, `Carousel`, `Filter`, `Input`, `Modal`

## 11. Migración Completa de Mock Data a API Real
**Commit:** `0c782682`

- Eliminación de datos mock, reemplazo con llamadas reales al backend Django
- Catálogo dinámico con categorías obtenidas desde la base de datos
- Servicios API creados: `productos.js`, `pedidos.js`, `clientes.js`, `proveedores.js`, `notificaciones.js`, `reportes.js`
- Interceptor de token refresh automático en `api.js`
- `AppContext` mejorado con `roleLabel`, `roleBadge`, `isAdmin`, `isEncargado`, `isCliente`
- Dashboard adaptativo por rol (admin, encargado, cliente)
- Registro con selección de rol visual (admin, encargado, cliente)

## 12. Panel de Administración Integrado con Datos Reales
**Commit:** `b997e71e`

- Diseño `alesli-dashboard` integrado como panel admin principal
- Nuevas páginas admin: `Catalogo.jsx`, `Configuraciones.jsx`, `Dashboard.jsx`, `Delivery.jsx`, `Entregas.jsx`, `Finanzas.jsx`, `Inventario.jsx`, `Marketing.jsx`, `Notificaciones.jsx`, `Pedidos.jsx`, `Productos.jsx`
- Componentes de layout admin: `AdminLayout.jsx`, `AdminSideBar.jsx`, `AdminTopNav.jsx`
- Servicio `admin/dashboard.js` para métricas del panel
- Ruta protegida (`ProtectedRoute.jsx`) para secciones admin

## 13. Integración Backend-Frontend, Modo Oscuro y Delivery
**Commit:** `53e1d1c2`

- Integración completa entre backend Django y frontend React
- **Modo oscuro** implementado con clase `.dark` en Tailwind v4
- Rediseño completo del dashboard principal
- Módulo **Delivery** agregado al panel admin
- Página `ClienteDashboard.jsx` dedicada para clientes
- Mejoras en `Cart.jsx`, `Checkout.jsx`, `CatalogPages.jsx`
- Actualización de `constants.js` y `vite.config.js`

## 14. Base de Datos Completa + Ayuda Expo
**Commit:** `2f3013e1`

- Base de datos PostgreSQL completa con todos los módulos operativos
- Script SQL de setup en `apps/api/sql/setup_database.sql`
- Archivo `AYUDA_EXPO` agregado para soporte de Expo
- Toda la estructura de datos finalizada: usuarios, productos, pedidos, categorías, proveedores, materiales, puntos, interacciones CRM, notificaciones

---

## Resumen de Archivos Modificados/Creados (Acumulado)

| Archivo | Tipo |
|---------|------|
| `apps/web/src/pages/Auth.jsx` | Modificado |
| `apps/web/src/pages/Dashboard.jsx` | Modificado |
| `apps/web/src/pages/Profile.jsx` | Modificado |
| `apps/web/src/pages/AdminDashboard.jsx` | Nuevo → reemplazado |
| `apps/web/src/pages/ClienteDashboard.jsx` | **NUEVO** |
| `apps/web/src/pages/admin/Catalogo.jsx` | **NUEVO** |
| `apps/web/src/pages/admin/Configuraciones.jsx` | **NUEVO** |
| `apps/web/src/pages/admin/Dashboard.jsx` | **NUEVO** |
| `apps/web/src/pages/admin/Delivery.jsx` | **NUEVO** |
| `apps/web/src/pages/admin/Entregas.jsx` | **NUEVO** |
| `apps/web/src/pages/admin/Finanzas.jsx` | **NUEVO** |
| `apps/web/src/pages/admin/Inventario.jsx` | **NUEVO** |
| `apps/web/src/pages/admin/Marketing.jsx` | **NUEVO** |
| `apps/web/src/pages/admin/Notificaciones.jsx` | **NUEVO** |
| `apps/web/src/pages/admin/Pedidos.jsx` | **NUEVO** |
| `apps/web/src/pages/admin/Productos.jsx` | **NUEVO** |
| `apps/web/src/components/admin/AdminLayout.jsx` | **NUEVO** |
| `apps/web/src/components/admin/AdminSideBar.jsx` | **NUEVO** |
| `apps/web/src/components/admin/AdminTopNav.jsx` | **NUEVO** |
| `apps/web/src/components/shared/ProtectedRoute.jsx` | **NUEVO** |
| `apps/web/src/context/AppContext.jsx` | Modificado |
| `apps/web/src/components/layouts/Navbar.jsx` | Modificado |
| `apps/web/src/services/api.js` | Modificado |
| `apps/web/src/services/productos.js` | **NUEVO** |
| `apps/web/src/services/pedidos.js` | **NUEVO** |
| `apps/web/src/services/clientes.js` | **NUEVO** |
| `apps/web/src/services/proveedores.js` | **NUEVO** |
| `apps/web/src/services/notificaciones.js` | **NUEVO** |
| `apps/web/src/services/reportes.js` | **NUEVO** |
| `apps/web/src/services/admin/dashboard.js` | **NUEVO** |
| `apps/web/src/App.jsx` | Modificado |
| `apps/web/src/main.jsx` | Modificado |
| `apps/web/src/index.css` | Modificado |
| `apps/web/src/styles/globals.css` | Nuevo |
| `apps/web/src/utils/constants.js` | Modificado |
| `apps/web/vite.config.js` | Modificado |
| `CHANGES.md` | **NUEVO** |

---

## Para Probar

1. Iniciar backend: `cd apps/api && .\venv\Scripts\activate && python manage.py runserver`
2. Iniciar frontend: `cd apps/web && npm run dev`
3. Ir a `http://localhost:5173/login`
4. Registrarse seleccionando un rol
5. Ver el Dashboard adaptado según el rol seleccionado
