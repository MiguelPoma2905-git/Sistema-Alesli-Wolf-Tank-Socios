-- ============================================================
-- top_1.sql
-- Script completo de la base de datos alesli_db
-- Incluye las 17 tablas de negocio + tablas del sistema Django
-- con TODOS los cambios aplicados (migraciones, reparaciones,
-- normalización de roles, campos agregados, etc.)
-- ============================================================

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';
SET default_table_access_method = heap;

-- ============================================================
-- 1. TABLAS DE NEGOCIO
-- ============================================================

-- 1.1 Usuarios (con campos Django AbstractUser incorporados)
CREATE TABLE IF NOT EXISTS public.usuarios (
    id_usuario integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    password varchar(128) NOT NULL DEFAULT '',
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL DEFAULT false,
    username varchar(150) NOT NULL UNIQUE,
    first_name varchar(150) NOT NULL DEFAULT '',
    last_name varchar(150) NOT NULL DEFAULT '',
    is_staff boolean NOT NULL DEFAULT false,
    is_active boolean NOT NULL DEFAULT true,
    date_joined timestamp with time zone NOT NULL DEFAULT now(),
    nombre varchar(100) NOT NULL,
    email varchar(254) NOT NULL UNIQUE,
    rol varchar(50) NOT NULL CHECK (rol IN ('admin', 'encargad@', 'cliente')),
    telefono varchar(20),
    activo boolean DEFAULT true
);

-- 1.2 Clientes
CREATE TABLE IF NOT EXISTS public.clientes (
    id_cliente integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre varchar(100) NOT NULL,
    telefono varchar(20) NOT NULL UNIQUE,
    email varchar(100),
    direccion text,
    fecha_nacimiento date,
    tipo_cliente varchar(50) DEFAULT 'Regular' CHECK (tipo_cliente IN ('Regular', 'Premium', 'VIP')),
    fecha_registro timestamp DEFAULT CURRENT_TIMESTAMP,
    activo boolean DEFAULT true
);

-- 1.3 Categorías
CREATE TABLE IF NOT EXISTS public.categorias (
    id_categoria integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre varchar(100) NOT NULL UNIQUE,
    descripcion text
);

-- 1.4 Proveedores
CREATE TABLE IF NOT EXISTS public.proveedores (
    id_proveedor integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre_empresa varchar(150) NOT NULL,
    contacto varchar(100),
    telefono varchar(20),
    activo boolean DEFAULT true
);

-- 1.5 Materiales
CREATE TABLE IF NOT EXISTS public.materiales (
    id_material integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_proveedor integer REFERENCES public.proveedores(id_proveedor) ON DELETE SET NULL,
    nombre varchar(100) NOT NULL,
    unidad_medida varchar(20) NOT NULL,
    stock_actual integer DEFAULT 0,
    stock_minimo integer DEFAULT 5,
    costo_unitario numeric(10,2)
);

-- 1.6 Productos (con cambios: codigo max 50, imagen_url text, stock, imagen)
CREATE TABLE IF NOT EXISTS public.productos (
    id_producto integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_categoria integer REFERENCES public.categorias(id_categoria) ON DELETE SET NULL,
    codigo varchar(50) NOT NULL UNIQUE,
    nombre varchar(150) NOT NULL,
    descripcion text,
    precio_venta numeric(10,2) NOT NULL,
    costo_estimado numeric(10,2),
    imagen_url text,
    activo boolean DEFAULT true,
    stock integer DEFAULT 0,
    imagen varchar(100)
);

-- 1.7 Composición de Productos
CREATE TABLE IF NOT EXISTS public.composicion_producto (
    id_composicion integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_producto integer NOT NULL REFERENCES public.productos(id_producto) ON DELETE CASCADE,
    id_material integer NOT NULL REFERENCES public.materiales(id_material) ON DELETE CASCADE,
    cantidad_requerida numeric(10,2) NOT NULL
);

-- 1.8 Campañas Marketing
CREATE TABLE IF NOT EXISTS public.campañas_marketing (
    id_campania integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre varchar(150) NOT NULL,
    fecha_inicio date,
    fecha_fin date,
    presupuesto numeric(10,2),
    descripcion text,
    estado varchar(50) DEFAULT 'Activa' CHECK (estado IN ('Activa', 'Finalizada', 'Cancelada'))
);

-- 1.9 Cupones
CREATE TABLE IF NOT EXISTS public.cupones (
    id_cupon integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_cliente integer REFERENCES public.clientes(id_cliente) ON DELETE SET NULL,
    id_campania integer REFERENCES public.campañas_marketing(id_campania) ON DELETE SET NULL,
    codigo varchar(50) NOT NULL UNIQUE,
    tipo varchar(50) NOT NULL CHECK (tipo IN ('Porcentaje', 'Monto Fijo')),
    valor numeric(10,2) NOT NULL,
    puntos_requeridos integer,
    estado varchar(50) DEFAULT 'Activo' CHECK (estado IN ('Activo', 'Usado', 'Expirado')),
    fecha_creacion timestamp DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion date
);

-- 1.10 Pedidos (id_cliente nullable = SET_NULL)
CREATE TABLE IF NOT EXISTS public.pedidos (
    id_pedido integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_cliente integer REFERENCES public.clientes(id_cliente) ON DELETE SET NULL,
    id_usuario_asignado integer REFERENCES public.usuarios(id_usuario) ON DELETE SET NULL,
    id_cupon_aplicado integer REFERENCES public.cupones(id_cupon) ON DELETE SET NULL,
    fecha_pedido timestamp DEFAULT CURRENT_TIMESTAMP,
    fecha_entrega date NOT NULL,
    hora_entrega time,
    direccion_entrega text,
    estado varchar(50) DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'En preparación', 'Listo', 'En camino', 'Entregado', 'Cancelado')),
    total_original numeric(10,2),
    total_final numeric(10,2),
    nota_entrega text
);

-- 1.11 Detalle Pedido
CREATE TABLE IF NOT EXISTS public.detalle_pedido (
    id_detalle integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_pedido integer NOT NULL REFERENCES public.pedidos(id_pedido) ON DELETE CASCADE,
    id_producto integer NOT NULL REFERENCES public.productos(id_producto) ON DELETE RESTRICT,
    cantidad integer NOT NULL,
    precio_unitario numeric(10,2) NOT NULL
);

-- 1.12 Entregas Logística
CREATE TABLE IF NOT EXISTS public.entregas_logistica (
    id_entrega integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_pedido integer UNIQUE NOT NULL REFERENCES public.pedidos(id_pedido) ON DELETE CASCADE,
    id_delivery integer REFERENCES public.usuarios(id_usuario) ON DELETE SET NULL,
    estado_entrega varchar(50) DEFAULT 'Asignado' CHECK (estado_entrega IN ('Asignado', 'En Ruta', 'Entregado', 'Fallido')),
    fecha_entrega_real timestamp,
    foto_evidencia_url varchar(255)
);

-- 1.13 Transacciones Financieras
CREATE TABLE IF NOT EXISTS public.transacciones_financieras (
    id_transaccion integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_pedido integer REFERENCES public.pedidos(id_pedido) ON DELETE SET NULL,
    id_cliente integer REFERENCES public.clientes(id_cliente) ON DELETE SET NULL,
    tipo varchar(50) NOT NULL CHECK (tipo IN ('Ingreso', 'Egreso')),
    metodo_pago varchar(50) NOT NULL CHECK (metodo_pago IN ('Efectivo', 'QR', 'Transferencia', 'Tarjeta', 'Billetera Móvil')),
    monto numeric(10,2) NOT NULL,
    fecha timestamp DEFAULT CURRENT_TIMESTAMP,
    descripcion text
);

-- 1.14 Puntos Cliente
CREATE TABLE IF NOT EXISTS public.puntos_cliente (
    id_puntos integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_cliente integer NOT NULL UNIQUE REFERENCES public.clientes(id_cliente) ON DELETE CASCADE,
    saldo integer DEFAULT 0,
    puntos_totales_ganados integer DEFAULT 0,
    fecha_actualizacion timestamp DEFAULT CURRENT_TIMESTAMP
);

-- 1.15 Transacciones Puntos
CREATE TABLE IF NOT EXISTS public.transacciones_puntos (
    id_transaccion_puntos integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_cliente integer NOT NULL REFERENCES public.clientes(id_cliente) ON DELETE CASCADE,
    id_pedido integer REFERENCES public.pedidos(id_pedido) ON DELETE SET NULL,
    tipo varchar(50) NOT NULL CHECK (tipo IN ('Ganancia', 'Canje')),
    cantidad integer NOT NULL,
    fecha timestamp DEFAULT CURRENT_TIMESTAMP,
    descripcion varchar(255)
);

-- 1.16 Interacciones CRM
CREATE TABLE IF NOT EXISTS public.interacciones_crm (
    id_interaccion integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_cliente integer NOT NULL REFERENCES public.clientes(id_cliente) ON DELETE CASCADE,
    id_usuario integer REFERENCES public.usuarios(id_usuario) ON DELETE SET NULL,
    canal varchar(50) NOT NULL CHECK (canal IN ('WhatsApp', 'Llamada', 'Correo', 'Presencial')),
    resumen text NOT NULL,
    fecha_contacto timestamp DEFAULT CURRENT_TIMESTAMP
);

-- 1.17 Notificaciones
CREATE TABLE IF NOT EXISTS public.notificaciones (
    id_notificacion integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_cliente integer REFERENCES public.clientes(id_cliente) ON DELETE CASCADE,
    id_usuario_origen integer REFERENCES public.usuarios(id_usuario) ON DELETE SET NULL,
    titulo varchar(100),
    mensaje text NOT NULL,
    tipo varchar(50) NOT NULL CHECK (tipo IN ('Pedido', 'Promocion', 'Recordatorio', 'Puntos')),
    leido boolean DEFAULT false,
    fecha_envio timestamp DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 2. TABLAS DEL SISTEMA DJANGO
-- ============================================================

-- 2.1 django_migrations
CREATE TABLE IF NOT EXISTS public.django_migrations (
    id integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    app varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);

-- 2.2 django_content_type
CREATE TABLE IF NOT EXISTS public.django_content_type (
    id integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    app_label varchar(100) NOT NULL,
    model varchar(100) NOT NULL,
    UNIQUE (app_label, model)
);

-- 2.3 auth_permission
CREATE TABLE IF NOT EXISTS public.auth_permission (
    id integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    content_type_id integer NOT NULL REFERENCES public.django_content_type(id) ON DELETE CASCADE,
    codename varchar(100) NOT NULL,
    name varchar(255) NOT NULL,
    UNIQUE (content_type_id, codename)
);

-- 2.4 auth_group
CREATE TABLE IF NOT EXISTS public.auth_group (
    id integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(150) NOT NULL UNIQUE
);

-- 2.5 auth_group_permissions
CREATE TABLE IF NOT EXISTS public.auth_group_permissions (
    id integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    group_id integer NOT NULL REFERENCES public.auth_group(id) ON DELETE CASCADE,
    permission_id integer NOT NULL REFERENCES public.auth_permission(id) ON DELETE CASCADE,
    UNIQUE (group_id, permission_id)
);

-- 2.6 usuarios_groups (M2M Usuario <-> Group)
CREATE TABLE IF NOT EXISTS public.usuarios_groups (
    id integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    usuario_id integer NOT NULL REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE,
    group_id integer NOT NULL REFERENCES public.auth_group(id) ON DELETE CASCADE,
    UNIQUE (usuario_id, group_id)
);

-- 2.7 usuarios_user_permissions (M2M Usuario <-> Permission)
CREATE TABLE IF NOT EXISTS public.usuarios_user_permissions (
    id integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    usuario_id integer NOT NULL REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE,
    permission_id integer NOT NULL REFERENCES public.auth_permission(id) ON DELETE CASCADE,
    UNIQUE (usuario_id, permission_id)
);

-- 2.8 django_admin_log
CREATE TABLE IF NOT EXISTS public.django_admin_log (
    id integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr varchar(200) NOT NULL,
    change_message text NOT NULL,
    content_type_id integer REFERENCES public.django_content_type(id) ON DELETE SET NULL,
    user_id integer NOT NULL REFERENCES public.usuarios(id_usuario) ON DELETE CASCADE,
    action_flag smallint NOT NULL CHECK (action_flag IN (1, 2, 3))
);

-- 2.9 django_session
CREATE TABLE IF NOT EXISTS public.django_session (
    session_key varchar(40) NOT NULL PRIMARY KEY,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);

CREATE INDEX IF NOT EXISTS django_session_expire_date_idx ON public.django_session (expire_date);

-- ============================================================
-- 3. REGISTRO DE MIGRACIONES (para que Django las saltee)
-- ============================================================
INSERT INTO public.django_migrations (app, name, applied) VALUES
('contenttypes', '0001_initial', now()),
('contenttypes', '0002_remove_content_type_name', now()),
('auth', '0001_initial', now()),
('auth', '0002_alter_permission_name_max_length', now()),
('auth', '0003_alter_user_email_max_length', now()),
('auth', '0004_alter_user_username_opts', now()),
('auth', '0005_alter_user_last_login_null', now()),
('auth', '0006_require_contenttypes_0002', now()),
('auth', '0007_alter_validators_add_error_messages', now()),
('auth', '0008_alter_user_username_max_length', now()),
('auth', '0009_alter_user_last_name_max_length', now()),
('auth', '0010_alter_group_name_max_length', now()),
('auth', '0011_update_proxy_permissions', now()),
('auth', '0012_alter_user_first_name_max_length', now()),
('usuarios', '0001_initial', now()),
('usuarios', '0002_alter_usuario_rol', now()),
('operaciones', '0001_initial', now()),
('operaciones', '0002_initial', now()),
('operaciones', '0003_alter_producto_codigo_alter_producto_imagen_url', now()),
('operaciones', '0004_add_stock_to_producto', now()),
('operaciones', '0005_producto_imagen', now()),
('admin', '0001_initial', now()),
('admin', '0002_logentry_remove_auto_add', now()),
('admin', '0003_logentry_add_action_flag_choices', now()),
('sessions', '0001_initial', now());

-- ============================================================
-- 4. NORMALIZACIÓN DE ROLES
-- ============================================================
UPDATE public.usuarios SET rol = 'encargado' WHERE LOWER(rol) LIKE '%encargad%';
UPDATE public.usuarios SET rol = 'admin' WHERE LOWER(rol) LIKE '%admin%' OR LOWER(rol) LIKE '%administrador%';
UPDATE public.usuarios SET rol = 'cliente' WHERE LOWER(rol) LIKE '%client%' OR rol IS NULL OR rol = '';

-- ============================================================
-- FIN DEL SCRIPT
-- ============================================================
