-- =========================================
-- CREAR BASE DE DATOS
-- =========================================

CREATE DATABASE minimarket_licoreria;

-- Conectarse luego a:
-- \c minimarket_licoreria


-- =========================================
-- TABLA CATEGORIAS
-- =========================================

CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
);


-- =========================================
-- TABLA MARCAS
-- =========================================

CREATE TABLE marcas (
    id_marca SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);


-- =========================================
-- TABLA UNIDADES
-- =========================================

CREATE TABLE unidades_medida (
    id_unidad SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    abreviatura VARCHAR(10) NOT NULL
);


-- =========================================
-- TABLA PRODUCTOS
-- =========================================

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,

    codigo_barra VARCHAR(50) UNIQUE,

    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,

    precio_compra NUMERIC(10,2) NOT NULL,
    precio_venta NUMERIC(10,2) NOT NULL,

    stock INTEGER DEFAULT 0,
    stock_minimo INTEGER DEFAULT 5,

    tiene_igv BOOLEAN DEFAULT TRUE,

    es_licor BOOLEAN DEFAULT FALSE,
    grado_alcohol NUMERIC(5,2),

    fecha_vencimiento DATE,

    id_categoria INTEGER NOT NULL,
    id_marca INTEGER,
    id_unidad INTEGER NOT NULL,

    FOREIGN KEY (id_categoria)
        REFERENCES categorias(id_categoria),

    FOREIGN KEY (id_marca)
        REFERENCES marcas(id_marca),

    FOREIGN KEY (id_unidad)
        REFERENCES unidades_medida(id_unidad)
);


-- =========================================
-- TABLA CLIENTES
-- =========================================

CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,

    tipo_documento VARCHAR(10),
    numero_documento VARCHAR(20) UNIQUE,

    nombres VARCHAR(100),
    apellidos VARCHAR(100),

    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion TEXT
);


-- =========================================
-- TABLA ROLES
-- =========================================

CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);


-- =========================================
-- TABLA USUARIOS
-- =========================================

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,

    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,

    usuario VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,

    estado BOOLEAN DEFAULT TRUE,

    id_rol INTEGER NOT NULL,

    FOREIGN KEY (id_rol)
        REFERENCES roles(id_rol)
);


-- =========================================
-- TABLA METODOS PAGO
-- =========================================

CREATE TABLE metodos_pago (
    id_metodo SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);


-- =========================================
-- TABLA PROVEEDORES
-- =========================================

CREATE TABLE proveedores (
    id_proveedor SERIAL PRIMARY KEY,

    razon_social VARCHAR(150) NOT NULL,
    ruc VARCHAR(20) UNIQUE,

    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion TEXT
);


-- =========================================
-- TABLA VENTAS
-- =========================================

CREATE TABLE ventas (
    id_venta SERIAL PRIMARY KEY,

    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    subtotal NUMERIC(10,2) NOT NULL,
    igv NUMERIC(10,2) NOT NULL,
    total NUMERIC(10,2) NOT NULL,

    tipo_comprobante VARCHAR(20),
    numero_comprobante VARCHAR(50),

    id_cliente INTEGER,
    id_usuario INTEGER NOT NULL,
    id_metodo INTEGER NOT NULL,

    FOREIGN KEY (id_cliente)
        REFERENCES clientes(id_cliente),

    FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario),

    FOREIGN KEY (id_metodo)
        REFERENCES metodos_pago(id_metodo)
);


-- =========================================
-- TABLA DETALLE VENTAS
-- =========================================

CREATE TABLE detalle_ventas (
    id_detalle SERIAL PRIMARY KEY,

    id_venta INTEGER NOT NULL,
    id_producto INTEGER NOT NULL,

    cantidad INTEGER NOT NULL,
    precio_unitario NUMERIC(10,2) NOT NULL,
    descuento NUMERIC(10,2) DEFAULT 0,

    subtotal NUMERIC(10,2) NOT NULL,

    FOREIGN KEY (id_venta)
        REFERENCES ventas(id_venta)
        ON DELETE CASCADE,

    FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto)
);


-- =========================================
-- TABLA COMPRAS
-- =========================================

CREATE TABLE compras (
    id_compra SERIAL PRIMARY KEY,

    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    subtotal NUMERIC(10,2),
    igv NUMERIC(10,2),
    total NUMERIC(10,2),

    numero_factura VARCHAR(50),

    id_proveedor INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,

    FOREIGN KEY (id_proveedor)
        REFERENCES proveedores(id_proveedor),

    FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
);


-- =========================================
-- TABLA DETALLE COMPRAS
-- =========================================

CREATE TABLE detalle_compras (
    id_detalle SERIAL PRIMARY KEY,

    id_compra INTEGER NOT NULL,
    id_producto INTEGER NOT NULL,

    cantidad INTEGER NOT NULL,
    precio_compra NUMERIC(10,2) NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL,

    FOREIGN KEY (id_compra)
        REFERENCES compras(id_compra)
        ON DELETE CASCADE,

    FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto)
);


-- =========================================
-- TABLA MOVIMIENTOS INVENTARIO
-- =========================================

CREATE TABLE movimientos_inventario (
    id_movimiento SERIAL PRIMARY KEY,

    id_producto INTEGER NOT NULL,

    tipo_movimiento VARCHAR(20) NOT NULL,
    motivo VARCHAR(50),

    cantidad INTEGER NOT NULL,

    stock_anterior INTEGER NOT NULL,
    stock_nuevo INTEGER NOT NULL,

    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto)
);