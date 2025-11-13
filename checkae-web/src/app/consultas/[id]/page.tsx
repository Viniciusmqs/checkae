// src/app/consultas/[id]/page.tsx

import { getConsultaById } from "@/lib/api";

type ParamsPromise = Promise<{ id: string }>;

interface ConsultaDetalhePageProps {
  params: ParamsPromise;
}

export default async function ConsultaDetalhePage({
  params,
}: ConsultaDetalhePageProps) {
  // Next 16: params é uma Promise, então precisa do await
  const { id } = await params;

  let consulta;

  try {
    consulta = await getConsultaById(id);
  } catch (e) {
    console.error("Erro ao buscar consulta", e);
    return (
      <main className="min-h-screen bg-gray-50 p-6 md:p-10">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Erro ao carregar consulta
        </h1>
        <p className="text-sm text-gray-600">
          Não foi possível carregar os detalhes dessa consulta. 
          Confira se a API está rodando em{" "}
          <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
            http://localhost:3333
          </code>{" "}
          e se o id existe.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* HEADER */}
      <section className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Relatório da consulta
        </h1>
        <p className="text-sm text-gray-500">
          Placa <span className="font-mono font-medium">{consulta.placa}</span>{" "}
          • CPF/CNPJ{" "}
          <span className="font-mono font-medium">{consulta.cpfCnpj}</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Status: {consulta.status} • Criada em{" "}
          {new Date(consulta.createdAt).toLocaleString("pt-BR")}
        </p>
      </section>

      {/* BLOCO DADOS CADASTRAIS */}
      <section className="mb-6 bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">
          Dados cadastrais
        </h2>

        {consulta.dadosCadastrais ? (
          <pre className="text-xs text-gray-700 bg-gray-50 rounded-md p-3 overflow-auto">
            {JSON.stringify(consulta.dadosCadastrais, null, 2)}
          </pre>
        ) : (
          <p className="text-xs text-gray-500">
            Nenhum dado cadastral disponível para esta consulta.
          </p>
        )}
      </section>

      {/* BLOCO VALOR FIPE */}
      <section className="mb-6 bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">
          Valor de referência
        </h2>

        {consulta.valorFipe ? (
          <pre className="text-xs text-gray-700 bg-gray-50 rounded-md p-3 overflow-auto">
            {JSON.stringify(consulta.valorFipe, null, 2)}
          </pre>
        ) : (
          <p className="text-xs text-gray-500">
            Nenhum valor de referência registrado.
          </p>
        )}
      </section>

      {/* BLOCO RESUMO DÉBITOS */}
      <section className="mb-6 bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">
          Resumo de débitos
        </h2>

        {consulta.resumoDebitos ? (
          <pre className="text-xs text-gray-700 bg-gray-50 rounded-md p-3 overflow-auto">
            {JSON.stringify(consulta.resumoDebitos, null, 2)}
          </pre>
        ) : (
          <p className="text-xs text-gray-500">
            Nenhuma informação de débitos disponível.
          </p>
        )}
      </section>

      {/* BLOCO LISTA DE DÉBITOS */}
      <section className="mb-6 bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">
          Débitos detalhados
        </h2>

        {consulta.debitos.length ? (
          <pre className="text-xs text-gray-700 bg-gray-50 rounded-md p-3 overflow-auto">
            {JSON.stringify(consulta.debitos, null, 2)}
          </pre>
        ) : (
          <p className="text-xs text-gray-500">
            Nenhum débito cadastrado para esta consulta.
          </p>
        )}
      </section>

      {/* BLOCO MULTAS RESUMO */}
      <section className="mb-6 bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">
          Multas mais boletos
        </h2>

        {consulta.multasResumo ? (
          <pre className="text-xs text-gray-700 bg-gray-50 rounded-md p-3 overflow-auto">
            {JSON.stringify(consulta.multasResumo, null, 2)}
          </pre>
        ) : (
          <p className="text-xs text-gray-500">
            Nenhuma informação de multas e boletos disponível.
          </p>
        )}
      </section>

      {/* BLOCO MULTAS PRF */}
      <section className="mb-6 bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">
          Multas PRF
        </h2>

        {consulta.multasPrf ? (
          <pre className="text-xs text-gray-700 bg-gray-50 rounded-md p-3 overflow-auto">
            {JSON.stringify(consulta.multasPrf, null, 2)}
          </pre>
        ) : (
          <p className="text-xs text-gray-500">
            Nenhuma informação de multas PRF disponível.
          </p>
        )}
      </section>

      {/* BLOCO ROUBO / FURTO */}
      <section className="mb-6 bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">
          Roubo e furto
        </h2>

        {consulta.rouboFurto ? (
          <pre className="text-xs text-gray-700 bg-gray-50 rounded-md p-3 overflow-auto">
            {JSON.stringify(consulta.rouboFurto, null, 2)}
          </pre>
        ) : (
          <p className="text-xs text-gray-500">
            Nenhuma ocorrência de roubo ou furto registrada.
          </p>
        )}
      </section>

      {/* BLOCO CSV COMPLETO */}
      <section className="mb-10 bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">
          CSV completo
        </h2>

        {consulta.csvCompleto ? (
          <pre className="text-xs text-gray-700 bg-gray-50 rounded-md p-3 overflow-auto">
            {JSON.stringify(consulta.csvCompleto, null, 2)}
          </pre>
        ) : (
          <p className="text-xs text-gray-500">
            Nenhum dado de CSV completo disponível.
          </p>
        )}
      </section>
    </main>
  );
}
