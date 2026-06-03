"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const pg_1 = require("pg");
const seed_data_1 = require("./seed-data");
const RESET = process.env.SEED_RESET === 'true' || process.argv.includes('--reset');
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
const IGV = 0.18;
const PASSWORD_DEFAULT = '123456';
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomItem(arr) {
    return arr[randomInt(0, arr.length - 1)];
}
function daysAgo(days) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    d.setHours(randomInt(9, 21), randomInt(0, 59), 0, 0);
    return d;
}
function gradoAlcoholDe(p) {
    return 'alcohol' in p ? (p.alcohol ?? null) : null;
}
async function limpiarTablas() {
    console.log('🗑️  Limpiando tablas...');
    await prisma.detalleVenta.deleteMany();
    await prisma.detalleCompra.deleteMany();
    await prisma.movimientoInventario.deleteMany();
    await prisma.venta.deleteMany();
    await prisma.compra.deleteMany();
    await prisma.producto.deleteMany();
    await prisma.cliente.deleteMany();
    await prisma.usuario.deleteMany();
    await prisma.proveedor.deleteMany();
    await prisma.metodoPago.deleteMany();
    await prisma.categoria.deleteMany();
    await prisma.marca.deleteMany();
    await prisma.unidadMedida.deleteMany();
    await prisma.rol.deleteMany();
}
async function seedCatalogos() {
    console.log('📦 Catálogos base...');
    const roles = await Promise.all(seed_data_1.ROLES.map((nombre) => prisma.rol.upsert({
        where: { nombre },
        update: {},
        create: { nombre },
    })));
    for (const nombre of seed_data_1.METODOS_PAGO) {
        const existe = await prisma.metodoPago.findFirst({ where: { nombre } });
        if (!existe)
            await prisma.metodoPago.create({ data: { nombre } });
    }
    for (const u of seed_data_1.UNIDADES) {
        const existe = await prisma.unidadMedida.findFirst({
            where: { abreviatura: u.abreviatura },
        });
        if (!existe)
            await prisma.unidadMedida.create({ data: u });
    }
    const categorias = await Promise.all(seed_data_1.CATEGORIAS.map((c) => prisma.categoria.upsert({
        where: { nombre: c.nombre },
        update: { descripcion: c.descripcion },
        create: c,
    })));
    const marcas = await Promise.all(seed_data_1.MARCAS.map((nombre) => prisma.marca.upsert({
        where: { nombre },
        update: {},
        create: { nombre },
    })));
    const proveedores = await Promise.all(seed_data_1.PROVEEDORES.map((p) => prisma.proveedor.upsert({
        where: { ruc: p.ruc },
        update: p,
        create: p,
    })));
    return { roles, categorias, marcas, proveedores };
}
async function seedUsuarios(roles) {
    console.log('👤 Usuarios...');
    const passwordHash = await bcrypt.hash(PASSWORD_DEFAULT, 10);
    const rolMap = Object.fromEntries(roles.map((r) => [r.nombre, r.idRol]));
    for (const u of seed_data_1.USUARIOS) {
        await prisma.usuario.upsert({
            where: { usuario: u.usuario },
            update: { passwordHash, estado: true, idRol: rolMap[u.rol] },
            create: {
                nombres: u.nombres,
                apellidos: u.apellidos,
                usuario: u.usuario,
                passwordHash,
                estado: true,
                idRol: rolMap[u.rol],
            },
        });
    }
    return prisma.usuario.findMany();
}
async function seedClientes(cantidad) {
    console.log(`🧑 Clientes (${cantidad})...`);
    const tipos = ['DNI', 'RUC', 'CE'];
    const data = Array.from({ length: cantidad }, (_, i) => ({
        tipoDocumento: randomItem(tipos),
        numeroDocumento: `DNI${String(10000000 + i).padStart(8, '0')}`,
        nombres: `Cliente${i + 1}`,
        apellidos: `Apellido${i + 1}`,
        telefono: `9${randomInt(10000000, 99999999)}`,
        email: `cliente${i + 1}@mail.com`,
        direccion: `Av. Ejemplo ${i + 1}, Lima`,
    }));
    await prisma.cliente.createMany({ data, skipDuplicates: true });
    return prisma.cliente.findMany();
}
async function seedProductos(categorias, marcas, unidades) {
    console.log('🍾 Productos masivos...');
    const catMap = Object.fromEntries(categorias.map((c) => [c.nombre, c.idCategoria]));
    const marcaMap = Object.fromEntries(marcas.map((m) => [m.nombre, m.idMarca]));
    const unidadDefault = unidades[0]?.idUnidad ?? 1;
    const productosData = [];
    for (let i = 0; i < seed_data_1.PRODUCTOS_BASE.length; i++) {
        const p = seed_data_1.PRODUCTOS_BASE[i];
        productosData.push({
            nombre: p.nombre,
            descripcion: `Producto ${p.nombre}`,
            precioCompra: p.compra,
            precioVenta: p.venta,
            stock: randomInt(10, 120),
            stockMinimo: randomInt(3, 15),
            codigoBarra: `7700${String(i + 1).padStart(8, '0')}`,
            tieneIgv: true,
            esLicor: p.licor,
            gradoAlcohol: gradoAlcoholDe(p),
            idCategoria: catMap[p.cat] ?? categorias[0].idCategoria,
            idMarca: marcaMap[p.marca] ?? null,
            idUnidad: unidades[randomInt(0, unidades.length - 1)]?.idUnidad ?? unidadDefault,
        });
    }
    const extras = 80;
    for (let i = 0; i < extras; i++) {
        const base = seed_data_1.PRODUCTOS_BASE[i % seed_data_1.PRODUCTOS_BASE.length];
        const cat = randomItem(categorias);
        const marca = randomItem(marcas);
        productosData.push({
            nombre: `${base.nombre} - Lote ${i + 1}`,
            descripcion: 'Generado por seed masivo',
            precioCompra: base.compra + randomInt(0, 5),
            precioVenta: base.venta + randomInt(0, 8),
            stock: randomInt(5, 80),
            stockMinimo: 5,
            codigoBarra: `8800${String(1000 + i).padStart(8, '0')}`,
            tieneIgv: true,
            esLicor: base.licor,
            gradoAlcohol: gradoAlcoholDe(base),
            idCategoria: cat.idCategoria,
            idMarca: marca.idMarca,
            idUnidad: unidades[randomInt(0, unidades.length - 1)]?.idUnidad ?? unidadDefault,
        });
    }
    const batchSize = 50;
    for (let i = 0; i < productosData.length; i += batchSize) {
        const batch = productosData.slice(i, i + batchSize);
        for (const data of batch) {
            await prisma.producto.create({ data }).catch(() => null);
        }
    }
    return prisma.producto.findMany();
}
async function seedCompras(proveedores, usuarios, productos, cantidad) {
    console.log(`🛒 Compras (${cantidad})...`);
    const admin = usuarios[0];
    for (let i = 0; i < cantidad; i++) {
        const items = Array.from({ length: randomInt(2, 6) }, () => randomItem(productos));
        let subtotal = 0;
        const detalles = items.map((p) => {
            const cant = randomInt(5, 30);
            const precio = Number(p.precioCompra);
            const lineSub = precio * cant;
            subtotal += lineSub;
            return {
                idProducto: p.idProducto,
                cantidad: cant,
                precioCompra: precio,
                subtotal: lineSub,
            };
        });
        const igv = subtotal * IGV;
        const total = subtotal + igv;
        await prisma.compra.create({
            data: {
                fecha: daysAgo(randomInt(1, 60)),
                subtotal,
                igv,
                total,
                numeroFactura: `F001-${String(1000 + i).padStart(5, '0')}`,
                idProveedor: randomItem(proveedores).idProveedor,
                idUsuario: admin.idUsuario,
                detalles: { create: detalles },
            },
        });
    }
}
async function seedVentas(usuarios, clientes, metodos, productos, cantidad) {
    console.log(`💰 Ventas (${cantidad})...`);
    if (!metodos.length) {
        console.warn('   Sin métodos de pago, se omiten ventas.');
        return;
    }
    for (let i = 0; i < cantidad; i++) {
        const numItems = randomInt(1, 5);
        const items = [];
        for (let j = 0; j < numItems; j++) {
            items.push(randomItem(productos));
        }
        let subtotal = 0;
        let igv = 0;
        const detalles = items.map((p) => {
            const cant = randomInt(1, 4);
            const precio = Number(p.precioVenta);
            const descuento = Math.random() > 0.85 ? randomInt(1, 5) : 0;
            const lineSub = precio * cant - descuento;
            subtotal += lineSub;
            if (p.tieneIgv)
                igv += lineSub * IGV;
            return {
                idProducto: p.idProducto,
                cantidad: cant,
                precioUnitario: precio,
                descuento,
                subtotal: lineSub,
            };
        });
        const total = subtotal + igv;
        const usuario = randomItem(usuarios);
        const cliente = Math.random() > 0.3 ? randomItem(clientes) : null;
        const venta = await prisma.venta.create({
            data: {
                fecha: daysAgo(randomInt(0, 30)),
                subtotal,
                igv,
                total,
                tipoComprobante: Math.random() > 0.5 ? 'BOLETA' : 'FACTURA',
                numeroComprobante: `B001-${String(5000 + i).padStart(6, '0')}`,
                idCliente: cliente?.idCliente,
                idUsuario: usuario.idUsuario,
                idMetodo: randomItem(metodos).idMetodo,
                detalles: { create: detalles },
            },
        });
        for (const d of detalles) {
            const prod = productos.find((p) => p.idProducto === d.idProducto);
            const stockAnterior = prod.stock;
            const stockNuevo = Math.max(0, stockAnterior - d.cantidad);
            prod.stock = stockNuevo;
            await prisma.producto.update({
                where: { idProducto: d.idProducto },
                data: { stock: stockNuevo },
            });
            await prisma.movimientoInventario.create({
                data: {
                    idProducto: d.idProducto,
                    tipoMovimiento: 'SALIDA',
                    motivo: `VENTA-${venta.idVenta}`,
                    cantidad: d.cantidad,
                    stockAnterior,
                    stockNuevo,
                },
            });
        }
    }
}
async function main() {
    console.log('🌱 Seed masivo — minimarket_licoreria');
    console.log(`   Modo: ${RESET ? 'RESET (limpia y recrea)' : 'INSERTAR (conserva datos)'}\n`);
    if (RESET) {
        await limpiarTablas();
    }
    const { roles } = await seedCatalogos();
    const metodosDb = await prisma.metodoPago.findMany();
    const unidadesDb = await prisma.unidadMedida.findMany();
    const categoriasDb = await prisma.categoria.findMany();
    const marcasDb = await prisma.marca.findMany();
    const proveedoresDb = await prisma.proveedor.findMany();
    const usuarios = await seedUsuarios(roles);
    const clientes = await seedClientes(50);
    const productos = await seedProductos(categoriasDb, marcasDb, unidadesDb);
    await seedCompras(proveedoresDb, usuarios, productos, 25);
    await seedVentas(usuarios, clientes, metodosDb, productos, 120);
    const counts = {
        roles: await prisma.rol.count(),
        usuarios: await prisma.usuario.count(),
        categorias: await prisma.categoria.count(),
        marcas: await prisma.marca.count(),
        unidades: await prisma.unidadMedida.count(),
        proveedores: await prisma.proveedor.count(),
        productos: await prisma.producto.count(),
        clientes: await prisma.cliente.count(),
        ventas: await prisma.venta.count(),
        compras: await prisma.compra.count(),
        movimientos: await prisma.movimientoInventario.count(),
    };
    console.log('\n✅ Seed completado:\n');
    console.table(counts);
    console.log('\n🔑 Usuarios (password: 123456):');
    seed_data_1.USUARIOS.forEach((u) => console.log(`   - ${u.usuario} (${u.rol})`));
}
main()
    .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
});
//# sourceMappingURL=seed.js.map