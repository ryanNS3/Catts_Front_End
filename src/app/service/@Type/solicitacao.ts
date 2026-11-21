export interface Solicitacao {
  id: number;
  nomeSolicitante: string;
  nomePet: string;
  status: 'Pendente' | 'Aprovada' | 'Recusada';
}