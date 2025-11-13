import { mockCadastroProvider } from "./mockCadastro";
import { mockDebitosProvider } from "./mockDebitos";

import { apiBrasilCadastroProvider } from "./apiBrasilCadastro.provider";
import { apiBrasilDebitosProvider } from "./apiBrasilDebitos.provider";
import { apiBrasilBase001Provider } from "./apiBrasilBase001.provider";

const USE_REAL = process.env.USE_REAL_PROVIDERS === "true";

export const cadastroProvider =
  USE_REAL ? apiBrasilCadastroProvider : mockCadastroProvider;

export const debitosProvider =
  USE_REAL ? apiBrasilDebitosProvider : mockDebitosProvider;

// novos providers reais
export const multasProvider = USE_REAL ? apiBrasilBase001Provider : apiBrasilBase001Provider;
export const prfProvider = USE_REAL ? apiBrasilBase001Provider : apiBrasilBase001Provider;
export const rouboFurtoProvider = USE_REAL ? apiBrasilBase001Provider : apiBrasilBase001Provider;
export const leilaoProvider = USE_REAL ? apiBrasilBase001Provider : apiBrasilBase001Provider;
export const csvProvider = USE_REAL ? apiBrasilBase001Provider : apiBrasilBase001Provider;
