-- Script de inicialización de base de datos Neon
-- Sistema de Inventario de Licorería

-- Tabla: roles
CREATE TABLE IF NOT EXISTS roles (
  id_rol SERIAL PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE NOT NULL
);

-- Tabla: usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario SERIAL PRIMARY KEY,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  usuario VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  estado BOOLEAN DEFAULT true,
  id_rol INTEGER NOT NULL REFERENCES roles(id_rol)
);

-- Tabla: categorias
CREATE TABLE IF NOT EXISTS categorias (
  id_categoria SERIAL PRIMARY KEY,
  nombre VARCHAR(100) UNIQUE NOT NULL,
  descripcion TEXT
);

-- Tabla: marcas
CREATE TABLE IF NOT EXISTS marcas (
  id_marca SERIAL PRIMARY KEY,
  nombre VARCHAR(100) UNIQUE NOT NULL
);

-- Tabla: unidades_medida
CREATE TABLE IF NOT EXISTS unidades_medida (
  id_unidad SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  abreviatura VARCHAR(10) NOT NULL
);

-- Tabla: productos
CREATE TABLE IF NOT EXISTS productos (
  id_producto SERIAL PRIMARY KEY,
  codigo_barra VARCHAR(50) UNIQUE,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT,
  precio_compra DECIMAL(10, 2) NOT NULL,
  precio_venta DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  stock_minimo INTEGER DEFAULT 5,
  tiene_igv BOOLEAN DEFAULT true,
  es_licor BOOLEAN DEFAULT false,
  grado_alcohol DECIMAL(5, 2),
  fecha_vencimiento DATE,
  id_categoria INTEGER NOT NULL REFERENCES categorias(id_categoria),
  id_marca INTEGER REFERENCES marcas(id_marca),
  id_unidad INTEGER NOT NULL REFERENCES unidades_medida(id_unidad)
);

-- Tabla: media_productos
CREATE TABLE IF NOT EXISTS media_productos (
  id_media SERIAL PRIMARY KEY,
  id_producto INTEGER NOT NULL REFERENCES productos(id_producto) ON DELETE CASCADE,
  tipo VARCHAR(20) NOT NULL,
  nombre_archivo VARCHAR(255) NOT NULL,
  ruta VARCHAR(500) NOT NULL,
  url_publica VARCHAR(500),
  tamano INTEGER NOT NULL,
  mime_type VARCHAR(50) NOT NULL,
  es_principal BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: clientes
CREATE TABLE IF NOT EXISTS clientes (
  id_cliente SERIAL PRIMARY KEY,
  tipo_documento VARCHAR(10),
  numero_documento VARCHAR(20) UNIQUE,
  nombres VARCHAR(100),
  apellidos VARCHAR(100),
  telefono VARCHAR(20),
  email VARCHAR(100),
  direccion TEXT
);

-- Tabla: proveedores
CREATE TABLE IF NOT EXISTS proveedores (
  id_proveedor SERIAL PRIMARY KEY,
  razon_social VARCHAR(150) NOT NULL,
  ruc VARCHAR(20) UNIQUE,
  telefono VARCHAR(20),
  email VARCHAR(100),
  direccion TEXT
);

-- Tabla: metodos_pago
CREATE TABLE IF NOT EXISTS metodos_pago (
  id_metodo SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL
);

-- Tabla: ventas
CREATE TABLE IF NOT EXISTS ventas (
  id_venta SERIAL PRIMARY KEY,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  subtotal DECIMAL(10, 2) NOT NULL,
  igv DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  tipo_comprobante VARCHAR(20),
  numero_comprobante VARCHAR(50),
  id_cliente INTEGER REFERENCES clientes(id_cliente),
  id_usuario INTEGER NOT NULL REFERENCES usuarios(id_usuario),
  id_metodo INTEGER NOT NULL REFERENCES metodos_pago(id_metodo)
);

-- Tabla: detalle_ventas
CREATE TABLE IF NOT EXISTS detalle_ventas (
  id_detalle SERIAL PRIMARY KEY,
  id_venta INTEGER NOT NULL REFERENCES ventas(id_venta) ON DELETE CASCADE,
  id_producto INTEGER NOT NULL REFERENCES productos(id_producto) ON DELETE CASCADE,
  cantidad INTEGER NOT NULL,
  precio_unitario DECIMAL(10, 2) NOT NULL,
  descuento DECIMAL(10, 2) DEFAULT 0,
  subtotal DECIMAL(10, 2) NOT NULL
);

-- Tabla: compras
CREATE TABLE IF NOT EXISTS compras (
  id_compra SERIAL PRIMARY KEY,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  subtotal DECIMAL(10, 2),
  igv DECIMAL(10, 2),
  total DECIMAL(10, 2),
  numero_factura VARCHAR(50),
  id_proveedor INTEGER NOT NULL REFERENCES proveedores(id_proveedor),
  id_usuario INTEGER NOT NULL REFERENCES usuarios(id_usuario)
);

-- Tabla: detalle_compras
CREATE TABLE IF NOT EXISTS detalle_compras (
  id_detalle SERIAL PRIMARY KEY,
  id_compra INTEGER NOT NULL REFERENCES compras(id_compra) ON DELETE CASCADE,
  id_producto INTEGER NOT NULL REFERENCES productos(id_producto) ON DELETE CASCADE,
  cantidad INTEGER NOT NULL,
  precio_compra DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL
);

-- Tabla: movimientos_inventario
CREATE TABLE IF NOT EXISTS movimientos_inventario (
  id_movimiento SERIAL PRIMARY KEY,
  id_producto INTEGER NOT NULL REFERENCES productos(id_producto) ON DELETE CASCADE,
  tipo_movimiento VARCHAR(20) NOT NULL,
  motivo VARCHAR(50),
  cantidad INTEGER NOT NULL,
  stock_anterior INTEGER NOT NULL,
  stock_nuevo INTEGER NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos iniciales: roles
INSERT INTO roles (nombre) VALUES 
  ('Administrador'),
  ('Vendedor'),
  ('Almacenero')
ON CONFLICT (nombre) DO NOTHING;

-- Datos iniciales: unidades de medida
INSERT INTO unidades_medida (nombre, abreviatura) VALUES 
  ('Unidad', 'UND'),
  ('Litro', 'L'),
  ('Kilogramo', 'KG'),
  ('Caja', 'CAJA'),
  ('Pack', 'PACK'),
  ('Botella', 'BOT')
ON CONFLICT DO NOTHING;

-- Datos iniciales: métodos de pago
INSERT INTO metodos_pago (nombre) VALUES 
  ('Efectivo'),
  ('Tarjeta Débito'),
  ('Tarjeta Crédito'),
  ('Yape'),
  ('Plin'),
  ('Transferencia')
ON CONFLICT DO NOTHING;

-- Usuario admin por defecto (password: 123456)
-- Hash bcrypt de '123456': $2b$10$CwTycUXWue0Thq9StjUM0uJ8Z8W4uF9k0llxxtIHlnI6qL7Kp1yeu
INSERT INTO usuarios (nombres, apellidos, usuario, password_hash, estado, id_rol)
VALUES ('Admin', 'Sistema', 'admin', '$2b$10$CwTycUXWue0Thq9StjUM0uJ8Z8W4uF9k0llxxtIHlnI6qL7Kp1yeu', true, 1)
ON CONFLICT (usuario) DO NOTHING;

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(id_categoria);
CREATE INDEX IF NOT EXISTS idx_productos_marca ON productos(id_marca);
CREATE INDEX IF NOT EXISTS idx_ventas_fecha ON ventas(fecha);
CREATE INDEX IF NOT EXISTS idx_ventas_usuario ON ventas(id_usuario);
CREATE INDEX IF NOT EXISTS idx_compras_fecha ON compras(fecha);
CREATE INDEX IF NOT EXISTS idx_movimientos_producto ON movimientos_inventario(id_producto);
CREATE INDEX IF NOT EXISTS idx_movimientos_fecha ON movimientos_inventario(fecha);

COMMIT;
