// src/lib/api.ts

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3333";

export type JsonValue = any;

export type ConsultaStatus = "PROCESSANDO" | "CONCLUIDA" | "ERRO";

export interface Debito {
  id: string;
  consultaId: string;
  tipo: string;
  anoExercicio: number | null;
  descricao: string | null;
  valorPrincipal: number | null;
  jurosMulta: number | null;
  valorTotal: number | null;
  orgao: string | null;
  situacao: string | null;
  createdAt: string;
}

export interface ResumoDebitos {
  total: number;
  quantidade?: number;
  possuiDebitos: boolean;
  // pode ter outras coisas dentro do JSON bruto, mas por enquanto não precisamos tipar tudo
  [key: string]: JsonValue;
}

export interface ConsultaResumo {
  id: string;
  placa: string;
  cpfCnpj: string;
  status: ConsultaStatus;
  createdAt: string;
  dadosCadastrais: JsonValue | null;
  valorFipe: JsonValue | null;
  resumoDebitos: ResumoDebitos | null;
  multasResumo: JsonValue | null;
  multasPrf: JsonValue | null;
  rouboFurto: JsonValue | null;
  leilao?: JsonValue | null;
  csvCompleto: JsonValue | null;
}

export interface ProviderEvento {
  id: string;
  consultaId: string;
  provider: string;
  tipo: string;
  correlationId: string | null;
  payload: JsonValue | null;
  createdAt: string;
}

export interface ConsultaDetalhe extends ConsultaResumo {
  debitos: Debito[];
  eventos: ProviderEvento[];
}

// LISTA DE CONSULTAS (para /consultas)
export async function getConsultas(): Promise<ConsultaResumo[]> {
  const res = await fetch(`${API_BASE}/consultas`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar consultas");
  }

  return res.json();
}

// DETALHE DE UMA CONSULTA (para /consultas/[id])
export async function getConsultaById(
  id: string
): Promise<ConsultaDetalhe> {
  const res = await fetch(`${API_BASE}/consultas/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar detalhes da consulta");
  }

  return res.json();
}
