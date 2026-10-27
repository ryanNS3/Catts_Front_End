import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
//import GoogleLogin from 'react-google-login';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  // etapa = 0 ->feed sem login-informacoes gerais
  // etapa = 1 -> login com o google
  // etapa = 2 -> completar dados- adocao preencher o restante
  //etapa = 3 ->  completar dados - adocao preencher o restante 
  //etapa = 4 -> ainda nao distinguiu oq sera feito

  etapa = 0;

  continuar() {
    this.etapa++;
  }

  voltar() {
    if (this.etapa > 0) {
      this.etapa--;
    }
  }

  private route = inject(ActivatedRoute);

  gatoId = this.route.snapshot.paramMap.get('id');

  // Depois isso vem de um service (AnimalService), buscando pelo gatoId.
  // Por enquanto, fixo para teste:
  fotoFundo = signal('/gatologin.jpg');
  nomeGato = signal('Tom');

  //BOTAO CONTINUAR
   @Input() toUrl: string = '';

  @Output() botaoClicado = new EventEmitter<void>();

  aoClicar(): void {
    this.botaoClicado.emit();
}

}
