# 🔥 TESTING FLOW - Categorías + Marcas + Productos

## Estado Actual ✅
- ✅ Schema Prisma con Categoria, Marca y Producto relacionados
- ✅ Módulos NestJS generados (categorias, marcas, productos)
- ✅ Servicios con CRUD completo
- ✅ Controladores con JWT Guard
- ✅ DTOs con validaciones
- ✅ Relaciones incluidas en findAll

## Flujo de Prueba Completo

### 1️⃣ LOGIN - Obtener Token
```bash
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "usuario": "admin",
  "password": "admin123"
}
```

**Respuesta esperada:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Guardar el token para los siguientes requests.

---

### 2️⃣ CREAR CATEGORÍA
```bash
POST http://localhost:3000/categorias
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Whisky",
  "descripcion": "Bebidas alcohólicas destiladas de grano"
}
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "nombre": "Whisky",
  "descripcion": "Bebidas alcohólicas destiladas de grano"
}
```

---

### 3️⃣ CREAR MARCA
```bash
POST http://localhost:3000/marcas
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Johnnie Walker"
}
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "nombre": "Johnnie Walker"
}
```

---

### 4️⃣ CREAR UNIDAD DE MEDIDA (si no existe)
```bash
POST http://localhost:3000/unidades
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Botella",
  "abreviatura": "Bot"
}
```

---

### 5️⃣ CREAR PRODUCTO CON RELACIONES
```bash
POST http://localhost:3000/productos
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

**Respuesta esperada:**
```json
{
  "id": 1,
  "nombre": "Black Label",
  "descripcion": "Whisky escocés premium",
  "precioCompra": 90,
  "precioVenta": 140,
  "stock": 20,
  "codigoBarra": "5000267001234",
  "categoria": {
    "id": 1,
    "nombre": "Whisky",
    "descripcion": "Bebidas alcohólicas destiladas de grano"
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
```

---

### 6️⃣ OBTENER TODOS LOS PRODUCTOS (CON RELACIONES)
```bash
GET http://localhost:3000/productos
Authorization: Bearer {token}
```

**Respuesta esperada:**
```json
[
  {
    "id": 1,
    "nombre": "Black Label",
    "descripcion": "Whisky escocés premium",
    "precioCompra": 90,
    "precioVenta": 140,
    "stock": 20,
    "codigoBarra": "5000267001234",
    "categoria": {
      "id": 1,
      "nombre": "Whisky",
      "descripcion": "Bebidas alcohólicas destiladas de grano"
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

### 7️⃣ OBTENER CATEGORÍA CON PRODUCTOS
```bash
GET http://localhost:3000/categorias/1
Authorization: Bearer {token}
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "nombre": "Whisky",
  "descripcion": "Bebidas alcohólicas destiladas de grano",
  "productos": [
    {
      "idProducto": 1,
      "nombre": "Black Label",
      "precioVenta": 140,
      "stock": 20
    }
  ]
}
```

---

### 8️⃣ OBTENER MARCA CON PRODUCTOS
```bash
GET http://localhost:3000/marcas/1
Authorization: Bearer {token}
```

**Respuesta esperada:**
```json
{
  "id": 1,
  "nombre": "Johnnie Walker",
  "productos": [
    {
      "idProducto": 1,
      "nombre": "Black Label",
      "precioVenta": 140,
      "stock": 20
    }
  ]
}
```

---

## Validaciones Implementadas ✅

### Categorías
- ✅ Nombre único
- ✅ No se puede eliminar si tiene productos
- ✅ Incluye contador de productos

### Marcas
- ✅ Nombre único
- ✅ No se puede eliminar si tiene productos
- ✅ Incluye contador de productos

### Productos
- ✅ Valida que categoría exista
- ✅ Valida que marca exista (opcional)
- ✅ Valida que unidad exista
- ✅ Código de barra único
- ✅ Incluye relaciones en respuesta

---

## Estructura ERP/POS ✅

```
Producto
├── Categoría (requerida)
│   ├── id
│   ├── nombre
│   └── descripción
├── Marca (opcional)
│   ├── id
│   └── nombre
└── Unidad de Medida (requerida)
    ├── id
    ├── nombre
    └── abreviatura
```

---

## Próximos Pasos 🚀

1. **Proveedores** - Gestión de proveedores
2. **Compras** - Entrada de productos
3. **Inventario** - Movimientos y stock
4. **Ventas** - POS y carrito
5. **Frontend** - Dashboard y UI

---

## Notas Importantes 📝

- Todos los endpoints requieren JWT Token
- Las relaciones se incluyen automáticamente en las respuestas
- Los IDs se mapean de `idXxx` a `id` en las respuestas
- Los decimales se convierten a números en las respuestas
- Las marcas son opcionales en productos
