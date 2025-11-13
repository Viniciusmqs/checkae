// Tipos de domínio internos que o serviço de consultas usa.

// Resumo cadastral do veículo, baseado em Placa Dados / CSV Completa
export interface VehicleCadastroSummary {
  placa: string;
  ufPlaca: string;
  municipio: string;
  marca: string;
  modelo: string;
  versao?: string;
  anoFabricacao: number;
  anoModelo: number;
  cor: string;
  chassi: string;
  tipoVeiculo: string;
  combustivel: string;
  quantidadePassageiros: number;
  situacaoVeiculo: string;
  origem?: string;
  logoUrl?: string;
}

// Resumo de valor de referência, baseado na Placa FIPE
export interface VehicleFipeSummary {
  codigoFipe: string;
  modelo: string;
  marca: string;
  anoModelo: string;
  combustivel: string;
  valor: number; // valor numérico já normalizado
  mesReferencia: string;
  ipva?: number;
}

// Resultado agregado de uma consulta de placa
export interface PlacaResult {
  dadosCadastrais?: VehicleCadastroSummary;
  valorFipe?: VehicleFipeSummary;
}

// Item de débito individual (multas, IPVA, licenciamento etc)
export interface DebitoItem {
  tipo: string; // ex: "MULTA", "LICENCIAMENTO", "IPVA", "OUTRO"
  anoExercicio?: number;
  descricao?: string;
  valorPrincipal?: number;
  jurosMulta?: number;
  valorTotal?: number;
  orgao?: string;
  situacao?: string;
}

// Resultado consolidado de débitos
export interface DebitosResult {
  itens: DebitoItem[];
  total: number;
}

// Contratos dos providers que o serviço consome.
// Hoje implementados pelos mocks, depois pelos providers reais da API Brasil.

export interface CadastroProvider {
  consultaPorPlaca(placa: string): Promise<PlacaResult>;
}

export interface DebitosProvider {
  consultarDebitos(placa: string, cpfCnpj?: string): Promise<DebitosResult>;
}

// Tipos de requisição da base 001 da API Brasil (tipo, placa etc)
export type ApiBrasilBaseTipo =
  | "multas"
  | "leilao"
  | "multas-prf"
  | "roubo-furto"
  | "veicular-debitos"
  | "csv-renainf-renajud-bin-proprietario";

export interface ApiBrasilBaseRequest {
  tipo: ApiBrasilBaseTipo;
  placa?: string;
  renavam?: string;
  homolog?: boolean;
}

// A partir daqui, tipos brutos das respostas da API Brasil,
// para você usar nos providers reais e mapeadores.

// Placa Dados - resposta bruta
export interface ApiBrasilPlacaDadosResponse {
  error: boolean;
  message: string;
  response: {
    MARCA: string;
    MODELO: string;
    SUBMODELO: string;
    VERSAO: string;
    ano: string;
    anoModelo: string;
    chassi: string;
    codigoRetorno: string;
    codigoSituacao: string;
    cor: string;
    data: string;
    dataAtualizacaoAlarme: string | null;
    dataAtualizacaoCaracteristicasVeiculo: string | null;
    dataAtualizacaoRouboFurto: string | null;
    extra: {
      ano_fabricacao: string;
      ano_modelo: string;
      caixa_cambio: string;
      cap_maxima_tracao: string;
      capacidade_carga: string;
      carroceria: string;
      chassi: string;
      cilindradas: string;
      combustivel: { combustivel: string };
      cor_veiculo: { cor: string };
      data_atualiacao: string;
      di: string;
      eixo_traseiro_dif: string;
      eixos: string;
      especie_veiculo: string;
      faturado: string;
      id: string;
      ident_importadora: string;
      limite_restricao_trib: string;
      linha: string;
      marca_modelo: {
        grupo: string;
        marca: string;
        modelo: string;
        segmento: string;
        sub_segmento: string | null;
        version: string | null;
      };
      motor: string;
      municipio: { municipio: string; uf: string };
      nacionalidade: { nacionalidade: string };
      peso_bruto_total: string;
      placa: string;
      placa_modelo_antigo: string;
      placa_modelo_novo: string;
      placa_nova: string;
      potencia: string;
      quantidade_passageiro: string;
      registro_di: string;
      situacao_chassi: string;
      situacao_veiculo: string;
      terceiro_eixo: string;
      tipo_carroceria: { carroceria: string };
      tipo_cilindrada: string;
      tipo_doc_faturado: { tipo_pessoa: string };
      tipo_doc_importadora: string;
      tipo_doc_prop: { tipo_pessoa: string };
      tipo_montagem: string;
      tipo_potencia: string;
      tipo_veiculo: { tipo_veiculo: string };
      uf_faturado: string;
      uf_placa: string;
      ultima_atualizacao: string;
      unidade_local_srf: string;
    };
    listamodelo: string[];
    logo: string;
    marca: string;
    mensagemRetorno: string;
    message: string;
    modelo: string;
    municipio: string;
    origem: string;
    placa: string;
    placa_alternativa: string;
    situacao: string;
    uf: string;
  };
  api_limit: number;
  api_limit_for: string;
  api_limit_used: number;
}

// Placa FIPE - resposta bruta
export interface ApiBrasilPlacaFipeResponse {
  error: boolean;
  message: string;
  response: {
    Valor: string;
    Marca: string;
    Modelo: string;
    AnoModelo: string;
    Combustivel: string;
    CodigoFipe: string;
    MesReferencia: string;
    Autenticacao: string;
    TipoVeiculo: number;
    SiglaCombustivel: string;
    DataConsulta: string;
    cilindradas: string;
    potencia: string;
    cor: string;
    uf: string;
    municipio: string;
    extra: boolean;
    chassi: string;
    logo: string;
    ipva: string;
  };
  api_limit: number;
  api_limit_for: string;
  api_limit_used: number;
}

// Multas + Boletos - base 001, tipo "multas"
export interface ApiBrasilBaseMultasBoletosResponse {
  user: {
    first_name: string;
    email: string;
    cellphone: string;
    notification: string;
  };
  balance: string;
  error: boolean;
  message: string;
  homolog: boolean;
  data: {
    chassi: string;
    data_hora_resposta: string;
    ocorrencias: Array<{
      codigo_barras: string;
      data_emissao: string;
      data_final_pgto: string;
      data_referencia: string;
      data_vencimento: string;
      descricao: string;
      guid_pgto: string;
      identificador: string;
      linha_digitavel: string;
      quota: string;
      status_pgto: string;
      subtotal: string;
      tipo: string;
      total: string;
    }>;
    pdf: string;
    placa: string;
    quantidade_ocorrencias: string;
    renavam: string;
    status_retorno: {
      codigo: string;
      descricao: string;
    };
  };
}

// Multas PRF - base 001, tipo "multas-prf"
export interface ApiBrasilBaseMultasPrfResponse {
  user: {
    first_name: string;
    email: string;
    cellphone: string;
    notification: string;
  };
  balance: string;
  error: boolean;
  message: string;
  homolog: string | boolean;
  data: {
    mensagem: string;
    placa: string;
    renavam: string;
    multas: Array<unknown>;
  };
}

// Roubo / Furto - base 001, tipo "roubo-furto"
export interface ApiBrasilBaseRouboFurtoResponse {
  user: {
    first_name: string;
    email: string;
    cellphone: string;
    notification: string;
  };
  balance: string;
  error: boolean;
  message: string;
  homolog: boolean;
  data: {
    situacao: string;
    ocorrencia: string;
    placa: string;
    municipio: string;
    uf: string;
    renavam: string;
    documento: string;
    ultima_atualizacao: string;
    chassi: string;
    remarcacao_do_chassi: string;
    montagem: string;
    motor: string;
    caixa_cambio: string;
    num_carroceria: string;
    num_eixo: string;
    num_eixo_aux: string;
    aux: string;
    marca: string;
    tipo_veiculo: string;
    ano_fabricacao: string;
    ano_modelo: string;
    procedencia: string;
    especie: string;
    combustivel: string;
    cilindrada: string;
    cor: string;
    potencia: string;
    capacidade_passageiros: string;
    capacidade_carga: string;
    cmt: string;
    pbt: string;
    restricao: string;
    restricao2: string;
    restricao3: string;
    restricao4: string;
    restricao5: string;
    restricao6: string;
    restricao7: string;
    restricao8: string;
    restricao9: string;
    indicador: {
      houvedeclaracaoderouboefurto: string;
      houverecuperacaoderouboefurto: string;
      houvedevolucaoderouboefurto: string;
    };
    rouboFurto: Array<{
      categoria_ocorrencia: string;
      ano: string;
      orgao_seguranca: string;
      boletim: string;
      numero_ocorrencia: string;
      tipo_declaracao: string;
      data_ocorrencia: string;
      informante: string;
      dddinformante: string;
      telinformante: string;
      docinformante: string;
      municipioocorrencia: string;
      alarme: string;
    }>;
  };
}

// Débitos veiculares - base 001, tipo "veicular-debitos"
export interface ApiBrasilVeicularDebitosResponse {
  user: {
    first_name: string;
    email: string;
    cellphone: string;
    notification: string;
  };
  balance: string;
  error: boolean;
  message: string;
  homolog: string | boolean;
  data: {
    resumo: {
      placa: string;
      valorTotal: number;
    };
    multas: {
      msg: string;
      quantidade: number;
      valorTotal: number;
      listagem: Array<{
        identificador: string;
        fonte: string;
        uf: string;
        descricao: string;
        valor: number;
        dataVencimento: string;
        dataHoraMulta: string;
        linhaDigitavel: string;
        local: string;
      }>;
    };
    multasNotificacoes: {
      msg: string;
      quantidade: number;
      valorTotal: number;
      listagem: Array<unknown>;
    };
    licenciamento: {
      msg: string;
      valorTotal: number;
      listagem: Array<{
        ano: number;
        valor: number;
        atrasado: string;
        linhaDigitavel: string;
        dataVencimento: string;
      }>;
    };
    ipva: {
      msg: string;
      valorTotal: number;
      listagem: Array<{
        ano: number;
        valor: number;
        atrasado: string;
        linhaDigitavel: string;
        dataVencimento: string;
      }>;
    };
    dpvat: {
      msg: string;
      valorTotal: number;
      listagem: Array<unknown>;
    };
    dividaAtiva: {
      msg: string;
      valorTotal: number;
      listagem: Array<unknown>;
    };
    outrosDebitos: {
      msg: string;
      valorTotal: number;
      listagem: Array<unknown>;
    };
  };
}

// API CSV Completa - base 001, tipo "csv-renainf-renajud-bin-proprietario"
export interface ApiBrasilCsvCompletaResponse {
  user: {
    first_name: string;
    email: string;
    cellphone: string;
    notification: string;
  };
  balance: string;
  error: boolean;
  message: string;
  homolog: boolean;
  data: Array<{
    pdf: string;
    veicular: {
      alerta_indicio?: {
        descricao_ocorrencia: string;
        existe_ocorrencia: string;
        status_retorno: {
          codigo: string;
          descricao: string;
        };
      };
      bin_nacional?: {
        ano_fabricacao: string;
        ano_modelo: string;
        chassi: string;
        marca_modelo: string;
        municipio: string;
        placa: string;
        tipo_veiculo: string;
        cor_veiculo: string;
        combustivel: string;
        quantidade_passageiros: string;
        renavam: string;
        situacao: string;
        uf: string;
        categoria_veiculo?: string;
        // Mantemos o resto mais genérico por enquanto
        [key: string]: unknown;
      };
      proprietario_atual_veiculo?: {
        ano_fabricacao: string;
        ano_modelo: string;
        chassi: string;
        combustivel: string;
        cor_veiculo: string;
        marca_modelo: string;
        motor: string;
        municipio: string;
        placa: string;
        proprietario_documento: string;
        proprietario_nome: string;
        renavam: string;
        uf: string;
        status_retorno: {
          codigo: string;
          descricao: string;
        };
      };
      csv?: {
        mensagem_observacao: string;
        ocorrencias: Array<unknown>;
        quantidade_ocorrencia: string;
        status_retorno: {
          codigo: string;
          descricao: string;
        };
      };
      precificador?: {
        ocorrencias: Array<{
          ano_modelo: string;
          chassi: string;
          codigo: string;
          combustivel: string;
          fabricante_modelo: string;
          informante: string;
          preco: string;
          preco_medio: string;
          vigencia: string;
        }>;
        status_retorno: {
          codigo: string;
          descricao: string;
        };
      };
      recall?: {
        ano_fabricacao: string;
        ano_modelo: string;
        chassi: string;
        marca_modelo: string;
        placa: string;
        quantidade_ocorrencias: string;
        status_retorno: {
          codigo: string;
          descricao: string;
        };
      };
      renainf?: {
        ocorrencias: Array<unknown>;
        qtd_ocorrencias: string;
        status_retorno: {
          codigo: string;
          descricao: string;
        };
      };
      renajud?: {
        msg_alerta: string;
        quantidade_ocorrencias: string;
        status_retorno: {
          codigo: string;
          descricao: string;
        };
      };
      [key: string]: unknown;
    };
  }>;
}

// Caso de leilao - ainda não temos exemplo de resposta, então deixo genérico.
export interface ApiBrasilBaseLeilaoResponse {
  user: {
    first_name: string;
    email: string;
    cellphone: string;
    notification: string;
  };
  balance: string;
  error: boolean;
  message: string;
  homolog: string | boolean;
  data: unknown;
}

// MULTAS (Boletos)
export interface ApiBrasilMultasResponse {
  user: any;
  balance: string;
  error: boolean;
  message: string;
  homolog: boolean;
  data: {
    chassi: string;
    data_hora_resposta: string;
    ocorrencias: {
      codigo_barras: string;
      data_emissao: string;
      data_final_pgto: string;
      data_referencia: string;
      data_vencimento: string;
      descricao: string;
      guid_pgto: string;
      identificador: string;
      linha_digitavel: string;
      quota: string;
      status_pgto: string;
      subtotal: string;
      tipo: string;
      total: string;
    }[];
    pdf: string;
    placa: string;
    quantidade_ocorrencias: string;
    renavam: string;
    status_retorno: {
      codigo: string;
      descricao: string;
    };
  };
}

// MULTAS PRF
export interface ApiBrasilMultasPrfResponse {
  user: any;
  balance: string;
  error: boolean;
  message: string;
  homolog: string;
  data: {
    mensagem: string;
    placa: string;
    renavam: string;
    multas: any[];
  };
}

// ROUBO E FURTO
export interface ApiBrasilRouboFurtoResponse {
  user: any;
  balance: string;
  error: boolean;
  message: string;
  homolog: boolean;
  data: {
    situacao: string;
    ocorrencia: string;
    placa: string;
    municipio: string;
    uf: string;
    renavam: string;
    documento: string;
    ultima_atualizacao: string;
    chassi: string;
    remarcacao_do_chassi: string;
    montagem: string;
    motor: string;
    caixa_cambio: string;
    num_carroceria: string;
    num_eixo: string;
    num_eixo_aux: string;
    aux: string;
    marca: string;
    tipo_veiculo: string;
    ano_fabricacao: string;
    ano_modelo: string;
    procedencia: string;
    especie: string;
    combustivel: string;
    cilindrada: string;
    cor: string;
    potencia: string;
    capacidade_passageiros: string;
    capacidade_carga: string;
    cmt: string;
    pbt: string;
    restricao: string;
    // reduzido para não explodir seu schema
    indicador: any;
    rouboFurto: any[];
  };
}

// LEILAO
export interface ApiBrasilLeilaoResponse {
  user: any;
  balance: string;
  error: boolean;
  message: string;
  homolog: boolean;
  data: any; // a API varia muito — podemos refinar depois
}

// CSV COMPLETO
export interface ApiBrasilCsvCompletoResponse {
  user: any;
  balance: string;
  error: boolean;
  message: string;
  homolog: boolean;
  data: any[];
}
