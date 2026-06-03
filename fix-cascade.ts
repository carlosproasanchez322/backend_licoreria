import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Ejecutando migraciones de cascade delete...');

    // Ejecutar el SQL directamente
    await prisma.$executeRawUnsafe(`
      ALTER TABLE detalle_ventas DROP CONSTRAINT IF EXISTS detalle_ventas_id_producto_fkey;
      ALTER TABLE detalle_compras DROP CONSTRAINT IF EXISTS detalle_compras_id_producto_fkey;
      ALTER TABLE movimientos_inventario DROP CONSTRAINT IF EXISTS movimientos_inventario_id_producto_fkey;

      ALTER TABLE detalle_ventas 
      ADD CONSTRAINT detalle_ventas_id_producto_fkey 
      FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE;

      ALTER TABLE detalle_compras 
      ADD CONSTRAINT detalle_compras_id_producto_fkey 
      FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE;

      ALTER TABLE movimientos_inventario 
      ADD CONSTRAINT movimientos_inventario_id_producto_fkey 
      FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE;
    `);

    console.log('✅ Migraciones aplicadas exitosamente');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
