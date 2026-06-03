# ⚡ Quick Start - Categorías + Marcas + Productos

## 🚀 Inicio Rápido (5 minutos)

### Paso 1: Iniciar el servidor
```bash
npm run start:dev
```

Espera a ver:
```
[Nest] 12345 - 05/20/2026, 10:00:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345 - 05/20/2026, 10:00:01 AM     LOG [InstanceLoader] PrismaModule dependencies initialized
[Nest] 12345 - 05/20/2026, 10:00:02 AM     LOG [InstanceLoader] AuthModule dependencies initialized
[Nest] 12345 - 05/20/2026, 10:00:02 AM     LOG [NestApplication] Nest application successfully started
```

### Paso 2: Obtener Token JWT

Abre Postman/Insomnia y haz esta petición:

```
POST http://localhost:3000/auth/login
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

**Copia el token** para usarlo en las siguientes peticiones.

---

## 📝 Peticiones Rápidas

### 1️⃣ Crear Categoría

```
POST http://localhost:3000/categorias
Authorization: Bearer {TU_TOKEN}
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

### 2️⃣ Crear Marca

```
POST http://localhost:3000/marcas
Authorization: Bearer {TU_TOKEN}
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

### 3️⃣ Crear Unidad (si no existe)

```
POST http://localhost:3000/unidades
Authorization: Bearer {TU_TOKEN}
Content-Type: application/json

{
  "nombre": "Botella",
  "abreviatura": "Bot"
}
```

### 4️⃣ Crear Producto con Relaciones

```
POST http://localhost:3000/productos
Authorization: Bearer {TU_TOKEN}
Content-Type: application/json

{
  "nombre": "Black Label",
  "descripcion": "Whisky escocés premium",
  "precioCompra": 90,
  "precioVenta": 140,
  "stock": 20,
  "codigoBarra": "JW-BL-750",
  "categoriaId": 1,
  "marcaId": 1,
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
  "codigoBarra": "JW-BL-750",
  "createdAt": "2026-05-20T10:30:00.000Z",
  "updatedAt": "2026-05-20T10:30:00.000Z",
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

### 5️⃣ Listar Productos con Relaciones

```
GET http://localhost:3000/productos
Authorization: Bearer {TU_TOKEN}
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
    "codigoBarra": "JW-BL-750",
    "createdAt": "2026-05-20T10:30:00.000Z",
    "updatedAt": "2026-05-20T10:30:00.000Z",
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

## 🎯 Flujo Completo en 10 Pasos

### Paso 1: Login
```bash
POST /auth/login
Body: {"usuario": "admin", "password": "admin123"}
```

### Paso 2: Crear Categoría Whisky
```bash
POST /categorias
Body: {"nombre": "Whisky", "descripcion": "Bebidas alcohólicas destiladas de grano"}
```
**Guarda el ID: 1**

### Paso 3: Crear Categoría Ron
```bash
POST /categorias
Body: {"nombre": "Ron", "descripcion": "Bebidas alcohólicas destiladas de caña de azúcar"}
```
**Guarda el ID: 2**

### Paso 4: Crear Marca Johnnie Walker
```bash
POST /marcas
Body: {"nombre": "Johnnie Walker"}
```
**Guarda el ID: 1**

### Paso 5: Crear Marca Bacardi
```bash
POST /marcas
Body: {"nombre": "Bacardi"}
```
**Guarda el ID: 2**

### Paso 6: Crear Unidad Botella
```bash
POST /unidades
Body: {"nombre": "Botella", "abreviatura": "Bot"}
```
**Guarda el ID: 1**

### Paso 7: Crear Producto Black Label
```bash
POST /productos
Body: {
  "nombre": "Black Label",
  "descripcion": "Whisky escocés premium",
  "precioCompra": 90,
  "precioVenta": 140,
  "stock": 20,
  "codigoBarra": "JW-BL-750",
  "categoriaId": 1,
  "marcaId": 1,
  "idUnidad": 1
}
```

### Paso 8: Crear Producto Bacardi Superior
```bash
POST /productos
Body: {
  "nombre": "Bacardi Superior",
  "descripcion": "Ron blanco premium",
  "precioCompra": 45,
  "precioVenta": 75,
  "stock": 50,
  "codigoBarra": "BAC-SUP-750",
  "categoriaId": 2,
  "marcaId": 2,
  "idUnidad": 1
}
```

### Paso 9: Listar Todos los Productos
```bash
GET /productos
```

### Paso 10: Obtener Categoría con Productos
```bash
GET /categorias/1
```

---

## 🔧 Comandos Útiles

### Compilar
```bash
npm run build
```

### Desarrollo (con hot reload)
```bash
npm run start:dev
```

### Producción
```bash
npm run start:prod
```

### Linting
```bash
npm run lint
```

### Formatear código
```bash
npm run format
```

---

## 📊 Estructura de Datos

```
Categoría
├── id: 1
├── nombre: "Whisky"
└── descripcion: "Bebidas alcohólicas destiladas de grano"

Marca
├── id: 1
└── nombre: "Johnnie Walker"

Unidad
├── id: 1
├── nombre: "Botella"
└── abreviatura: "Bot"

Producto
├── id: 1
├── nombre: "Black Label"
├── descripcion: "Whisky escocés premium"
├── precioCompra: 90
├── precioVenta: 140
├── stock: 20
├── codigoBarra: "JW-BL-750"
├── categoriaId: 1 (FK)
├── marcaId: 1 (FK)
├── idUnidad: 1 (FK)
├── createdAt: "2026-05-20T10:30:00.000Z"
└── updatedAt: "2026-05-20T10:30:00.000Z"
```

---

## ❌ Errores Comunes

### Error: "Unauthorized"
**Causa**: Falta el token JWT  
**Solución**: Agrega el header `Authorization: Bearer {TOKEN}`

### Error: "Categoría no existe"
**Causa**: El `categoriaId` no existe  
**Solución**: Crea la categoría primero

### Error: "La categoría tiene productos asociados"
**Causa**: Intentas eliminar una categoría con productos  
**Solución**: Elimina los productos primero

### Error: "Nombre debe ser único"
**Causa**: Ya existe una categoría/marca con ese nombre  
**Solución**: Usa un nombre diferente

---

## 📚 Documentación Completa

Para más detalles, consulta:

- **TESTING_FLOW.md** - Guía completa de pruebas
- **ARCHITECTURE.md** - Diagrama de arquitectura
- **VERIFICATION.md** - Checklist de verificación
- **SUMMARY.md** - Resumen ejecutivo

---

## 🎓 Próximos Pasos

1. ✅ Crear categorías, marcas y productos
2. ✅ Listar y filtrar productos
3. ✅ Actualizar precios y stock
4. 🔄 Implementar Compras (Fase 2)
5. 🔄 Implementar Ventas (Fase 3)
6. 🔄 Crear Frontend (Fase 4)

---

## 💡 Tips

- Usa Postman o Insomnia para probar los endpoints
- Guarda el token JWT en una variable de entorno
- Crea una colección de Postman con todos los endpoints
- Prueba los errores para entender las validaciones
- Revisa los logs del servidor para debugging

---

## ✅ Checklist

- [ ] Servidor iniciado
- [ ] Token JWT obtenido
- [ ] Categoría creada
- [ ] Marca creada
- [ ] Unidad creada
- [ ] Producto creado
- [ ] Productos listados
- [ ] Categoría con productos obtenida
- [ ] Producto actualizado
- [ ] Documentación leída

---

**¡Listo para empezar! 🚀**

Ejecuta `npm run start:dev` y comienza a probar los endpoints.
