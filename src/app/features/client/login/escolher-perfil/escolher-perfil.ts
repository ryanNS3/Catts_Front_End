
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BotaoVoltar } from '../../../../shared/components/botao-voltar/botao-voltar';
import { BotaoAzul } from '../../../../shared/components/botao-azul/botao-azul';
import { PainelPetAleatorio } from '../../../../shared/components/painel-pet-aleatorio/painel-pet-aleatorio';

@Component({
  selector: 'app-escolher-perfil',
  imports: [BotaoVoltar, BotaoAzul, PainelPetAleatorio],
  templateUrl: './escolher-perfil.html',
  styleUrl: './escolher-perfil.css'
})

export class EscolherPerfil {

  private router = inject(Router);

  perfilSelecionado = 'ong';

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
    this.router.navigate(['/']);
  }


}
