import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.consulta.deleteMany(); // ambiente dev

  const base = [
    { placa: 'ABC1D23', cpfCnpj: '12345678909' },
    { placa: 'JKL9M87', cpfCnpj: '11122233344' }
  ];

  for (const b of base) {
    const c = await prisma.consulta.create({
      data: { placa: b.placa, cpfCnpj: b.cpfCnpj, status: 'PROCESSANDO' }
    });
    // dispara processamento mock
    // eslint-disable-next-line no-await-in-loop
    await prisma.providerEvento.create({
      data: { consultaId: c.id, provider: 'SEED', tipo: 'CRIADA', payload: b }
    });
  }
}

main().then(async () => {
  console.log('Seed disparado. Rode /consultas para ver o progresso.');
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
