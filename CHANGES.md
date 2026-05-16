# Cambios Realizados en el Frontend — Alesli ERP/CRM

## 1. Registro con Selección de Rol
**Archivo:** `web-app/front/src/pages/Auth.jsx`

- Se agregó un selector visual de 3 roles durante el registro: **Administrador**, **Encargado**, **Cliente**
- Cada rol muestra un ícono y descripción:
  - **Administrador** (`admin`): Control total del sistema
  - **Encargado** (`encargad@`): Gestión de pedidos y entregas
  - **Cliente** (`cliente`): Compra y acumula puntos
- El rol seleccionado se envía al backend en `POST /api/usuarios/`
- Diseño responsive con tarjetas seleccionables (efecto scale + border highlight)

## 2. Nueva Arquitectura de Servicios API
**Creados en `web-app/front/src/services/`:**

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
**Archivo:** `web-app/front/src/context/AppContext.jsx`

- Nuevos campos derivados del usuario:
  - `roleLabel` → "Administrador", "Encargado", "Cliente"
  - `roleBadge` → color correspondiente (purple, blue, green)
  - `isAdmin`, `isEncargado`, `isCliente` → booleanos para renderizado condicional
- Nuevos estados: `notifications`, `stats`

## 4. Dashboard por Rol
**Archivo:** `web-app/front/src/pages/Dashboard.jsx`

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
**Archivo:** `web-app/front/src/pages/AdminDashboard.jsx` (NUEVO)

- 4 pestañas navegables: **Resumen**, **Productos**, **Pedidos**, **Usuarios**
- CRUD completo de productos (crear, editar, eliminar) con modal
- Tablas de pedidos y clientes con datos desde el backend
- Vista de proveedores
- Estados de carga (loading skeleton)

## 6. Navbar por Rol
**Archivo:** `web-app/front/src/components/layouts/Navbar.jsx`

- Navegación se adapta según el rol:
  - **Admin**: Dashboard, Pedidos, Catálogo, Admin (destacado en púrpura)
  - **Encargado**: Dashboard, Pedidos, Catálogo
  - **Cliente**: Dashboard, Tienda (dropdown), Ocasiones
- Menú de usuario muestra el rol como badge
- Sin carrito para admin/encargado (solo visible para clientes)
- Sin dropdown de tienda para admin/encargado
- Diseño más limpio y profesional (altura 72px, bordes sutiles)

## 7. Perfil Integrado con Contexto
**Archivo:** `web-app/front/src/pages/Profile.jsx`

- Ahora obtiene los datos del usuario desde `AppContext` en lugar de mock data
- Sincroniza nombre, email y teléfono con el backend
- Redirecciona al login si no hay sesión activa

## 8. Router Actualizado
**Archivo:** `web-app/front/src/App.jsx`

- Nueva ruta: `/admin/dashboard` → Panel de Administración completo
- Carga directa sin `TempPage`

## 9. main.jsx Simplificado
**Archivo:** `web-app/front/src/main.jsx`

- Eliminado el `AppProvider` redundante (ya está dentro de `App.jsx`)

---

## Resumen de Archivos Modificados/Creados

| Archivo | Tipo |
|---------|------|
| `src/pages/Auth.jsx` | Modificado |
| `src/pages/Dashboard.jsx` | Modificado |
| `src/pages/Profile.jsx` | Modificado |
| `src/pages/AdminDashboard.jsx` | **NUEVO** |
| `src/context/AppContext.jsx` | Modificado |
| `src/components/layouts/Navbar.jsx` | Modificado |
| `src/services/api.js` | Modificado |
| `src/services/productos.js` | **NUEVO** |
| `src/services/pedidos.js` | **NUEVO** |
| `src/services/clientes.js` | **NUEVO** |
| `src/services/proveedores.js` | **NUEVO** |
| `src/services/notificaciones.js` | **NUEVO** |
| `src/services/reportes.js` | **NUEVO** |
| `src/App.jsx` | Modificado |
| `src/main.jsx` | Modificado |
| `CHANGES.md` | **NUEVO** |

---

## Para Probar

1. Iniciar backend: `cd backend && .\venv\Scripts\activate && python manage.py runserver`
2. Iniciar frontend: `cd web-app/front && npm run dev`
3. Ir a `http://localhost:5173/login`
4. Registrarse seleccionando un rol
5. Ver el Dashboard adaptado según el rol seleccionado
