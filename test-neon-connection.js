const { Pool } = require('pg');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

async function testConnection() {
  console.log('🔍 Testing Neon connection...');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Found' : 'NOT FOUND');
  
  // Test 1: Direct connection with pg
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    const client = await pool.connect();
    console.log('✅ PostgreSQL connection successful!');
    
    // Test query
    const result = await client.query('SELECT NOW()');
    console.log('✅ Query executed successfully:', result.rows[0]);
    
    // List existing tables
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('📋 Existing tables:', tables.rows.map(r => r.table_name));
    
    client.release();
  } catch (err) {
    console.error('❌ PostgreSQL connection error:', err.message);
  } finally {
    await pool.end();
  }
  
  // Test 2: Prisma Client
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();
    console.log('✅ Prisma Client connection successful!');
    await prisma.$disconnect();
  } catch (err) {
    console.error('❌ Prisma Client error:', err.message);
  }
}

testConnection();
