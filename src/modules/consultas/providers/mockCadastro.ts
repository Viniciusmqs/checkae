import cadastro from '../__fixtures__/cadastro.json';
import type { CadastroProvider, PlacaResult } from './types';

const sleep = (ms:number)=> new Promise(r=>setTimeout(r, ms));

export const mockCadastroProvider: CadastroProvider = {
  async consultaPorPlaca(placa: string): Promise<PlacaResult> {
    if (process.env.MOCK_LATENCY_MS) await sleep(Number(process.env.MOCK_LATENCY_MS));
    const key = String(placa).toUpperCase();
    const hit = (cadastro as any)[key];
    return hit ?? {};
  }
};
