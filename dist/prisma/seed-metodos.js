"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding métodos de pago...');
    const metodos = [
        { nombre: 'Efectivo' },
        { nombre: 'Yape' },
    ];
    for (const metodo of metodos) {
        const existing = await prisma.metodoPago.findFirst({
            where: { nombre: metodo.nombre },
        });
        if (!existing) {
            await prisma.metodoPago.create({
                data: metodo,
            });
            console.log(`✓ Método de pago "${metodo.nombre}" creado`);
        }
        else {
            console.log(`✓ Método de pago "${metodo.nombre}" ya existe`);
        }
    }
    console.log('Seed completado');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed-metodos.js.map