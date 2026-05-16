-- PostgreSQL database dump
-- Dumped from database version 18.3
-- Script SQL para crear la estructura de la base de datos alesli_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';
SET default_table_access_method = heap;

-- Usuarios
CREATE TABLE IF NOT EXISTS public.usuarios (
    id_usuario integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre character varying(100) NOT NULL,
    email character varying(100) NOT NULL UNIQUE,
    password_hash character varying(255) NOT NULL,
    rol character varying(50) NOT NULL CHECK (rol IN ('Administrador', 'Encargado', 'Delivery')),
    telefono character varying(20),
    activo boolean DEFAULT true
);

-- Clientes
CREATE TABLE IF NOT EXISTS public.clientes (
    id_cliente integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre character varying(100) NOT NULL,
    telefono character varying(20) NOT NULL UNIQUE,
    email character varying(100),
    direccion text,
    fecha_nacimiento date,
    tipo_cliente character varying(50) DEFAULT 'Regular' CHECK (tipo_cliente IN ('Regular', 'Premium', 'VIP')),
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    activo boolean DEFAULT true
);

-- Categorías
CREATE TABLE IF NOT EXISTS public.categorias (
    id_categoria integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre character varying(100) NOT NULL UNIQUE,
    descripcion text
);

-- Proveedores
CREATE TABLE IF NOT EXISTS public.proveedores (
    id_proveedor integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre_empresa character varying(150) NOT NULL,
    contacto character varying(100),
    telefono character varying(20),
    activo boolean DEFAULT true
);

-- Materiales
CREATE TABLE IF NOT EXISTS public.materiales (
    id_material integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_proveedor integer REFERENCES public.proveedores(id_proveedor) ON DELETE SET NULL,
    nombre character varying(100) NOT NULL,
    unidad_medida character varying(20) NOT NULL,
    stock_actual integer DEFAULT 0,
    stock_minimo integer DEFAULT 5,
    costo_unitario numeric(10,2)
);

-- Productos
CREATE TABLE IF NOT EXISTS public.productos (
    id_producto integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_categoria integer REFERENCES public.categorias(id_categoria) ON DELETE SET NULL,
    codigo character varying(50) NOT NULL UNIQUE,
    nombre character varying(150) NOT NULL,
    descripcion text,
    precio_venta numeric(10,2) NOT NULL,
    costo_estimado numeric(10,2),
    imagen_url text,
    activo boolean DEFAULT true
);

-- Composición de Productos
CREATE TABLE IF NOT EXISTS public.composicion_producto (
    id_composicion integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_producto integer REFERENCES public.productos(id_producto) ON DELETE CASCADE,
    id_material integer REFERENCES public.materiales(id_material) ON DELETE CASCADE,
    cantidad_requerida numeric(10,2) NOT NULL
);

-- Campañas Marketing
CREATE TABLE IF NOT EXISTS public."campañas_marketing" (
    id_campania integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre character varying(150) NOT NULL,
    fecha_inicio date,
    fecha_fin date,
    presupuesto numeric(10,2),
    descripcion text,
    estado character varying(50) DEFAULT 'Activa' CHECK (estado IN ('Activa', 'Finalizada', 'Cancelada'))
);

-- Cupones
CREATE TABLE IF NOT EXISTS public.cupones (
    id_cupon integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_cliente integer REFERENCES public.clientes(id_cliente) ON DELETE SET NULL,
    id_campania integer REFERENCES public."campañas_marketing"(id_campania) ON DELETE SET NULL,
    codigo character varying(50) NOT NULL UNIQUE,
    tipo character varying(50) NOT NULL CHECK (tipo IN ('Porcentaje', 'Monto Fijo')),
    valor numeric(10,2) NOT NULL,
    puntos_requeridos integer,
    estado character varying(50) DEFAULT 'Activo' CHECK (estado IN ('Activo', 'Usado', 'Expirado')),
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion date
);

-- Pedidos
CREATE TABLE IF NOT EXISTS public.pedidos (
    id_pedido integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_cliente integer NOT NULL REFERENCES public.clientes(id_cliente) ON DELETE RESTRICT,
    id_usuario_asignado integer REFERENCES public.usuarios(id_usuario) ON DELETE SET NULL,
    id_cupon_aplicado integer REFERENCES public.cupones(id_cupon) ON DELETE SET NULL,
    fecha_pedido timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fecha_entrega date NOT NULL,
    hora_entrega time without time zone,
    direccion_entrega text,
    estado character varying(50) DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'En preparación', 'Listo', 'En camino', 'Entregado', 'Cancelado')),
    total_original numeric(10,2),
    total_final numeric(10,2),
    nota_entrega text
);

-- Detalle Pedido
CREATE TABLE IF NOT EXISTS public.detalle_pedido (
    id_detalle integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_pedido integer NOT NULL REFERENCES public.pedidos(id_pedido) ON DELETE CASCADE,
    id_producto integer NOT NULL REFERENCES public.productos(id_producto) ON DELETE RESTRICT,
    cantidad integer NOT NULL,
    precio_unitario numeric(10,2) NOT NULL
);

-- Entregas Logística
CREATE TABLE IF NOT EXISTS public.entregas_logistica (
    id_entrega integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_pedido integer UNIQUE NOT NULL REFERENCES public.pedidos(id_pedido) ON DELETE CASCADE,
    id_delivery integer REFERENCES public.usuarios(id_usuario) ON DELETE SET NULL,
    estado_entrega character varying(50) DEFAULT 'Asignado' CHECK (estado_entrega IN ('Asignado', 'En Ruta', 'Entregado', 'Fallido')),
    fecha_entrega_real timestamp without time zone,
    foto_evidencia_url character varying(255)
);

-- Transacciones Financieras
CREATE TABLE IF NOT EXISTS public.transacciones_financieras (
    id_transaccion integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_pedido integer REFERENCES public.pedidos(id_pedido) ON DELETE SET NULL,
    id_cliente integer REFERENCES public.clientes(id_cliente) ON DELETE SET NULL,
    tipo character varying(50) NOT NULL CHECK (tipo IN ('Ingreso', 'Egreso')),
    metodo_pago character varying(50) NOT NULL CHECK (metodo_pago IN ('Efectivo', 'QR', 'Transferencia', 'Tarjeta', 'Billetera Móvil')),
    monto numeric(10,2) NOT NULL,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    descripcion text
);

-- Puntos Cliente
CREATE TABLE IF NOT EXISTS public.puntos_cliente (
    id_puntos integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_cliente integer NOT NULL UNIQUE REFERENCES public.clientes(id_cliente) ON DELETE CASCADE,
    saldo integer DEFAULT 0,
    puntos_totales_ganados integer DEFAULT 0,
    fecha_actualizacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

-- Transacciones Puntos
CREATE TABLE IF NOT EXISTS public.transacciones_puntos (
    id_transaccion_puntos integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_cliente integer NOT NULL REFERENCES public.clientes(id_cliente) ON DELETE CASCADE,
    id_pedido integer REFERENCES public.pedidos(id_pedido) ON DELETE SET NULL,
    tipo character varying(50) NOT NULL CHECK (tipo IN ('Ganancia', 'Canje')),
    cantidad integer NOT NULL,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    descripcion character varying(255)
);

-- Interacciones CRM
CREATE TABLE IF NOT EXISTS public.interacciones_crm (
    id_interaccion integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_cliente integer NOT NULL REFERENCES public.clientes(id_cliente) ON DELETE CASCADE,
    id_usuario integer REFERENCES public.usuarios(id_usuario) ON DELETE SET NULL,
    canal character varying(50) NOT NULL CHECK (canal IN ('WhatsApp', 'Llamada', 'Correo', 'Presencial')),
    resumen text NOT NULL,
    fecha_contacto timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

-- Notificaciones
CREATE TABLE IF NOT EXISTS public.notificaciones (
    id_notificacion integer NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_cliente integer REFERENCES public.clientes(id_cliente) ON DELETE CASCADE,
    id_usuario_origen integer REFERENCES public.usuarios(id_usuario) ON DELETE SET NULL,
    titulo character varying(100),
    mensaje text NOT NULL,
    tipo character varying(50) NOT NULL CHECK (tipo IN ('Pedido', 'Promocion', 'Recordatorio', 'Puntos')),
    leido boolean DEFAULT false,
    fecha_envio timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

-- FIN DEL SCRIPT SQL
