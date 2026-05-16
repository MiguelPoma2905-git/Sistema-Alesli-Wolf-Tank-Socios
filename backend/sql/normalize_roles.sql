-- normalize_roles.sql
-- Script para normalizar los valores del campo `rol` en la tabla `usuarios`.
-- Ajusta valores libres a los tres roles canónicos: cliente, encargado, admin
-- Fecha: 2026-05-16 03:40 UTC

BEGIN;

-- Mapear variantes comunes a los valores canónicos
UPDATE usuarios SET rol = 'encargado' WHERE LOWER(rol) LIKE '%encargad%';
UPDATE usuarios SET rol = 'admin' WHERE LOWER(rol) LIKE '%admin%' OR LOWER(rol) LIKE '%administrador%';
UPDATE usuarios SET rol = 'cliente' WHERE LOWER(rol) LIKE '%client%' OR rol IS NULL OR rol = '';

COMMIT;
