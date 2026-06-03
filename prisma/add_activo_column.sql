-- Agregar columna activo a la tabla productos
ALTER TABLE productos ADD COLUMN IF NOT EXISTS activo BOOLEAN DEFAULT true;
