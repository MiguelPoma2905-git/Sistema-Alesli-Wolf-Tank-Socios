-- repair_usuarios_table.sql
-- Script para corregir la tabla usuarios y agregar las columnas que el modelo custom Usuario de Django espera.
-- Fecha: 2026-05-16 03:05 UTC

BEGIN;

-- Agrega las columnas estándar de AbstractUser que faltan en la tabla usuarios.
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS username varchar(150) NOT NULL DEFAULT '';
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS password varchar(128) NOT NULL DEFAULT '';
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS first_name varchar(150) NOT NULL DEFAULT '';
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS last_name varchar(150) NOT NULL DEFAULT '';
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS is_superuser boolean NOT NULL DEFAULT false;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS is_staff boolean NOT NULL DEFAULT false;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS last_login timestamp with time zone NULL;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS date_joined timestamp with time zone NOT NULL DEFAULT now();

-- Crea índice único sobre username para cumplir con la definición de AbstractUser.
CREATE UNIQUE INDEX IF NOT EXISTS usuarios_username_key ON usuarios (username);

COMMIT;
