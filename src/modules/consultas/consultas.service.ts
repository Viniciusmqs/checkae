import { prisma } from "../../config/prisma";
import {
  cadastroProvider,
  debitosProvider,
  multasProvider,
  prfProvider,
  rouboFurtoProvider,
  leilaoProvider,
  csvProvider,
} from "./providers/registry";
import { VehicleCadastroSummary, VehicleFipeSummary, ApiBrasilMultasResponse, ApiBrasilMultasPrfResponse, ApiBrasilRouboFurtoResponse, ApiBrasilLeilaoResponse, ApiBrasilCsvCompletoResponse } from "./providers/types";

// mesmo enum do schema.prisma
enum ConsultaStatus {
  PROCESSANDO = "PROCESSANDO",
  CONCLUIDA = "CONCLUIDA",
  ERRO = "ERRO",
}

export async function processaConsultaAsync(consultaId: string) {
  try {
    const consulta = await prisma.consulta.findUnique({
      where: { id: consultaId },
    });

    if (!consulta) return;

    // ======== CHAMADAS EM PARALELO ========
    const [
      cad,
      deb,
      multas,
      multasPrf,
      roubo,
      leilao,
      csv,
    ] = await Promise.all([
      cadastroProvider.consultaPorPlaca(consulta.placa),
      debitosProvider.consultarDebitos(consulta.placa, consulta.cpfCnpj),
      multasProvider.consultarMultas?.(consulta.placa),
      prfProvider.consultarMultasPrf?.(consulta.placa, consulta.cpfCnpj),
      rouboFurtoProvider.consultarRouboFurto?.(consulta.placa),
      leilaoProvider.consultarLeilao?.(consulta.placa),
      csvProvider.consultarCSV?.(consulta.placa),
    ]);

    // ======== SALVAMENTO NO BANCO ========
    await prisma.$transaction(async (tx: {
        debito: { createMany: (arg0: { data: { consultaId: string; tipo: string; anoExercicio: number | null; descricao: string | null; valorPrincipal: number | null; jurosMulta: number | null; valorTotal: number | null; orgao: string | null; situacao: string | null; }[]; }) => any; }; consulta: {
          update: (arg0: {
            where: { id: string; }; data: {
              status: ConsultaStatus;
              // blocos principais
              dadosCadastrais: VehicleCadastroSummary | undefined; valorFipe: VehicleFipeSummary | undefined; resumoDebitos: { possuiDebitos: boolean; total: number; quantidade: number; };
              // novos blocos
              multasResumo: ApiBrasilMultasResponse | undefined; multasPrf: ApiBrasilMultasPrfResponse | undefined; rouboFurto: ApiBrasilRouboFurtoResponse | undefined; leilao: ApiBrasilLeilaoResponse | undefined; csvCompleto: ApiBrasilCsvCompletoResponse | undefined;
            };
          }) => any;
        }; providerEvento: { create: (arg0: { data: { consultaId: string; provider: string; tipo: string; payload: { dadosCadastrais: boolean; totalDebitos: number; }; }; }) => any; };
      }) => {
      // salvar tabela Debito[]
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

      // atualizar a consulta em si (relatório)
      await tx.consulta.update({
        where: { id: consultaId },
        data: {
          status: ConsultaStatus.CONCLUIDA,

          // blocos principais
          dadosCadastrais: cad.dadosCadastrais ?? undefined,
          valorFipe: cad.valorFipe ?? undefined,
          resumoDebitos: {
            possuiDebitos: deb.total > 0,
            total: deb.total,
            quantidade: deb.itens?.length ?? 0,
          },

          // novos blocos
          multasResumo: multas ?? undefined,
          multasPrf: multasPrf ?? undefined,
          rouboFurto: roubo ?? undefined,
          leilao: leilao ?? undefined,
          csvCompleto: csv ?? undefined,
        },
      });

      // registrar evento
      await tx.providerEvento.create({
        data: {
          consultaId,
          provider:
            process.env.USE_REAL_PROVIDERS === "true" ? "REAL" : "MOCK",
          tipo: "CONCLUSAO",
          payload: {
            dadosCadastrais: !!cad.dadosCadastrais,
            totalDebitos: deb.total,
          },
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
        provider: "PROCESSADOR",
        tipo: "ERRO",
        payload: { message: String(e) },
      },
    });
  }
}
