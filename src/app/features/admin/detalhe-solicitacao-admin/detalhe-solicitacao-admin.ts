import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminNavBar } from "../../../shared/components/admin-nav-bar/admin-nav-bar";
import { AdminPageIcon } from "../../../shared/components/admin-page-icon/admin-page-icon";
import { SolicitacaoService } from "../../../service/solicitacao/solicitacao";
import { Solicitacao } from "../../../service/@Type/solicitacao";

@Component({
  imports: [AdminNavBar, AdminPageIcon],
  selector: "app-detalhe-solicitacao-admin",
  styleUrl: "./detalhe-solicitacao-admin.css",
  templateUrl: "./detalhe-solicitacao-admin.html",
})
export class DetalheSolicitacaoAdmin {

  dadosSolicitante = {
    nome: "Eduardo Nascimento",
    cpf: "000.000.000-00",
    dataNascimento: "13/05/2002"
  };

  dadosEndereco = {
    cep: "04845-000",
    rua: "Rua Exemplo",
    numero: "123",
    complemento: "Casa 2",
    bairro: "Cidade Dutra",
    cidade: "São Paulo",
    estado: "SP"
  };

  dadosFinanceiro = {
    rendaMensal: "R$ 3.500,00",
    profissao: "Analista administrativo",
    possuiEmprego: "Sim",
    tipoMoradia: "Alugada",
  };

  dadosPet = {
    nome: "Tom",
    idade: "8 meses",
    sexo: "Macho",
    castrado: "Sim",
    peso: "4,3 kg"
  };

  solicitacaoSelecionada?: Solicitacao;
  idSolicitacao: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacaoService: SolicitacaoService
  ) {
    this.idSolicitacao = this.route.snapshot.paramMap.get("id");

    this.solicitacaoSelecionada = this.solicitacaoService.buscarSolicitacao(
      Number(this.idSolicitacao)
    );
  }

  atualizarStatus(novoStatus: Solicitacao["status"]) {
    if (
      !this.solicitacaoSelecionada ||
      this.solicitacaoSelecionada.status !== "Pendente"
    ) {
      return;
    }

    this.solicitacaoService.atualizarStatus(
      this.solicitacaoSelecionada.id,
      novoStatus
    );

    this.router.navigate(["../../"], { relativeTo: this.route });
  }
}