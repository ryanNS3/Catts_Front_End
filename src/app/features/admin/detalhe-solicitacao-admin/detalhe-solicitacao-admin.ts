import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminNavBar } from '../../../shared/components/admin-nav-bar/admin-nav-bar';
import { AdminPageIcon } from '../../../shared/components/admin-page-icon/admin-page-icon';
import { SolicitacaoService } from '../../../service/solicitacao/solicitacao';
import { Solicitacao } from '../../../service/@Type/solicitacao';

@Component({
  imports: [AdminNavBar, AdminPageIcon],
  selector: 'app-detalhe-solicitacao-admin',
  styleUrl: './detalhe-solicitacao-admin.css',
  templateUrl: './detalhe-solicitacao-admin.html',
})
export class DetalheSolicitacaoAdmin implements OnInit {

  dadosSolicitante = {
    nome: 'Eduardo Nascimento',
    cpf: '000.000.000-00',
    dataNascimento: '13/05/2002',
    contato: '5511999999999'
  };

  dadosEndereco = {
    cep: '04845-000',
    rua: 'Rua Exemplo',
    numero: '123',
    complemento: 'Casa 2',
    bairro: 'Cidade Dutra',
    cidade: 'São Paulo',
    estado: 'SP'
  };

  dadosFinanceiro = {
    rendaMensal: 'R$ 3.500,00',
    profissao: 'Analista administrativo',
    possuiEmprego: 'Sim',
    tipoMoradia: 'Alugada',
  };

  dadosPet = {
    nome: 'Tom',
    idade: '8 meses',
    sexo: 'Macho',
    castrado: 'Sim',
    peso: '4,3 kg'
  };

  solicitacaoSelecionada?: Solicitacao;
  idSolicitacao: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacaoService: SolicitacaoService
  ) {}

  ngOnInit(): void {
    this.idSolicitacao = this.route.snapshot.paramMap.get('id');
    if (!this.idSolicitacao) return;

    const encontrada = this.solicitacaoService.buscarSolicitacao(this.idSolicitacao);
    if (encontrada) {
      this.carregarDadosNaTela(encontrada);
      return;
    }

    this.solicitacaoService.carregarSolicitacoesDaOng().subscribe(() => {
      const aposCarregar = this.solicitacaoService.buscarSolicitacao(this.idSolicitacao!);
      if (aposCarregar) {
        this.carregarDadosNaTela(aposCarregar);
      }
    });
  }

  private carregarDadosNaTela(solicitacao: Solicitacao): void {
    this.solicitacaoSelecionada = solicitacao;
    const raw: any = solicitacao;
    const adotante = raw.adopter ?? raw.adotante ?? {};
    const endereco = adotante.address ?? adotante.endereco ?? raw.address ?? raw.endereco ?? {};
    const animal = raw.animal ?? raw.pet ?? {};

    this.dadosSolicitante = {
      nome: solicitacao.nomeSolicitante || adotante.nome || this.dadosSolicitante.nome,
      cpf: adotante.cpf ?? raw.cpf ?? this.dadosSolicitante.cpf,
      dataNascimento: adotante.dataNascimento ?? raw.dataNascimento ?? this.dadosSolicitante.dataNascimento,
      contato: adotante.contato ?? raw.contato ?? this.dadosSolicitante.contato
    };

    this.dadosEndereco = {
      cep: endereco.cep ?? this.dadosEndereco.cep,
      rua: endereco.street ?? endereco.rua ?? this.dadosEndereco.rua,
      numero: endereco.number != null ? String(endereco.number) : (endereco.numero ?? this.dadosEndereco.numero),
      complemento: endereco.complemento ?? this.dadosEndereco.complemento,
      bairro: endereco.bairro ?? this.dadosEndereco.bairro,
      cidade: endereco.city ?? endereco.cidade ?? this.dadosEndereco.cidade,
      estado: endereco.state ?? endereco.estado ?? this.dadosEndereco.estado
    };

    this.dadosFinanceiro = {
      rendaMensal:
        adotante.salario != null
          ? `R$ ${Number(adotante.salario).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
          : this.dadosFinanceiro.rendaMensal,
      profissao: adotante.quantidadeHorasTrabalho ?? this.dadosFinanceiro.profissao,
      possuiEmprego: this.dadosFinanceiro.possuiEmprego,
      tipoMoradia: adotante.tipoResidencia ?? this.dadosFinanceiro.tipoMoradia
    };

    this.dadosPet = {
      nome: solicitacao.nomePet || animal.name || animal.nome || this.dadosPet.nome,
      idade: animal.age != null ? `${animal.age} anos` : (animal.idade ?? this.dadosPet.idade),
      sexo: animal.sexo ?? animal.porte ?? this.dadosPet.sexo,
      castrado:
        animal.castrado != null
          ? (animal.castrado ? 'Sim' : 'Não')
          : this.dadosPet.castrado,
      peso: animal.weight != null ? `${animal.weight} kg` : (animal.peso ?? this.dadosPet.peso)
    };
  }

  atualizarStatus(novoStatus: Solicitacao['status']) {
    if (
      !this.solicitacaoSelecionada ||
      this.solicitacaoSelecionada.status !== 'Pendente'
    ) {
      return;
    }

    this.solicitacaoService
      .responderSolicitacao(this.solicitacaoSelecionada.id, novoStatus)
      .subscribe((ok) => {
        if (ok) {
          this.router.navigate(['../../'], { relativeTo: this.route });
        }
      });
  }

  abrirWhatsApp() {
    const digitos = (this.dadosSolicitante.contato || '5511999999999').replace(/\D/g, '');
    const telefone = digitos.startsWith('55') ? digitos : `55${digitos}`;
    window.open(`https://wa.me/${telefone}`, '_blank');
  }
}