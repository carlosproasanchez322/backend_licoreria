const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initDatabase() {
  console.log('🚀 Inicializando base de datos Neon...\n');
  
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    const client = await pool.connect();
    console.log('✅ Conectado a Neon PostgreSQL\n');
    
    // Leer el script SQL
    const sqlPath = path.join(__dirname, 'prisma', 'init-database.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('📝 Ejecutando script de inicialización...\n');
    
    // Ejecutar el script
    await client.query(sql);
    
    console.log('✅ Base de datos inicializada correctamente\n');
    
    // Verificar tablas creadas
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('📋 Tablas creadas:');
    tables.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });
    
    // Verificar datos iniciales
    const roles = await client.query('SELECT * FROM roles');
    const usuarios = await client.query('SELECT usuario, nombres, apellidos FROM usuarios');
    const metodos = await client.query('SELECT * FROM metodos_pago');
    
    console.log(`\n🔑 Roles creados: ${roles.rowCount}`);
    roles.rows.forEach(row => {
      console.log(`   - ${row.nombre}`);
    });
    
    console.log(`\n👤 Usuarios creados: ${usuarios.rowCount}`);
    usuarios.rows.forEach(row => {
      console.log(`   - ${row.usuario} (${row.nombres} ${row.apellidos})`);
    });
    
    console.log(`\n💳 Métodos de pago: ${metodos.rowCount}`);
    metodos.rows.forEach(row => {
      console.log(`   - ${row.nombre}`);
    });
    
    console.log('\n🎉 ¡Listo! La base de datos está configurada.');
    console.log('\n📌 Credenciales por defecto:');
    console.log('   Usuario: admin');
    console.log('   Password: 123456');
    
    client.release();
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err.stack);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initDatabase();
