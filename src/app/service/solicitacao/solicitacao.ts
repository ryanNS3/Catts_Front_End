import { Injectable } from "@angular/core";
import { Solicitacao } from "../@Type/solicitacao";

@Injectable({
  providedIn: "root"
})
export class SolicitacaoService {

  solicitacoes: Solicitacao[] = [
    {
      id: 30,
      nomeSolicitante: "Eduardo Nascimento",
      nomePet: "Tom",
      status: "Pendente"
    },
    {
      id: 31,
      nomeSolicitante: "Mariana Silva",
      nomePet: "Luna",
      status: "Aprovada"
    },
    {
      id: 32,
      nomeSolicitante: "Lucas Oliveira",
      nomePet: "Téo",
      status: "Recusada"
    },
    {
      id: 33,
      nomeSolicitante: "Laura Costa",
      nomePet: "Olivia",
      status: "Pendente"
    }
  ];

  atualizarStatus(id: number, novoStatus: Solicitacao["status"]) {
    const solicitacao = this.solicitacoes.find(
      item => item.id === id
    );

    if (solicitacao && solicitacao.status === "Pendente") {
      solicitacao.status = novoStatus;
    }
  }

  buscarSolicitacao(id: number) {
    return this.solicitacoes.find(
      solicitacao => solicitacao.id === id
    );
  }
}