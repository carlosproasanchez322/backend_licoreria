const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function checkUsers() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    const client = await pool.connect();
    
    const usuarios = await client.query('SELECT usuario, nombres, apellidos, password_hash FROM usuarios');
    
    console.log('\n👤 Usuarios en la base de datos:\n');
    
    for (const user of usuarios.rows) {
      console.log(`Usuario: ${user.usuario}`);
      console.log(`Nombre: ${user.nombres} ${user.apellidos}`);
      
      // Probar contraseñas comunes
      const passwords = ['123456', 'admin123', 'admin'];
      for (const pwd of passwords) {
        const match = await bcrypt.compare(pwd, user.password_hash);
        if (match) {
          console.log(`✅ Password: ${pwd}`);
          break;
        }
      }
      console.log('---');
    }
    
    // Actualizar password a 123456
    console.log('\n🔧 Actualizando password del admin a "123456"...');
    const newHash = await bcrypt.hash('123456', 10);
    await client.query('UPDATE usuarios SET password_hash = $1 WHERE usuario = $2', [newHash, 'admin']);
    console.log('✅ Password actualizado\n');
    
    client.release();
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await pool.end();
  }
}

checkUsers();
