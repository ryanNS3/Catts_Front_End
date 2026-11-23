export type StatusSolicitacao = 'Pendente' | 'Aprovada' | 'Recusada';

export interface Solicitacao {
  id: number | string;
  nomeSolicitante: string;
  nomePet: string;
  status: StatusSolicitacao;
  mensagemAdotante?: string;
  respostaOng?: string;
  dataSolicitacao?: string;
}