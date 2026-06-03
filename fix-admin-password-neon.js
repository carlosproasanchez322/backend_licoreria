const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function fixAdminPassword() {
  console.log('🔧 Actualizando contraseña del usuario admin en Neon...\n');
  
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    const client = await pool.connect();
    
    // Listar todos los usuarios actuales
    console.log('📋 Usuarios en la base de datos:');
    const allUsers = await client.query(`
      SELECT u.id_usuario, u.usuario, u.nombres, u.apellidos, u.estado, r.nombre as rol
      FROM usuarios u
      JOIN roles r ON u.id_rol = r.id_rol
      ORDER BY u.id_usuario
    `);
    
    allUsers.rows.forEach(user => {
      console.log(`  ID: ${user.id_usuario} | Usuario: ${user.usuario} | Nombre: ${user.nombres} ${user.apellidos} | Rol: ${user.rol} | Estado: ${user.estado ? 'Activo' : 'Inactivo'}`);
    });
    
    // Buscar el usuario 'admin'
    const adminUser = allUsers.rows.find(u => u.usuario === 'admin');
    
    if (!adminUser) {
      console.log('\n❌ Usuario "admin" no encontrado. Creándolo...');
      
      // Obtener el rol Administrador
      const rolResult = await client.query("SELECT id_rol FROM roles WHERE nombre = 'Administrador'");
      if (rolResult.rows.length === 0) {
        console.log('❌ Rol "Administrador" no encontrado.');
        client.release();
        await pool.end();
        return;
      }
      
      const idRol = rolResult.rows[0].id_rol;
      const passwordHash = await bcrypt.hash('123456', 10);
      
      await client.query(
        `INSERT INTO usuarios (nombres, apellidos, usuario, password_hash, estado, id_rol)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        ['Admin', 'Sistema', 'admin', passwordHash, true, idRol]
      );
      
      console.log('✅ Usuario "admin" creado con éxito');
    } else {
      console.log(`\n✅ Usuario "admin" encontrado (ID: ${adminUser.id_usuario})`);
      console.log('🔄 Actualizando contraseña...');
      
      // Generar nuevo hash para la contraseña "123456"
      const passwordHash = await bcrypt.hash('123456', 10);
      
      // Actualizar la contraseña
      await client.query(
        'UPDATE usuarios SET password_hash = $1, estado = true WHERE usuario = $2',
        [passwordHash, 'admin']
      );
      
      console.log('✅ Contraseña actualizada exitosamente');
    }
    
    // Verificar que la contraseña funcione
    const verifyUser = await client.query(
      'SELECT usuario, password_hash, estado FROM usuarios WHERE usuario = $1',
      ['admin']
    );
    
    if (verifyUser.rows.length > 0) {
      const user = verifyUser.rows[0];
      const passwordMatch = await bcrypt.compare('123456', user.password_hash);
      
      console.log('\n🧪 Verificación:');
      console.log(`   Usuario: ${user.usuario}`);
      console.log(`   Estado: ${user.estado ? 'Activo ✅' : 'Inactivo ❌'}`);
      console.log(`   Password match: ${passwordMatch ? 'SÍ ✅' : 'NO ❌'}`);
      
      if (passwordMatch && user.estado) {
        console.log('\n🎉 ¡Perfecto! Ahora puedes iniciar sesión con:');
        console.log('   Usuario: admin');
        console.log('   Password: 123456');
      } else {
        console.log('\n❌ Algo salió mal. Por favor contacta soporte.');
      }
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

fixAdminPassword();
