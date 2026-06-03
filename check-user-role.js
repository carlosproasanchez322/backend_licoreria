const { Pool } = require('pg');
require('dotenv').config();

async function checkUserRole() {
  console.log('🔍 Verificando usuarios y roles...\n');
  
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    const client = await pool.connect();
    
    // Ver todos los roles
    console.log('📋 ROLES EXISTENTES:');
    const roles = await client.query('SELECT * FROM roles ORDER BY id_rol');
    console.table(roles.rows);
    
    // Ver usuarios con sus roles
    console.log('\n👥 USUARIOS CON ROLES:');
    const users = await client.query(`
      SELECT 
        u.id_usuario,
        u.nombres,
        u.apellidos,
        u.usuario,
        u.estado,
        u.id_rol,
        r.nombre as nombre_rol
      FROM usuarios u
      LEFT JOIN roles r ON u.id_rol = r.id_rol
      ORDER BY u.id_usuario
    `);
    console.table(users.rows);
    
    client.release();
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await pool.end();
  }
}

checkUserRole();
