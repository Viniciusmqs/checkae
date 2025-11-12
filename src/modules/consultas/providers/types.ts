export type PlacaResult = {
  dadosCadastrais?: { chassi?: string; renavam?: string; uf?: string };
  valorFipe?: { referencia?: string; valor?: number };
};

export type DebitoItem = {
  tipo: string;
  anoExercicio?: number | null;
  descricao?: string | null;
  valorPrincipal?: number | null;
  jurosMulta?: number | null;
  valorTotal?: number | null;
  orgao?: string | null;
  situacao?: string | null;
};

export interface CadastroProvider {
  consultaPorPlaca(placa: string): Promise<PlacaResult>;
}
export interface DebitosProvider {
  consultarDebitos(placa: string, cpfCnpj?: string): Promise<{ itens: DebitoItem[], total: number }>;
}
