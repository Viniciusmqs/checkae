import axios from "axios";

import {
  DebitosProvider,
  ApiBrasilVeicularDebitosResponse,
  DebitosResult,
} from "./types";

import { mapVeicularDebitosToResult } from "./mappers";

const API = process.env.APIBRASIL_BASE_URL;
const TOKEN = process.env.APIBRASIL_TOKEN;

export const apiBrasilDebitosProvider: DebitosProvider = {
  async consultarDebitos(placa: string): Promise<DebitosResult> {
    const headers = {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    };

    try {
      const body = {
        tipo: "veicular-debitos",
        placa,
      };

      const result = await axios.post<ApiBrasilVeicularDebitosResponse>(
        `${API}/api/v2/vehicles/base/001/consulta`,
        body,
        { headers }
      );

      if (result.data.error) {
        return { itens: [], total: 0 };
      }

      return mapVeicularDebitosToResult(result.data);
    } catch (err: any) {
      console.error("Erro API Brasil débitos:", err.response?.data || err);
      return { itens: [], total: 0 };
    }
  },
};
