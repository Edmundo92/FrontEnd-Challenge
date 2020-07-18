export interface Veiculo {
  id: string;
  placa: string;
  cidade: string;
  km_atual: number;
  email_proprietario: string;
}

export interface City {
  nome: string;
  uf: string;
  id: string;
}