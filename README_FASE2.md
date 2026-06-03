# 🍷 Inventario Licorería - Backend

## 📊 Estado Actual: PHASE 2 ✅

**Categorías + Marcas + Relaciones Implementadas**

---

## 🎯 Descripción del Proyecto

Sistema de gestión de inventario para licorería con estructura ERP/POS profesional.

### Características Principales
- ✅ Autenticación JWT
- ✅ Gestión de Categorías
- ✅ Gestión de Marcas
- ✅ Gestión de Productos con relaciones
- ✅ Gestión de Unidades de Medida
- ✅ Validaciones robustas
- ✅ Documentación completa

---

## 🚀 Inicio Rápido

### 1. Instalación
```bash
npm install
```

### 2. Configurar Base de Datos
```bash
# Crear archivo .env
cp .env.example .env

# Ejecutar migraciones
npx prisma migrate dev
```

### 3. Iniciar Servidor
```bash
npm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

---

## 📚 Documentación

### Documentos Principales
- **[PHASE_2_SUMMARY.md](./PHASE_2_SUMMARY.md)** - Resumen ejecutivo de Phase 2
- **[PHASE_2_COMPLETE.md](./PHASE_2_COMPLETE.md)** - Detalles técnicos completos
- **[TESTING_FLOW.md](./TESTING_FLOW.md)** - Guía de prueba con ejemplos
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Diagrama de arquitectura
- **[QUICK_START.md](./QUICK_START.md)** - Inicio rápido en 5 minutos
- **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** - Índice de documentación

---

## 🔐 Autenticación

### Login
```bash
POST /auth/login
Content-Type: application/json

{
  "usuario": "admin",
  "password": "admin123"
}
```

**Respuesta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Usar el token en el header `Authorization: Bearer {token}` para los demás endpoints.

---

## 📊 Endpoints Disponibles

### Categorías
```
POST   /categorias              - Crear categoría
GET    /categorias              - Listar categorías
GET    /categorias/:id          - Obtener categoría
PATCH  /categorias/:id          - Actualizar categoría
DELETE /categorias/:id          - Eliminar categoría
```

### Marcas
```
POST   /marcas                  - Crear marca
GET    /marcas                  - Listar marcas
GET    /marcas/:id              - Obtener marca
PATCH  /marcas/:id              - Actualizar marca
DELETE /marcas/:id              - Eliminar marca
```

### Productos
```
POST   /productos               - Crear producto
GET    /productos               - Listar productos
GET    /productos/:id           - Obtener producto
PATCH  /productos/:id           - Actualizar producto
DELETE /productos/:id           - Eliminar producto
```

---

## 📋 Ejemplo de Flujo Completo

### 1. Crear Categoría
```bash
POST /categorias
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Whisky",
  "descripcion": "Bebidas alcohólicas destiladas de grano"
}
```

### 2. Crear Marca
```bash
POST /marcas
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Johnnie Walker"
}
```

### 3. Crear Producto
```bash
POST /productos
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Black Label",
  "descripcion": "Whisky escocés premium",
  "precioCompra": 90,
  "precioVenta": 140,
  "stock": 20,
  "codigoBarra": "5000267001234",
  "idCategoria": 1,
  "idMarca": 1,
  "idUnidad": 1
}
```

### 4. Obtener Productos
```bash
GET /productos
Authorization: Bearer {token}
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Black Label",
    "precioCompra": 90,
    "precioVenta": 140,
    "stock": 20,
    "categoria": {
      "id": 1,
      "nombre": "Whisky"
    },
    "marca": {
      "id": 1,
      "nombre": "Johnnie Walker"
    },
    "unidad": {
      "id": 1,
      "nombre": "Botella",
      "abreviatura": "Bot"
    }
  }
]
```

---

## 🏗️ Estructura del Proyecto

```
src/
├── auth/                    # Autenticación JWT
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   └── dto/
│       ├── login.dto.ts
│       └── register.dto.ts
│
├── categorias/              # Gestión de categorías
│   ├── categorias.controller.ts
│   ├── categorias.service.ts
│   ├── categorias.module.ts
│   └── dto/
│       ├── create-categoria.dto.ts
│       └── update-categoria.dto.ts
│
├── marcas/                  # Gestión de marcas
│   ├── marcas.controller.ts
│   ├── marcas.service.ts
│   ├── marcas.module.ts
│   └── dto/
│       ├── create-marca.dto.ts
│       └── update-marca.dto.ts
│
├── productos/               # Gestión de productos
│   ├── productos.controller.ts
│   ├── productos.service.ts
│   ├── productos.module.ts
│   └── dto/
│       ├── create-producto.dto.ts
│       └── update-producto.dto.ts
│
├── prisma/                  # Servicio de Prisma
│   ├── prisma.service.ts
│   └── prisma.module.ts
│
├── app.module.ts            # Módulo principal
├── app.controller.ts
├── app.service.ts
└── main.ts                  # Punto de entrada
```

---

## 🗄️ Base de Datos

### Modelos Principales

#### Categoria
```prisma
model Categoria {
  idCategoria Int        @id @default(autoincrement())
  nombre      String     @unique
  descripcion String?
  productos   Producto[]
}
```

#### Marca
```prisma
model Marca {
  idMarca   Int        @id @default(autoincrement())
  nombre    String     @unique
  productos Producto[]
}
```

#### Producto
```prisma
model Producto {
  idProducto       Int       @id @default(autoincrement())
  nombre           String
  descripcion      String?
  precioCompra     Decimal
  precioVenta      Decimal
  stock            Int       @default(0)
  codigoBarra      String?   @unique
  idCategoria      Int
  idMarca          Int?
  idUnidad         Int
  
  categoria Categoria    @relation(fields: [idCategoria], references: [idCategoria])
  marca     Marca?       @relation(fields: [idMarca], references: [idMarca])
  unidad    UnidadMedida @relation(fields: [idUnidad], references: [idUnidad])
}
```

---

## 🧪 Testing

### Usar Postman
1. Importar `postman_collection.json`
2. Configurar variables de entorno
3. Ejecutar requests

### Guía Completa
Ver [TESTING_FLOW.md](./TESTING_FLOW.md) para ejemplos detallados.

---

## 🔧 Comandos Disponibles

```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod

# Compilar
npm run build

# Linting
npm run lint

# Formatear código
npm run format

# Migraciones Prisma
npx prisma migrate dev
npx prisma migrate deploy
npx prisma studio

# Generar cliente Prisma
npx prisma generate
```

---

## 📦 Dependencias Principales

- **NestJS** - Framework Node.js
- **Prisma** - ORM para base de datos
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **class-validator** - Validación de DTOs
- **class-transformer** - Transformación de datos

---

## 🔐 Seguridad

- ✅ JWT Guard en todos los endpoints
- ✅ Validación de datos con DTOs
- ✅ Validación de relaciones
- ✅ Manejo de errores consistente
- ✅ Nombres únicos en base de datos

---

## 📈 Próximos Pasos (Phase 3)

### Proveedores
- [ ] CRUD de proveedores
- [ ] Validación de RUC único
- [ ] Relación con compras

### Compras
- [ ] Crear compra con detalles
- [ ] Actualizar stock automáticamente
- [ ] Historial de compras

### Inventario
- [ ] Movimientos de inventario
- [ ] Entrada/Salida de productos
- [ ] Reportes de stock

---

## 📝 Notas Importantes

1. **Autenticación requerida** - Todos los endpoints requieren JWT Token
2. **Relaciones automáticas** - Las relaciones se incluyen en las respuestas
3. **Validaciones robustas** - Se validan todas las relaciones antes de crear
4. **Nombres únicos** - Categorías y marcas tienen nombres únicos
5. **Marcas opcionales** - Los productos pueden no tener marca

---

## 🆘 Solución de Problemas

### Error: "Categoría no encontrada"
- Verificar que el `idCategoria` existe
- Usar `GET /categorias` para listar categorías disponibles

### Error: "Marca no existe"
- Verificar que el `idMarca` existe
- Usar `GET /marcas` para listar marcas disponibles

### Error: "No se puede eliminar"
- La categoría/marca tiene productos asociados
- Eliminar primero los productos o cambiar su categoría/marca

### Error: "Token inválido"
- Obtener nuevo token con `POST /auth/login`
- Incluir token en header `Authorization: Bearer {token}`

---

## 📞 Soporte

Para más información:
1. Consulta la documentación en [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)
2. Revisa ejemplos en [TESTING_FLOW.md](./TESTING_FLOW.md)
3. Importa [postman_collection.json](./postman_collection.json)

---

## 📄 Licencia

Este proyecto es privado.

---

## 👨‍💻 Autor

Sistema de Inventario Licorería

---

## 🎉 Estado

✅ **Phase 2 Completada**
- ✅ Categorías CRUD
- ✅ Marcas CRUD
- ✅ Relaciones Prisma
- ✅ Validaciones
- ✅ Documentación

🚀 **Listo para Phase 3: Proveedores + Compras + Inventario**

---

**Versión**: 2.0.0  
**Fecha**: 22 de Mayo de 2026  
**Estado**: ✅ COMPLETADO
