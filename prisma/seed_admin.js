const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('123456', 10);

  const adminRole = await prisma.rol.findFirst({
    where: {
      nombre: 'Administrador'
    }
  });

  if (!adminRole) {
    throw new Error('No existe el rol Administrador');
  }

  await prisma.usuario.upsert({
    where: {
      usuario: 'carlos'
    },
    update: {
      passwordHash,
      idRol: adminRole.idRol,
      estado: true
    },
    create: {
      nombres: 'Carlos',
      apellidos: 'Administrador',
      usuario: 'carlos',
      passwordHash,
      estado: true,
      idRol: adminRole.idRol
    }
  });

  console.log('✅ Usuario admin creado');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());