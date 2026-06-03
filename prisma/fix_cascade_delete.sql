-- Eliminar las restricciones existentes
ALTER TABLE detalle_ventas DROP CONSTRAINT IF EXISTS detalle_ventas_id_producto_fkey;
ALTER TABLE detalle_compras DROP CONSTRAINT IF EXISTS detalle_compras_id_producto_fkey;
ALTER TABLE movimientos_inventario DROP CONSTRAINT IF EXISTS movimientos_inventario_id_producto_fkey;

-- Agregar las nuevas restricciones con ON DELETE CASCADE
ALTER TABLE detalle_ventas 
ADD CONSTRAINT detalle_ventas_id_producto_fkey 
FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE;

ALTER TABLE detalle_compras 
ADD CONSTRAINT detalle_compras_id_producto_fkey 
FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE;

ALTER TABLE movimientos_inventario 
ADD CONSTRAINT movimientos_inventario_id_producto_fkey 
FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE;
