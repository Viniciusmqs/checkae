import axios from "axios";
import {
  ApiBrasilMultasResponse,
  ApiBrasilMultasPrfResponse,
  ApiBrasilRouboFurtoResponse,
  ApiBrasilLeilaoResponse,
  ApiBrasilCsvCompletoResponse,
} from "./types";

const API = process.env.APIBRASIL_BASE_URL;
const TOKEN = process.env.APIBRASIL_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

async function callBase001<T>(body: any): Promise<T | null> {
  try {
    const { data } = await axios.post<T>(
      `${API}/api/v2/vehicles/base/001/consulta`,
      body,
      { headers }
    );
    return data;
  } catch (err: any) {
    console.error("Erro API Brasil Base 001:", err.response?.data || err);
    return null;
  }
}

export const apiBrasilBase001Provider = {
  async consultarMultas(placa: string) {
    return await callBase001<ApiBrasilMultasResponse>({
      tipo: "multas",
      placa,
      homolog: true,
    });
  },

  async consultarMultasPrf(placa: string, renavam: string) {
    return await callBase001<ApiBrasilMultasPrfResponse>({
      tipo: "multas-prf",
      placa,
      renavam,
    });
  },

  async consultarRouboFurto(placa: string) {
    return await callBase001<ApiBrasilRouboFurtoResponse>({
      tipo: "roubo-furto",
      placa,
    });
  },

  async consultarLeilao(placa: string) {
    return await callBase001<ApiBrasilLeilaoResponse>({
      tipo: "leilao",
      placa,
    });
  },

  async consultarCSV(placa: string) {
    return await callBase001<ApiBrasilCsvCompletoResponse>({
      tipo: "csv-renainf-renajud-bin-proprietario",
      placa,
      homolog: true,
    });
  },
};
