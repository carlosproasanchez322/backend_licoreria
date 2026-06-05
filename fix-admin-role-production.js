const { Pool } = require('pg');
require('dotenv').config({ path: '.env.production' });

async function fixAdminRoleProduction() {
  console.log('🔧 Actualizando rol del usuario admin en PRODUCCIÓN...\n');
  console.log('📍 Base de datos:', process.env.DATABASE_URL?.substring(0, 50) + '...\n');
  
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    const client = await pool.connect();
    
    // Buscar el rol ADMIN
    const rolResult = await client.query("SELECT id_rol FROM roles WHERE nombre = 'ADMIN'");
    
    if (rolResult.rows.length === 0) {
      console.log('❌ Rol "ADMIN" no encontrado. Creándolo...');
      await client.query("INSERT INTO roles (nombre) VALUES ('ADMIN')");
      console.log('✅ Rol "ADMIN" creado');
    }
    
    const rol = await client.query("SELECT id_rol FROM roles WHERE nombre = 'ADMIN'");
    const idRolAdmin = rol.rows[0].id_rol;
    
    // Actualizar el usuario admin para que tenga el rol ADMIN
    const updateResult = await client.query(
      'UPDATE usuarios SET id_rol = $1 WHERE usuario = $2 RETURNING *',
      [idRolAdmin, 'admin']
    );
    
    if (updateResult.rowCount === 0) {
      console.log('❌ Usuario admin no encontrado en producción');
    } else {
      console.log('✅ Rol del usuario admin actualizado a ADMIN en PRODUCCIÓN');
      
      // Verificar
      const users = await client.query(`
        SELECT u.usuario, u.nombres, u.apellidos, r.nombre as rol
        FROM usuarios u
        JOIN roles r ON u.id_rol = r.id_rol
        WHERE u.usuario = 'admin'
      `);
      
      console.log('\n✅ Usuario admin en producción:');
      console.log('   Usuario: admin');
      console.log('   Rol:', users.rows[0].rol);
      console.log('\n🔑 Los usuarios en producción ahora necesitan cerrar sesión y volver a iniciar!');
    }
    
    client.release();
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err.stack);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

fixAdminRoleProduction();
