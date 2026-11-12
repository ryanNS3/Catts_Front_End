
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PainelGato } from '../../../../shared/painel-gato/painel-gato';
import { BotaoVoltar } from '../../../../shared/botao-voltar/botao-voltar';
import { BotaoAzul } from '../../../../shared/botao-azul/botao-azul';


@Component({
  selector: 'app-escolher-perfil',
  imports: [PainelGato, BotaoVoltar, BotaoAzul],
  templateUrl: './escolher-perfil.html',
  styleUrl: './escolher-perfil.css'
})

export class EscolherPerfil {

  perfilSelecionado = 'ong';

  constructor(private router: Router) {}

  selecionarPerfil(perfil: string) {
    this.perfilSelecionado = perfil;
  }

  continuar() {

    if (this.perfilSelecionado === 'adotante') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login-ong']);
    }

  }

  voltar() {
    this.router.navigate([' ']);
  }

  escolher(tipo: 'adotante' | 'ong') {
  if (tipo === 'ong') {
    this.router.navigate(['/cadastro-ong']);
  } else {
    this.router.navigate(['/login-adotante'], { queryParams: { etapa: 1 } });
  }
}

}
