const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function testLogin() {
  console.log('🔍 Probando login del usuario admin...\n');
  
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    const client = await pool.connect();
    
    // Buscar usuario admin con su rol
    const result = await client.query(`
      SELECT u.*, r.nombre as rol_nombre
      FROM usuarios u
      JOIN roles r ON u.id_rol = r.id_rol
      WHERE u.usuario = 'admin'
    `);
    
    if (result.rows.length === 0) {
      console.log('❌ Usuario admin no encontrado');
      return;
    }
    
    const user = result.rows[0];
    console.log('📋 Datos del usuario en BD:');
    console.log({
      id_usuario: user.id_usuario,
      nombres: user.nombres,
      apellidos: user.apellidos,
      usuario: user.usuario,
      id_rol: user.id_rol,
      rol_nombre: user.rol_nombre,
      estado: user.estado
    });
    
    // Verificar contraseña
    const passwordMatch = await bcrypt.compare('123456', user.password_hash);
    console.log('\n🔑 Contraseña "123456" válida:', passwordMatch ? '✅ SÍ' : '❌ NO');
    
    if (passwordMatch) {
      // Simular generación de JWT como lo hace el backend
      const payload = {
        sub: user.id_usuario,
        usuario: user.usuario,
        rol: user.rol_nombre,
      };
      
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'SECRET_KEY', {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
      });
      
      console.log('\n📦 Payload del JWT:');
      console.log(payload);
      
      console.log('\n🎫 Token generado:');
      console.log(token.substring(0, 50) + '...');
      
      console.log('\n✅ Respuesta que recibiría el frontend:');
      console.log({
        access_token: token.substring(0, 30) + '...',
        usuario: {
          idUsuario: user.id_usuario,
          nombres: user.nombres,
          apellidos: user.apellidos,
          usuario: user.usuario,
          rol: user.rol_nombre,
        }
      });
    }
    
    client.release();
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err.stack);
  } finally {
    await pool.end();
  }
}

testLogin();
