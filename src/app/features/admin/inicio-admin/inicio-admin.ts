import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminNavBar } from '../../../shared/components/admin-nav-bar/admin-nav-bar';
import { AdminPageIcon } from '../../../shared/components/admin-page-icon/admin-page-icon';
import { AdminCounter } from '../../../shared/components/admin-counter/admin-counter';
import { Solicitacao } from '../../../service/@Type/solicitacao';
import { SolicitacaoService } from '../../../service/solicitacao/solicitacao';

@Component({
  imports: [AdminNavBar, AdminPageIcon, AdminCounter],
  selector: 'app-inicio-admin',
  styleUrl: './inicio-admin.css',
  templateUrl: './inicio-admin.html',
})
export class InicioAdmin implements OnInit {

  constructor(
    private router: Router,
    private solicitacaoService: SolicitacaoService
  ) {}

  ngOnInit(): void {
    this.solicitacaoService.carregarSolicitacoesDaOng().subscribe();
  }

  get solicitacoes(): Solicitacao[] {
    return this.solicitacaoService.solicitacoes;
  }

  get novasSolicitacoes(): number {
    return this.solicitacoes.filter(
      solicitacao => solicitacao.status === 'Pendente'
    ).length;
  }

  visualizarSolicitacao(id: number | string) {
    this.router.navigate(['/admin/solicitacoes', id]);
  }
}