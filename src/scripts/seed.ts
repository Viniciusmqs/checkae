import { PrismaClient } from '@prisma/client';
import { processaConsultaAsync } from '../modules/consultas/consultas.service';

const prisma = new PrismaClient();

async function main() {
  // apaga na ordem correta (filhos -> pai)
  await prisma.providerEvento.deleteMany();
  await prisma.debito.deleteMany();
  await prisma.consulta.deleteMany();

  const base = [
    { placa: 'ABC1D23', cpfCnpj: '12345678909' },
    { placa: 'JKL9M87', cpfCnpj: '11122233344' },
  ];

  for (const b of base) {
    const c = await prisma.consulta.create({
      data: { placa: b.placa, cpfCnpj: b.cpfCnpj, status: 'PROCESSANDO' },
    });

    // dispara o “processamento” mock para preencher dados
    // (não bloqueia o seed; se quiser aguardar, use await)
    // eslint-disable-next-line no-await-in-loop
    await processaConsultaAsync(c.id);
  }
}

main()
  .then(async () => {
    console.log('Seed concluído. Confira em GET /consultas.');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
