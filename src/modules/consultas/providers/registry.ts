import { mockCadastroProvider } from './mockCadastro';
import { mockDebitosProvider } from './mockDebitos';
// Futuro: importe apibrasil/celcoin reais

const USE_MOCK = process.env.USE_MOCK_PROVIDERS === 'true';

export const cadastroProvider = USE_MOCK
  ? mockCadastroProvider
  : mockCadastroProvider; // trocaremos depois pelo real

export const debitosProvider = USE_MOCK
  ? mockDebitosProvider
  : mockDebitosProvider;  // trocaremos depois pelo real
