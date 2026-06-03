const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function createAdminUser() {
  console.log('🔧 Creando usuario admin...\n');
  
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    const client = await pool.connect();
    
    // Verificar si existe el rol Administrador
    const rolResult = await client.query("SELECT id_rol FROM roles WHERE nombre = 'Administrador'");
    
    if (rolResult.rows.length === 0) {
      console.log('❌ Rol "Administrador" no encontrado. Creándolo...');
      await client.query("INSERT INTO roles (nombre) VALUES ('Administrador')");
      console.log('✅ Rol "Administrador" creado');
    }
    
    const rol = await client.query("SELECT id_rol FROM roles WHERE nombre = 'Administrador'");
    const idRol = rol.rows[0].id_rol;
    
    // Crear hash de la contraseña "123456"
    const passwordHash = await bcrypt.hash('123456', 10);
    
    // Verificar si el usuario admin ya existe
    const userCheck = await client.query("SELECT usuario FROM usuarios WHERE usuario = 'admin'");
    
    if (userCheck.rows.length > 0) {
      console.log('Usuario "admin" ya existe. Actualizando contraseña...');
      await client.query(
        'UPDATE usuarios SET password_hash = $1, estado = true, id_rol = $2 WHERE usuario = $3',
        [passwordHash, idRol, 'admin']
      );
      console.log('✅ Contraseña actualizada');
    } else {
      console.log('Creando usuario "admin"...');
      await client.query(
        `INSERT INTO usuarios (nombres, apellidos, usuario, password_hash, estado, id_rol)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        ['Admin', 'Sistema', 'admin', passwordHash, true, idRol]
      );
      console.log('✅ Usuario creado');
    }
    
    // Verificar
    const users = await client.query(`
      SELECT u.usuario, u.nombres, u.apellidos, r.nombre as rol
      FROM usuarios u
      JOIN roles r ON u.id_rol = r.id_rol
      WHERE u.usuario = 'admin'
    `);
    
    console.log('\n✅ Usuario admin configurado:');
    console.log('   Usuario: admin');
    console.log('   Password: 123456');
    console.log('   Rol:', users.rows[0].rol);
    console.log('\n🔑 Puedes iniciar sesión ahora!');
    
    client.release();
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err.stack);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

createAdminUser();
