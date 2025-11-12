import debitos from '../__fixtures__/debitos.json';
import type { DebitosProvider } from './types';

const sleep = (ms:number)=> new Promise(r=>setTimeout(r, ms));

export const mockDebitosProvider: DebitosProvider = {
  async consultarDebitos(placa: string) {
    if (process.env.MOCK_LATENCY_MS) await sleep(Number(process.env.MOCK_LATENCY_MS));
    const key = String(placa).toUpperCase();
    const hit = (debitos as any)[key] ?? { itens: [], total: 0 };
    return { itens: hit.itens ?? [], total: Number(hit.total ?? 0) };
  }
};
