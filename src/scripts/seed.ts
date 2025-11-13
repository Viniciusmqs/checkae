// src/scripts/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * MOCKS BASEADOS NOS EXEMPLOS DA API BRASIL
 * Aqui eu já pego só a parte "response" ou "data" que interessa.
 */

// Placa Dados - 92% Nacional (response)
const placaDadosResponse = {
  MARCA: "FORD",
  MODELO: "FIESTA FLEX",
  SUBMODELO: "FIESTA",
  VERSAO: "FLEX",
  ano: "2013",
  anoModelo: "2014",
  chassi: "08912",
  codigoRetorno: "0",
  codigoSituacao: "0",
  cor: "Preta",
  data: "08/06/2019 às 12:14:23",
  dataAtualizacaoAlarme: null,
  dataAtualizacaoCaracteristicasVeiculo: null,
  dataAtualizacaoRouboFurto: null,
  extra: {
    ano_fabricacao: "2013",
    ano_modelo: "2014",
    caixa_cambio: "",
    cap_maxima_tracao: "0",
    capacidade_carga: "0",
    carroceria: "",
    chassi: "9BFZF520232ABC2023",
    cilindradas: "999",
    combustivel: {
      combustivel: "Alcool / Gasolina",
    },
    cor_veiculo: {
      cor: "Preta",
    },
    data_atualiacao: "2019-01-11 00:00:00",
    di: "0",
    eixo_traseiro_dif: "",
    eixos: "2",
    especie_veiculo: "1",
    faturado: "12345",
    id: "12345",
    ident_importadora: "",
    limite_restricao_trib: "",
    linha: "12344",
    marca_modelo: {
      grupo: "FIESTA",
      marca: "FORD",
      modelo: "FORD/FIESTA FLEX",
      segmento: "Auto",
      sub_segmento: "AU - HATCH PEQUENO",
      version: null,
    },
    motor: "SM9AE82023",
    municipio: {
      municipio: "DIVINOPOLIS",
      uf: "MG",
    },
    nacionalidade: {
      nacionalidade: "Nacional",
    },
    peso_bruto_total: "151",
    placa: "ABC1234",
    placa_modelo_antigo: "ABC1234",
    placa_modelo_novo: "ABC1234",
    placa_nova: "f",
    potencia: "73",
    quantidade_passageiro: "5",
    registro_di: "",
    situacao_chassi: "N",
    situacao_veiculo: "S",
    terceiro_eixo: "",
    tipo_carroceria: {
      carroceria: "NAO APLICAVEL",
    },
    tipo_cilindrada: "cc",
    tipo_doc_faturado: {
      tipo_pessoa: "Juridica",
    },
    tipo_doc_importadora: "",
    tipo_doc_prop: {
      tipo_pessoa: "Fisica",
    },
    tipo_montagem: "1",
    tipo_potencia: "cv",
    tipo_veiculo: {
      tipo_veiculo: "Automovel",
    },
    uf_faturado: "MG",
    uf_placa: "MG",
    ultima_atualizacao: "2013-07-11 00:00:00",
    unidade_local_srf: "0000000",
  },
  listamodelo: ["FIESTA", "FLEX"],
  logo: "http://apiveiculos.com.br/logo/ford.png",
  marca: "FORD",
  mensagemRetorno: "Sem erros.",
  message: "",
  modelo: "FIESTA FLEX",
  municipio: "DIVINOPOLIS",
  origem: "NACIONAL",
  placa: "ABC1234",
  placa_alternativa: "ABC1234",
  situacao: "Sem restrição",
  uf: "MG",
};

// Placa FIPE - 92% Nacional (response)
const placaFipeResponse = {
  Valor: "R$ 28.972,00",
  Marca: "Ford",
  Modelo: "FORD/FIESTA FLEX",
  AnoModelo: "2013/2014",
  Combustivel: "Gasolina",
  CodigoFipe: "003380-4",
  MesReferencia: "janeiro de 2024 ",
  Autenticacao: "n80wg9c1zkrl",
  TipoVeiculo: 1,
  SiglaCombustivel: "G",
  DataConsulta: "quinta-feira, 18 de janeiro de 2024 14:31",
  cilindradas: "10.0",
  potencia: "73",
  cor: "Preta",
  uf: "MG",
  municipio: "DIVINOPOLIS",
  extra: true,
  chassi: "9BFZF55A0E8008912",
  logo: "https://apiveiculos.com.br/static/logos/ford.png",
  ipva: "R$ 1.158,88",
};

// Multas + Boletos (data)
const multasResumoData = {
  chassi: "",
  data_hora_resposta: "30/08/2025 19:54",
  ocorrencias: [
    {
      codigo_barras: "87690000001041305212526050142011322412307455",
      data_emissao: "",
      data_final_pgto: "",
      data_referencia: "",
      data_vencimento: "17/09/2025",
      descricao:
        "Multa - AH12345678 - TRANSITAR EM VELOCIDADE SUPERIOR A MAXIMA",
      guid_pgto: "30269a2a-9db0-4bbe-89b9-ca4bacea090e",
      identificador: "AH12345678",
      linha_digitavel: "876900000012041305212528605014201137224123074557",
      quota: "0",
      status_pgto: "EM ABERTO",
      subtotal: "10413",
      tipo: "3",
      total: "104,13",
    },
  ],
  pdf: "https://multas.apiveiculos.com.br/pdf/abc23",
  placa: "ABC1234",
  quantidade_ocorrencias: "1",
  renavam: "",
  status_retorno: {
    codigo: "1",
    descricao: "CONSULTA DE HOMOLOGAÇÃO!",
  },
};

// Multas PRF (data)
const multasPrfData = {
  mensagem: "Realizado com sucesso",
  placa: "OQH3A62",
  renavam: "123448928053",
  multas: [],
};

// Roubo / Furto (data)
const rouboFurtoData = {
  situacao: "BAIXADO",
  ocorrencia: "VEICULO INDICA OCORRENCIA DE ROUBO/FURTO",
  placa: "ABC1234",
  municipio: "CURITIBA/PR",
  uf: "PR",
  renavam: "1234567890",
  documento: "",
  ultima_atualizacao: "",
  chassi: "9BWZZZ32ZGP246344",
  remarcacao_do_chassi: "NORMAL",
  montagem: "COMPLETA",
  motor: "",
  caixa_cambio: "",
  num_carroceria: "INEXISTENTE",
  num_eixo: "0",
  num_eixo_aux: "",
  aux: "",
  marca: "VW/SANTANA CG",
  tipo_veiculo: "",
  ano_fabricacao: "1986",
  ano_modelo: "1986",
  procedencia: "",
  especie: "NAO ATRIBUIDO",
  combustivel: "",
  cilindrada: "0",
  cor: "Vermelha",
  potencia: "94",
  capacidade_passageiros: "0",
  capacidade_carga: "0",
  cmt: "0",
  pbt: "0",
  restricao: "",
  restricao2: "",
  restricao3: "",
  restricao4: "",
  restricao5: "",
  restricao6: "",
  restricao7: "",
  restricao8: "",
  restricao9: "",
  indicador: {
    houvedeclaracaoderouboefurto: "SIM",
    houverecuperacaoderouboefurto: "SIM",
    houvedevolucaoderouboefurto: "SIM",
  },
  rouboFurto: [
    {
      categoria_ocorrencia: "Alerta de Roubo/Furto",
      ano: "2020",
      orgao_seguranca: "2440",
      boletim: "1645884",
      numero_ocorrencia: "1645884",
      tipo_declaracao: "1 Roubado",
      data_ocorrencia: "31/10/2020",
      informante: "",
      dddinformante: "",
      telinformante: "",
      docinformante: "",
      municipioocorrencia: "SAO PAULO",
      alarme: "",
    },
  ],
};

// Débitos veiculares (data)
const veicularDebitosData = {
  resumo: {
    placa: "ABC1234",
    valorTotal: 2800.06,
  },
  multas: {
    msg: "",
    quantidade: 3,
    valorTotal: 455.55,
    listagem: [
      {
        identificador: "ABC123456",
        fonte: "MARICA",
        uf: "SP",
        descricao: "ESTACIONAR LOCAL/HORARIO DE ESTACIONAMENTO E PARAD",
        valor: 195.23,
        dataVencimento: "null",
        dataHoraMulta: "2024-12-08 08:10",
        linhaDigitavel: "null",
        local: "RUA SILVINO ALVES DE SIQUEIRA NR. 48 -MARICA",
      },
      {
        identificador: "ABC123456",
        fonte: "DER - MG",
        uf: "MG",
        descricao:
          "TRANSITAR EM VELOCIDADE SUPERIOR A MAXIMA PERMITID",
        valor: 130.16,
        dataVencimento: "null",
        dataHoraMulta: "2021-06-10 16:33",
        linhaDigitavel: "null",
        local: "RJ 106, Km 10,0 - Fx2 - St.Macae -SAO GONCALO",
      },
      {
        identificador: "ABC123456",
        fonte: "DER - GO",
        uf: "GO",
        descricao:
          "TRANSITAR EM VELOCIDADE SUPERIOR A MAXIMA PERMITID",
        valor: 130.16,
        dataVencimento: "null",
        dataHoraMulta: "2021-06-09 11:02",
        linhaDigitavel: "null",
        local:
          "RJ 124 PROX.KM 13,0 SENT.SAQUAREMA -RIO BONITO",
      },
    ],
  },
  multasNotificacoes: {
    msg: "",
    quantidade: 0,
    valorTotal: 0,
    listagem: [],
  },
  licenciamento: {
    msg: "",
    valorTotal: 361.67,
    listagem: [
      {
        ano: 2023,
        valor: 80.38,
        atrasado: "SIM",
        linhaDigitavel: "null",
        dataVencimento: "null",
      },
      {
        ano: 2025,
        valor: 281.29,
        atrasado: "SIM",
        linhaDigitavel: "null",
        dataVencimento: "2025-06-30",
      },
    ],
  },
  ipva: {
    msg: "",
    valorTotal: 1982.84,
    listagem: [
      {
        ano: 2025,
        valor: 1982.84,
        atrasado: "SIM",
        linhaDigitavel: "null",
        dataVencimento: "2025-03-31",
      },
    ],
  },
  dpvat: {
    msg: "",
    valorTotal: 0,
    listagem: [],
  },
  dividaAtiva: {
    msg: "",
    valorTotal: 0,
    listagem: [],
  },
  outrosDebitos: {
    msg: "",
    valorTotal: 0,
    listagem: [],
  },
};

// API CSV Completa (data[0])
const csvCompletoData = {
  pdf:
    "http://api-csv-renainf-renajud-bin-proprietario.apiveiculos.com.br/pdf/mockpdf",
  veicular: {
    alerta_indicio: {
      descricao_ocorrencia:
        "NENHUM ALERTA DE INDICIO DE SINISTRO ENCONTRADO NAS BASES CONSULTADAS",
      existe_ocorrencia: "0",
      status_retorno: {
        codigo: "1",
        descricao: "CONSULTA CONCLUIDA COM SUCESSO",
      },
    },
    bin_nacional: {
      alerta_informativo: "",
      ano_fabricacao: "2013",
      ano_modelo: "2014",
      caixa_cambio: "",
      capacidade_carga: "0",
      categoria_veiculo: "PARTICULAR",
      chassi: "9ZZZZ99Z9Z9999999",
      cilindrada: "",
      cmt: "0",
      codigo_do_orgao_srf: "",
      codigo_seguranca_crv: "",
      combustivel: "ALCOOL/GASOLINA",
      cor_veiculo: "PRETA",
      data_atualizacao: "",
      data_emissao_crlv: "06/12/2023",
      data_emissao_ultimo_crv: "06/12/2023",
      data_emplacamento: "",
      data_limite_restricao_tributaria: "",
      data_registro_di: "",
      especie_veiculo: "PASSAGEIRO",
      informacoes_avulsas: [],
      logo_fabricante: {
        imagem_url: "",
      },
      marca_modelo: "MARCA/MODELO FICTICIO",
      municipio: "CIDADE FICTICIA",
      numero_carroceria: "",
      numero_crv: "",
      numero_di: "",
      numero_eixo_auxiliar: "",
      numero_eixo_traseiro: "",
      numero_eixos: "2",
      numero_identificacao_faturado: "",
      numero_identificacao_importador: "",
      numero_motor: "",
      numero_processo_importacao: "",
      numero_reda: "",
      numero_sequencia_crv: "",
      numero_via_crlv: "",
      numero_via_crv: "",
      off_line: "0",
      pbt: "2",
      placa: "ABC1234",
      potencia_veiculo: "73",
      procedencia: "NACIONAL",
      proprietario: {
        documento: "00000000000",
        nome: "FULANO DE TAL",
      },
      quantidade_passageiros: "5",
      renavam: "00000000000",
      restricoes: {
        existe_restricao_geral: "0",
        existe_restricao_renajud: "0",
        existe_restricao_roubo_furto: "0",
        mensagens_restricoes: [],
        veiculo_baixado: "0",
      },
      situacao: "EM CIRCULACAO",
      situacao_chassi: "",
      status_retorno: {
        codigo: "1",
        descricao: "CONSULTA CONCLUIDA COM SUCESSO",
      },
      tipo_carroceria: "NAO APLICAVEL",
      tipo_documento_faturado: "",
      tipo_documento_importador: "",
      tipo_montagem: "",
      tipo_operacao_importacao_veiculo: "",
      tipo_veiculo: "AUTOMOVEL",
      uf: "XX",
      uf_faturamento: "",
    },
    csv: {
      mensagem_observacao:
        "LAUDO CSV CORTESIA COM DADOS FICTICIOS. CONSULTE BASES OFICIAIS PARA INFORMACOES REAIS.",
      ocorrencias: [],
      quantidade_ocorrencia: "0",
      status_retorno: {
        codigo: "1",
        descricao: "CONSULTA CONCLUIDA COM SUCESSO",
      },
    },
    precificador: {
      ocorrencias: [
        {
          ano_modelo: "2014",
          chassi: "",
          codigo: "000000-0",
          combustivel: "",
          fabricante_modelo: "MODELO FICTICIO 1.0 FLEX 5P",
          informante: "FIPE",
          preco: "00000,00",
          preco_medio: "",
          vigencia: "SETEMBRO DE 2025",
        },
      ],
      status_retorno: {
        codigo: "1",
        descricao: "CONSULTA CONCLUIDA COM SUCESSO",
      },
    },
    proprietario_atual_veiculo: {
      ano_fabricacao: "2013",
      ano_modelo: "2014",
      chassi: "9ZZZZ99Z9Z9999999",
      combustivel: "ALCO/GASOL",
      cor_veiculo: "PRETA",
      crlv: "",
      data_atualizacao: "",
      marca_modelo: "MARCA MODELO FICTICIO",
      motor: "FAKE1234567890",
      municipio: "CIDADE FICTICIA",
      placa: "ABC1234",
      proprietario_documento: "000.000.000-00",
      proprietario_nome: "FULANO DE TAL",
      renavam: "000000000",
      status_retorno: {
        codigo: "1",
        descricao: "CONSULTA CONCLUIDA COM SUCESSO",
      },
      uf: "XX",
    },
    recall: {
      ano_fabricacao: "",
      ano_modelo: "",
      chassi: "",
      marca_modelo: "",
      placa: "",
      quantidade_ocorrencias: "0",
      status_retorno: {
        codigo: "1",
        descricao: "CONSULTA CONCLUIDA COM SUCESSO",
      },
    },
    renainf: {
      ocorrencias: [],
      qtd_ocorrencias: "0",
      status_retorno: {
        codigo: "1",
        descricao: "CONSULTA CONCLUIDA COM SUCESSO",
      },
    },
    renajud: {
      msg_alerta: "",
      quantidade_ocorrencias: "0",
      status_retorno: {
        codigo: "1",
        descricao: "CONSULTA CONCLUIDA COM SUCESSO",
      },
    },
  },
};

async function main() {
  console.log("Limpando base...");

  await prisma.providerEvento.deleteMany();
  await prisma.debito.deleteMany();
  await prisma.consulta.deleteMany();

  console.log("Criando consulta mock completa com dados da API Brasil...");

  const consulta = await prisma.consulta.create({
    data: {
      placa: "ABC1234",
      cpfCnpj: "12345678900",
      status: "CONCLUIDA",
      dadosCadastrais: placaDadosResponse,
      valorFipe: placaFipeResponse,
      resumoDebitos: {
        origem: "veicular-debitos",
        total: veicularDebitosData.resumo.valorTotal,
        possuiDebitos: veicularDebitosData.resumo.valorTotal > 0,
        quantidade: veicularDebitosData.multas.quantidade,
        bruto: veicularDebitosData,
      },
      multasResumo: multasResumoData,
      multasPrf: multasPrfData,
      rouboFurto: rouboFurtoData,
      csvCompleto: csvCompletoData,
    },
  });

  console.log("Criando débitos detalhados...");

  // Multas -> Debito tipo MULTA
  const debitosMulta = veicularDebitosData.multas.listagem.map((m) => ({
    consultaId: consulta.id,
    tipo: "MULTA",
    anoExercicio: null,
    descricao: m.descricao,
    valorPrincipal: m.valor,
    jurosMulta: null,
    valorTotal: m.valor,
    orgao: m.fonte,
    situacao: "EM_ABERTO",
  }));

  // Licenciamento
  const debitosLic = veicularDebitosData.licenciamento.listagem.map((l) => ({
    consultaId: consulta.id,
    tipo: "LICENCIAMENTO",
    anoExercicio: l.ano,
    descricao: `Licenciamento ${l.ano}`,
    valorPrincipal: l.valor,
    jurosMulta: null,
    valorTotal: l.valor,
    orgao: "DETRAN",
    situacao: l.atrasado,
  }));

  // IPVA
  const debitosIpva = veicularDebitosData.ipva.listagem.map((i) => ({
    consultaId: consulta.id,
    tipo: "IPVA",
    anoExercicio: i.ano,
    descricao: `IPVA ${i.ano}`,
    valorPrincipal: i.valor,
    jurosMulta: null,
    valorTotal: i.valor,
    orgao: "SEFAZ",
    situacao: i.atrasado,
  }));

  const allDebitos = [...debitosMulta, ...debitosLic, ...debitosIpva];

  if (allDebitos.length) {
    await prisma.debito.createMany({
      data: allDebitos,
    });
  }

  console.log("Registrando evento de seed...");

  await prisma.providerEvento.create({
    data: {
      consultaId: consulta.id,
      provider: "SEED",
      tipo: "CARGA_MOCK_COMPLETA",
      payload: {
        message: "Consulta populada com dados mock baseados na API Brasil",
      },
    },
  });

  console.log("Seed concluído com sucesso.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
