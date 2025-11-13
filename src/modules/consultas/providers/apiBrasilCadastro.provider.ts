import axios from "axios";
import {
  CadastroProvider,
  PlacaResult,
  ApiBrasilPlacaDadosResponse,
  ApiBrasilPlacaFipeResponse,
} from "./types";

import {
  mapPlacaDadosToVehicleCadastro,
  mapPlacaFipeToVehicleFipe,
} from "./mappers";

const API = process.env.APIBRASIL_BASE_URL;
const TOKEN = process.env.APIBRASIL_TOKEN;

export const apiBrasilCadastroProvider: CadastroProvider = {
  async consultaPorPlaca(placa: string): Promise<PlacaResult> {
    const headers = {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    };

    try {
      // 1. Placa Dados
      const dadosRes = await axios.post<ApiBrasilPlacaDadosResponse>(
        `${API}/api/v2/vehicles/dados`,
        { placa },
        { headers }
      );

      const dados = !dadosRes.data.error
        ? mapPlacaDadosToVehicleCadastro(dadosRes.data)
        : undefined;

      // 2. FIPE
      const fipeRes = await axios.post<ApiBrasilPlacaFipeResponse>(
        `${API}/api/v2/vehicles/fipe`,
        { placa },
        { headers }
      );

      const fipe = !fipeRes.data.error
        ? mapPlacaFipeToVehicleFipe(fipeRes.data)
        : undefined;

      return {
        dadosCadastrais: dados,
        valorFipe: fipe,
      };
    } catch (err: any) {
      console.error("Erro API Brasil cadastro:", err.response?.data || err);
      return {};
    }
  },
};
