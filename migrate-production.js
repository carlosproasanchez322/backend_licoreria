const { execSync } = require('child_process');

console.log('🔄 Ejecutando migraciones en base de datos de producción...');

try {
  // Ejecutar migración
  execSync('npx prisma migrate deploy', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL
    }
  });
  
  console.log('✅ Migraciones ejecutadas correctamente');
  
  // Opcional: Ejecutar seed si existe
  console.log('🌱 Ejecutando seed de datos iniciales...');
  execSync('npx prisma db seed', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL
    }
  });
  
  console.log('✅ Seed ejecutado correctamente');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
