const { Pool } = require('pg');
require('dotenv').config();

async function seedSampleData() {
  console.log('🌱 Agregando datos de prueba...\n');
  
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    const client = await pool.connect();
    
    // Categorías
    console.log('📦 Insertando categorías...');
    await client.query(`
      INSERT INTO categorias (nombre, descripcion) VALUES
        ('Vinos', 'Vinos tintos, blancos y rosados'),
        ('Cervezas', 'Cervezas nacionales e importadas'),
        ('Licores', 'Whisky, Ron, Vodka, Gin, Tequila'),
        ('Piscos', 'Piscos artesanales y comerciales'),
        ('Champagne', 'Champagnes y espumantes'),
        ('Snacks', 'Piqueos y botanas'),
        ('Bebidas', 'Gaseosas y jugos'),
        ('Cigarrillos', 'Cigarrillos y tabacos')
      ON CONFLICT (nombre) DO NOTHING
    `);
    
    // Marcas
    console.log('🏷️  Insertando marcas...');
    await client.query(`
      INSERT INTO marcas (nombre) VALUES
        ('Casillero del Diablo'),
        ('Cusqueña'),
        ('Pilsen'),
        ('Cristal'),
        ('Johnnie Walker'),
        ('Bacardi'),
        ('Absolut'),
        ('Tabernero'),
        ('Tacama'),
        ('Queirolo'),
        ('Inca Kola'),
        ('Coca Cola'),
        ('Lays'),
        ('Doritos')
      ON CONFLICT (nombre) DO NOTHING
    `);
    
    // Obtener IDs
    const categorias = await client.query('SELECT id_categoria, nombre FROM categorias');
    const marcas = await client.query('SELECT id_marca, nombre FROM marcas');
    const unidades = await client.query('SELECT id_unidad, nombre FROM unidades_medida');
    
    const catMap = {};
    categorias.rows.forEach(row => catMap[row.nombre] = row.id_categoria);
    
    const marcaMap = {};
    marcas.rows.forEach(row => marcaMap[row.nombre] = row.id_marca);
    
    const unidadUnd = unidades.rows.find(u => u.nombre === 'Unidad')?.id_unidad || 1;
    const unidadBot = unidades.rows.find(u => u.nombre === 'Botella')?.id_unidad || 1;
    
    // Productos
    console.log('🍷 Insertando productos...');
    await client.query(`
      INSERT INTO productos (
        codigo_barra, nombre, descripcion, precio_compra, precio_venta, 
        stock, stock_minimo, tiene_igv, es_licor, grado_alcohol, 
        id_categoria, id_marca, id_unidad
      ) VALUES
        -- Vinos
        ('7750001', 'Casillero del Diablo Cabernet', 'Vino tinto chileno 750ml', 25.00, 35.00, 50, 10, true, true, 13.5, ${catMap['Vinos']}, ${marcaMap['Casillero del Diablo']}, ${unidadBot}),
        ('7750002', 'Casillero del Diablo Merlot', 'Vino tinto chileno 750ml', 25.00, 35.00, 45, 10, true, true, 13.5, ${catMap['Vinos']}, ${marcaMap['Casillero del Diablo']}, ${unidadBot}),
        ('7750003', 'Tacama Blanco Semi Seco', 'Vino blanco peruano 750ml', 18.00, 28.00, 30, 8, true, true, 12.5, ${catMap['Vinos']}, ${marcaMap['Tacama']}, ${unidadBot}),
        
        -- Cervezas
        ('7750004', 'Cusqueña Dorada 330ml', 'Cerveza peruana dorada', 2.50, 4.00, 200, 50, true, true, 5.0, ${catMap['Cervezas']}, ${marcaMap['Cusqueña']}, ${unidadUnd}),
        ('7750005', 'Cusqueña Negra 330ml', 'Cerveza peruana negra', 2.50, 4.00, 150, 50, true, true, 5.6, ${catMap['Cervezas']}, ${marcaMap['Cusqueña']}, ${unidadUnd}),
        ('7750006', 'Pilsen Callao 650ml', 'Cerveza peruana clásica', 3.50, 5.50, 180, 40, true, true, 5.0, ${catMap['Cervezas']}, ${marcaMap['Pilsen']}, ${unidadUnd}),
        ('7750007', 'Cristal 650ml', 'Cerveza peruana premium', 3.50, 5.50, 200, 40, true, true, 5.0, ${catMap['Cervezas']}, ${marcaMap['Cristal']}, ${unidadUnd}),
        
        -- Licores
        ('7750008', 'Johnnie Walker Red Label 750ml', 'Whisky escocés', 65.00, 95.00, 25, 5, true, true, 40.0, ${catMap['Licores']}, ${marcaMap['Johnnie Walker']}, ${unidadBot}),
        ('7750009', 'Johnnie Walker Black Label 750ml', 'Whisky escocés premium', 110.00, 155.00, 15, 3, true, true, 40.0, ${catMap['Licores']}, ${marcaMap['Johnnie Walker']}, ${unidadBot}),
        ('7750010', 'Bacardi Blanco 750ml', 'Ron blanco', 45.00, 65.00, 30, 8, true, true, 37.5, ${catMap['Licores']}, ${marcaMap['Bacardi']}, ${unidadBot}),
        ('7750011', 'Absolut Vodka 750ml', 'Vodka sueco', 55.00, 80.00, 20, 5, true, true, 40.0, ${catMap['Licores']}, ${marcaMap['Absolut']}, ${unidadBot}),
        
        -- Piscos
        ('7750012', 'Tabernero Quebranta 750ml', 'Pisco peruano', 35.00, 50.00, 40, 10, true, true, 42.0, ${catMap['Piscos']}, ${marcaMap['Tabernero']}, ${unidadBot}),
        ('7750013', 'Tacama Italia 750ml', 'Pisco peruano acholado', 40.00, 60.00, 30, 8, true, true, 42.0, ${catMap['Piscos']}, ${marcaMap['Tacama']}, ${unidadBot}),
        ('7750014', 'Queirolo Quebranta 750ml', 'Pisco peruano', 32.00, 48.00, 35, 10, true, true, 42.0, ${catMap['Piscos']}, ${marcaMap['Queirolo']}, ${unidadBot}),
        
        -- Snacks
        ('7750015', 'Lays Clásicas 180g', 'Papas fritas clásicas', 3.50, 6.00, 100, 20, true, false, NULL, ${catMap['Snacks']}, ${marcaMap['Lays']}, ${unidadUnd}),
        ('7750016', 'Doritos Nacho 200g', 'Tortillas de maíz', 4.00, 6.50, 80, 20, true, false, NULL, ${catMap['Snacks']}, ${marcaMap['Doritos']}, ${unidadUnd}),
        
        -- Bebidas
        ('7750017', 'Inca Kola 1.5L', 'Gaseosa nacional', 2.50, 4.50, 150, 30, true, false, NULL, ${catMap['Bebidas']}, ${marcaMap['Inca Kola']}, ${unidadUnd}),
        ('7750018', 'Coca Cola 1.5L', 'Gaseosa', 2.50, 4.50, 150, 30, true, false, NULL, ${catMap['Bebidas']}, ${marcaMap['Coca Cola']}, ${unidadUnd})
      ON CONFLICT (codigo_barra) DO NOTHING
    `);
    
    // Proveedores
    console.log('🚚 Insertando proveedores...');
    await client.query(`
      INSERT INTO proveedores (razon_social, ruc, telefono, email, direccion) VALUES
        ('Distribuidora Vinos SAC', '20123456789', '987654321', 'ventas@vinos.com', 'Av. Industrial 123, Lima'),
        ('Backus y Johnston', '20100190797', '987654322', 'contacto@backus.pe', 'Av. Nicolás Ayllón 3986, Lima'),
        ('Comercializadora Licores Finos', '20234567890', '987654323', 'info@licoresfinos.com', 'Jr. Comercio 456, Lima')
      ON CONFLICT (ruc) DO NOTHING
    `);
    
    // Resumen
    const productCount = await client.query('SELECT COUNT(*) FROM productos');
    const catCount = await client.query('SELECT COUNT(*) FROM categorias');
    const marcaCount = await client.query('SELECT COUNT(*) FROM marcas');
    const provCount = await client.query('SELECT COUNT(*) FROM proveedores');
    
    console.log('\n✅ Datos de prueba insertados:');
    console.log(`   📦 Categorías: ${catCount.rows[0].count}`);
    console.log(`   🏷️  Marcas: ${marcaCount.rows[0].count}`);
    console.log(`   🍷 Productos: ${productCount.rows[0].count}`);
    console.log(`   🚚 Proveedores: ${provCount.rows[0].count}`);
    
    console.log('\n🎉 ¡Base de datos lista para usar!');
    
    client.release();
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err.stack);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seedSampleData();
