-- Script para agregar ON DELETE CASCADE a las restricciones de clave foránea
-- Ejecutar esto manualmente en PostgreSQL

-- 1. Eliminar las restricciones existentes
ALTER TABLE detalle_ventas DROP CONSTRAINT IF EXISTS detalle_ventas_id_producto_fkey CASCADE;
ALTER TABLE detalle_compras DROP CONSTRAINT IF EXISTS detalle_compras_id_producto_fkey CASCADE;
ALTER TABLE movimientos_inventario DROP CONSTRAINT IF EXISTS movimientos_inventario_id_producto_fkey CASCADE;

-- 2. Agregar las nuevas restricciones con ON DELETE CASCADE
ALTER TABLE detalle_ventas 
ADD CONSTRAINT detalle_ventas_id_producto_fkey 
FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE;

ALTER TABLE detalle_compras 
ADD CONSTRAINT detalle_compras_id_producto_fkey 
FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE;

ALTER TABLE movimientos_inventario 
ADD CONSTRAINT movimientos_inventario_id_producto_fkey 
FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE;

-- 3. Verificar que las restricciones se crearon correctamente
SELECT constraint_name, table_name, column_name 
FROM information_schema.key_column_usage 
WHERE table_name IN ('detalle_ventas', 'detalle_compras', 'movimientos_inventario') 
AND column_name = 'id_producto';
