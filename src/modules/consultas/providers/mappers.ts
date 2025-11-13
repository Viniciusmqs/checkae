import {
  ApiBrasilPlacaDadosResponse,
  ApiBrasilPlacaFipeResponse,
  ApiBrasilVeicularDebitosResponse,
  VehicleCadastroSummary,
  VehicleFipeSummary,
  DebitoItem,
  DebitosResult,
} from "./types";

// Função utilitária para converter string de dinheiro tipo "R$ 1.158,88" em número
function parseMoney(value?: string | null): number {
  if (!value) return 0;
  return Number(
    value
      .replace("R$", "")
      .replace(/\u00A0/g, " ") // tira espaço não quebrável que às vezes vem em JSON
      .replace(/\./g, "")
      .replace(",", ".")
      .trim()
  );
}

// 1) Placa Dados -> VehicleCadastroSummary
export function mapPlacaDadosToVehicleCadastro(
  api: ApiBrasilPlacaDadosResponse
): VehicleCadastroSummary {
  const r = api.response;
  const extra = r.extra;

  return {
    placa: extra.placa || r.placa,
    ufPlaca: extra.uf_placa || r.uf,
    municipio: extra.municipio?.municipio || r.municipio,
    marca: r.marca || r.MARCA,
    modelo: r.modelo || r.MODELO,
    versao: r.VERSAO,
    anoFabricacao: Number(extra.ano_fabricacao),
    anoModelo: Number(extra.ano_modelo || r.anoModelo),
    cor: extra.cor_veiculo?.cor || r.cor,
    chassi: extra.chassi || r.chassi,
    tipoVeiculo: extra.tipo_veiculo?.tipo_veiculo || "Automovel",
    combustivel: extra.combustivel?.combustivel || "",
    quantidadePassageiros: Number(extra.quantidade_passageiro || "0"),
    situacaoVeiculo: r.situacao,
    origem: r.origem,
    logoUrl: r.logo,
  };
}

// 2) Placa FIPE -> VehicleFipeSummary
export function mapPlacaFipeToVehicleFipe(
  api: ApiBrasilPlacaFipeResponse
): VehicleFipeSummary {
  const r = api.response;

  return {
    codigoFipe: r.CodigoFipe,
    modelo: r.Modelo,
    marca: r.Marca,
    anoModelo: r.AnoModelo,
    combustivel: r.Combustivel,
    valor: parseMoney(r.Valor),
    mesReferencia: r.MesReferencia.trim(),
    ipva: parseMoney(r.ipva),
  };
}

// 3) Débitos veiculares base 001 -> DebitosResult
export function mapVeicularDebitosToResult(
  api: ApiBrasilVeicularDebitosResponse
): DebitosResult {
  const data = api.data;

  const itens: DebitoItem[] = [];

  // Multas avulsas
  if (data.multas && Array.isArray(data.multas.listagem)) {
    for (const multa of data.multas.listagem) {
      let anoExercicio: number | undefined;
      if (multa.dataHoraMulta) {
        const year = new Date(multa.dataHoraMulta).getFullYear();
        if (!Number.isNaN(year)) anoExercicio = year;
      }

      itens.push({
        tipo: "MULTA",
        anoExercicio,
        descricao: multa.descricao,
        valorPrincipal: multa.valor,
        valorTotal: multa.valor,
        orgao: multa.fonte,
        situacao: undefined, // a API não manda status claro aqui
      });
    }
  }

  // Licenciamento
  if (data.licenciamento && Array.isArray(data.licenciamento.listagem)) {
    for (const lic of data.licenciamento.listagem) {
      itens.push({
        tipo: "LICENCIAMENTO",
        anoExercicio: lic.ano,
        descricao: `Licenciamento ${lic.ano}`,
        valorPrincipal: lic.valor,
        valorTotal: lic.valor,
        orgao: "DETRAN",
        situacao: lic.atrasado === "SIM" ? "EM_ATRASO" : "EM_DIA",
      });
    }
  }

  // IPVA
  if (data.ipva && Array.isArray(data.ipva.listagem)) {
    for (const ipva of data.ipva.listagem) {
      itens.push({
        tipo: "IPVA",
        anoExercicio: ipva.ano,
        descricao: `IPVA ${ipva.ano}`,
        valorPrincipal: ipva.valor,
        valorTotal: ipva.valor,
        orgao: "SEFAZ",
        situacao: ipva.atrasado === "SIM" ? "EM_ATRASO" : "EM_DIA",
      });
    }
  }

  // Demais blocos (dpvat, dividaAtiva, outrosDebitos) você pode decidir mapear depois.
  // Por enquanto deixo só o total vindo de data.resumo.

  const total =
    typeof data.resumo?.valorTotal === "number"
      ? data.resumo.valorTotal
      : itens.reduce((acc, d) => acc + (d.valorTotal || 0), 0);

  return {
    itens,
    total,
  };
}
