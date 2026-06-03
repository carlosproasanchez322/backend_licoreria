# 🏗️ Arquitectura del Sistema - Inventario Licorería

## 📊 Diagrama de Relaciones

```
┌─────────────────────────────────────────────────────────────┐
│                      SISTEMA ERP/POS                        │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                    MÓDULO DE PRODUCTOS                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              PRODUCTO (Core)                        │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ • id (PK)                                           │   │
│  │ • nombre                                            │   │
│  │ • descripción                                       │   │
│  │ • precioCompra                                      │   │
│  │ • precioVenta                                       │   │
│  │ • stock                                             │   │
│  │ • codigoBarra (UNIQUE)                              │   │
│  │ • createdAt / updatedAt                             │   │
│  └─────────────────────────────────────────────────────┘   │
│           ↓              ↓              ↓                    │
│      ┌────────┐    ┌────────┐    ┌──────────────┐          │
│      │CATEGORÍA│    │ MARCA  │    │UNIDAD MEDIDA │          │
│      ├────────┤    ├────────┤    ├──────────────┤          │
│      │ id (PK)│    │id (PK) │    │ id (PK)      │          │
│      │ nombre │    │ nombre │    │ nombre       │          │
│      │ desc.  │    │        │    │ abreviatura  │          │
│      └────────┘    └────────┘    └──────────────┘          │
│      (REQUIRED)    (OPTIONAL)    (REQUIRED)                │
│                                                              │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                    MÓDULO DE COMPRAS                         │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────┐      │
│  │              COMPRA (Entrada)                    │      │
│  ├──────────────────────────────────────────────────┤      │
│  │ • id (PK)                                        │      │
│  │ • fecha                                          │      │
│  │ • subtotal / igv / total                         │      │
│  │ • numeroFactura                                  │      │
│  │ • idProveedor (FK)                               │      │
│  │ • idUsuario (FK)                                 │      │
│  └──────────────────────────────────────────────────┘      │
│           ↓                          ↓                       │
│      ┌──────────────┐          ┌──────────────┐            │
│      │ PROVEEDOR    │          │ DETALLE COMPRA│           │
│      ├──────────────┤          ├──────────────┤            │
│      │ id (PK)      │          │ id (PK)      │            │
│      │ razonSocial  │          │ idCompra (FK)│            │
│      │ ruc          │          │ idProducto   │            │
│      │ telefono     │          │ cantidad     │            │
│      │ email        │          │ precioCompra │            │
│      │ direccion    │          │ subtotal     │            │
│      └──────────────┘          └──────────────┘            │
│                                        ↓                    │
│                                   PRODUCTO                  │
│                                   (↑ stock)                 │
│                                                              │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                    MÓDULO DE VENTAS                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────┐      │
│  │              VENTA (Salida)                      │      │
│  ├──────────────────────────────────────────────────┤      │
│  │ • id (PK)                                        │      │
│  │ • fecha                                          │      │
│  │ • subtotal / igv / total                         │      │
│  │ • tipoComprobante / numeroComprobante            │      │
│  │ • idCliente (FK)                                 │      │
│  │ • idUsuario (FK)                                 │      │
│  │ • idMetodo (FK)                                  │      │
│  └──────────────────────────────────────────────────┘      │
│           ↓                          ↓                       │
│      ┌──────────────┐          ┌──────────────┐            │
│      │ CLIENTE      │          │ DETALLE VENTA│            │
│      ├──────────────┤          ├──────────────┤            │
│      │ id (PK)      │          │ id (PK)      │            │
│      │ tipoDoc      │          │ idVenta (FK) │            │
│      │ numeroDoc    │          │ idProducto   │            │
│      │ nombres      │          │ cantidad     │            │
│      │ apellidos    │          │ precioUnit.  │            │
│      │ telefono     │          │ descuento    │            │
│      │ email        │          │ subtotal     │            │
│      │ direccion    │          └──────────────┘            │
│      └──────────────┘                  ↓                    │
│                                   PRODUCTO                  │
│                                   (↓ stock)                 │
│                                                              │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                  MÓDULO DE INVENTARIO                        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────┐      │
│  │         MOVIMIENTO INVENTARIO (Auditoría)        │      │
│  ├──────────────────────────────────────────────────┤      │
│  │ • id (PK)                                        │      │
│  │ • idProducto (FK)                                │      │
│  │ • tipoMovimiento (ENTRADA/SALIDA/AJUSTE)         │      │
│  │ • motivo                                         │      │
│  │ • cantidad                                       │      │
│  │ • stockAnterior                                  │      │
│  │ • stockNuevo                                     │      │
│  │ • fecha                                          │      │
│  └──────────────────────────────────────────────────┘      │
│                          ↓                                   │
│                     PRODUCTO                                │
│                  (Auditoría de stock)                       │
│                                                              │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                  MÓDULO DE USUARIOS                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────┐      │
│  │              USUARIO (Autenticación)             │      │
│  ├──────────────────────────────────────────────────┤      │
│  │ • id (PK)                                        │      │
│  │ • nombres / apellidos                            │      │
│  │ • usuario (UNIQUE)                               │      │
│  │ • passwordHash                                   │      │
│  │ • estado                                         │      │
│  │ • idRol (FK)                                     │      │
│  └──────────────────────────────────────────────────┘      │
│           ↓                                                  │
│      ┌──────────────┐                                       │
│      │ ROL          │                                       │
│      ├──────────────┤                                       │
│      │ id (PK)      │                                       │
│      │ nombre       │                                       │
│      └──────────────┘                                       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura de Carpetas

```
src/
├── auth/                          # Autenticación JWT
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── jwt.strategy.ts
│
├── categorias/                    # Gestión de Categorías
│   ├── dto/
│   │   ├── create-categoria.dto.ts
│   │   └── update-categoria.dto.ts
│   ├── categorias.controller.ts
│   ├── categorias.module.ts
│   └── categorias.service.ts
│
├── marcas/                        # Gestión de Marcas
│   ├── dto/
│   │   ├── create-marca.dto.ts
│   │   └── update-marca.dto.ts
│   ├── marcas.controller.ts
│   ├── marcas.module.ts
│   └── marcas.service.ts
│
├── productos/                     # Gestión de Productos
│   ├── dto/
│   │   ├── create-producto.dto.ts
│   │   └── update-producto.dto.ts
│   ├── productos.controller.ts
│   ├── productos.module.ts
│   └── productos.service.ts
│
├── unidades/                      # Gestión de Unidades de Medida
│   ├── dto/
│   │   ├── create-unidad.dto.ts
│   │   └── update-unidad.dto.ts
│   ├── unidades.controller.ts
│   ├── unidades.module.ts
│   └── unidades.service.ts
│
├── compras/                       # Gestión de Compras
│   ├── dto/
│   │   ├── create-compra.dto.ts
│   │   └── update-compra.dto.ts
│   ├── compras.controller.ts
│   ├── compras.module.ts
│   └── compras.service.ts
│
├── ventas/                        # Gestión de Ventas
│   ├── dto/
│   │   ├── create-venta.dto.ts
│   │   └── update-venta.dto.ts
│   ├── ventas.controller.ts
│   ├── ventas.module.ts
│   └── ventas.service.ts
│
├── inventario/                    # Control de Inventario
│   ├── dto/
│   │   └── movimiento-inventario.dto.ts
│   ├── inventario.controller.ts
│   ├── inventario.module.ts
│   └── inventario.service.ts
│
├── proveedores/                   # Gestión de Proveedores
│   ├── dto/
│   │   ├── create-proveedor.dto.ts
│   │   └── update-proveedor.dto.ts
│   ├── proveedores.controller.ts
│   ├── proveedores.module.ts
│   └── proveedores.service.ts
│
├── usuarios/                      # Gestión de Usuarios
│   ├── dto/
│   │   ├── create-usuario.dto.ts
│   │   └── update-usuario.dto.ts
│   ├── usuarios.controller.ts
│   ├── usuarios.module.ts
│   └── usuarios.service.ts
│
├── prisma/                        # Servicio Prisma
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

---

## 🔄 Flujo de Datos

### 1. Entrada de Productos (Compra)

```
Proveedor
    ↓
Compra (Factura)
    ↓
DetalleCompra (Líneas)
    ↓
Producto (↑ stock)
    ↓
MovimientoInventario (Auditoría)
```

### 2. Salida de Productos (Venta)

```
Cliente
    ↓
Venta (Comprobante)
    ↓
DetalleVenta (Líneas)
    ↓
Producto (↓ stock)
    ↓
MovimientoInventario (Auditoría)
```

### 3. Consulta de Productos

```
GET /productos
    ↓
Incluye: Categoría, Marca, Unidad
    ↓
Respuesta con relaciones completas
```

---

## 🔐 Seguridad

- **Autenticación**: JWT (JSON Web Tokens)
- **Autorización**: Guards en controladores
- **Validación**: DTOs con class-validator
- **Base de datos**: Prisma ORM con tipos seguros

---

## 📈 Escalabilidad

- **Modular**: Cada módulo es independiente
- **Reutilizable**: Servicios compartidos
- **Testeable**: Inyección de dependencias
- **Mantenible**: Separación de responsabilidades

---

## 🚀 Próximas Fases

### Fase 1: ✅ Productos (COMPLETADA)
- [x] Categorías
- [x] Marcas
- [x] Unidades de Medida
- [x] Productos con relaciones

### Fase 2: 🔄 Compras e Inventario (EN PROGRESO)
- [ ] Proveedores
- [ ] Compras
- [ ] Movimientos de Inventario
- [ ] Control de Stock

### Fase 3: 📊 Ventas y POS
- [ ] Clientes
- [ ] Ventas
- [ ] Métodos de Pago
- [ ] Carrito de Compras

### Fase 4: 📱 Frontend
- [ ] Dashboard
- [ ] Gestión de Productos
- [ ] POS
- [ ] Reportes

---

## 📊 Estadísticas

| Componente | Estado | Endpoints |
|-----------|--------|-----------|
| Categorías | ✅ | 5 (CRUD + GET) |
| Marcas | ✅ | 5 (CRUD + GET) |
| Productos | ✅ | 5 (CRUD + GET) |
| Unidades | ✅ | 5 (CRUD + GET) |
| Compras | 🔄 | - |
| Ventas | 🔄 | - |
| Inventario | 🔄 | - |
| Usuarios | ✅ | - |
| Auth | ✅ | 2 (Login + Register) |

---

## 🎯 Endpoints Disponibles

### Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrarse

### Categorías
- `GET /categorias` - Listar todas
- `GET /categorias/:id` - Obtener una
- `POST /categorias` - Crear
- `PATCH /categorias/:id` - Actualizar
- `DELETE /categorias/:id` - Eliminar

### Marcas
- `GET /marcas` - Listar todas
- `GET /marcas/:id` - Obtener una
- `POST /marcas` - Crear
- `PATCH /marcas/:id` - Actualizar
- `DELETE /marcas/:id` - Eliminar

### Productos
- `GET /productos` - Listar todas (con relaciones)
- `GET /productos/:id` - Obtener una (con relaciones)
- `POST /productos` - Crear
- `PATCH /productos/:id` - Actualizar
- `DELETE /productos/:id` - Eliminar

### Unidades
- `GET /unidades` - Listar todas
- `GET /unidades/:id` - Obtener una
- `POST /unidades` - Crear
- `PATCH /unidades/:id` - Actualizar
- `DELETE /unidades/:id` - Eliminar

---

## 💾 Base de Datos

**Motor**: PostgreSQL
**ORM**: Prisma
**Migraciones**: Prisma Migrate

### Tablas Principales
- `categorias` - Categorías de productos
- `marcas` - Marcas de productos
- `unidades_medida` - Unidades de medida
- `productos` - Productos (con FK a categoría, marca, unidad)
- `proveedores` - Proveedores
- `compras` - Compras
- `detalle_compras` - Líneas de compra
- `clientes` - Clientes
- `ventas` - Ventas
- `detalle_ventas` - Líneas de venta
- `movimientos_inventario` - Auditoría de stock
- `usuarios` - Usuarios del sistema
- `roles` - Roles de usuarios
- `metodos_pago` - Métodos de pago

---

## 🔧 Configuración

### Variables de Entorno (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/licoreria
JWT_SECRET=your-secret-key
JWT_EXPIRATION=24h
NODE_ENV=development
```

### Compilación
```bash
npm run build
```

### Desarrollo
```bash
npm run start:dev
```

### Producción
```bash
npm run start:prod
```

---

## 📝 Notas

- Todos los endpoints requieren autenticación JWT
- Los DTOs validan automáticamente los datos de entrada
- Las relaciones se incluyen automáticamente en las respuestas
- El stock se actualiza automáticamente en compras y ventas
- Se mantiene auditoría de todos los movimientos de inventario
