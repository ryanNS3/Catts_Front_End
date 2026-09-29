import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
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
