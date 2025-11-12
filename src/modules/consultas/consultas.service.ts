import { prisma } from '../../config/prisma';
import { cadastroProvider, debitosProvider } from './providers/registry';

// recria o enum conforme o schema.prisma
enum ConsultaStatus {
  PROCESSANDO = 'PROCESSANDO',
  CONCLUIDA = 'CONCLUIDA',
  ERRO = 'ERRO',
}

export async function processaConsultaAsync(consultaId: string) {
  try {
    const consulta = await prisma.consulta.findUnique({ where: { id: consultaId } });
    if (!consulta) return;

    const [cad, deb] = await Promise.all([
      cadastroProvider.consultaPorPlaca(consulta.placa),
      debitosProvider.consultarDebitos(consulta.placa, consulta.cpfCnpj),
    ]);

    await prisma.$transaction(async (tx: { debito: { createMany: (arg0: { data: { consultaId: string; tipo: string; anoExercicio: number | null; descricao: string | null; valorPrincipal: number | null; jurosMulta: number | null; valorTotal: number | null; orgao: string | null; situacao: string | null; }[]; }) => any; }; consulta: { update: (arg0: { where: { id: string; }; data: { resumoDebitos: { total: number; possuiDebitos: boolean; }; valorFipe?: { referencia?: string; valor?: number; } | undefined; dadosCadastrais?: { chassi?: string; renavam?: string; uf?: string; } | undefined; status: ConsultaStatus; }; }) => any; }; providerEvento: { create: (arg0: { data: { consultaId: string; provider: string; tipo: string; payload: { cadHit: boolean; debitos: number; }; }; }) => any; }; }) => {
      if (deb.itens?.length) {
        await tx.debito.createMany({
          data: deb.itens.map((d) => ({
            consultaId,
            tipo: d.tipo,
            anoExercicio: d.anoExercicio ?? null,
            descricao: d.descricao ?? null,
            valorPrincipal: d.valorPrincipal ?? null,
            jurosMulta: d.jurosMulta ?? null,
            valorTotal: d.valorTotal ?? null,
            orgao: d.orgao ?? null,
            situacao: d.situacao ?? null,
          })),
        });
      }

      await tx.consulta.update({
        where: { id: consultaId },
        data: {
          status: ConsultaStatus.CONCLUIDA,
          ...(cad.dadosCadastrais && { dadosCadastrais: cad.dadosCadastrais }),
          ...(cad.valorFipe && { valorFipe: cad.valorFipe }),
          resumoDebitos: { total: deb.total, possuiDebitos: deb.total > 0 },
        },
      });

      await tx.providerEvento.create({
        data: {
          consultaId,
          provider: process.env.USE_MOCK_PROVIDERS === 'true' ? 'MOCK' : 'REAL',
          tipo: 'CONCLUSAO',
          payload: { cadHit: !!cad.dadosCadastrais, debitos: deb.itens?.length ?? 0 },
        },
      });
    });
  } catch (e) {
    await prisma.consulta.update({
      where: { id: consultaId },
      data: { status: ConsultaStatus.ERRO },
    });
    await prisma.providerEvento.create({
      data: {
        consultaId,
        provider: 'PROCESSADOR',
        tipo: 'ERRO',
        payload: { message: String(e) },
      },
    });
  }
}
