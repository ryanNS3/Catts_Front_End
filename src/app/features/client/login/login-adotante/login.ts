import { Component, EventEmitter, inject, Input, Output, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../../../../service/login/loginservice';
import { EtapaFinal } from '../../../../shared/etapa-final/etapa-final';
import { EtapaPerfil } from '../../../../shared/etapa-perfil/etapa-perfil';
import { EtapaEndereco } from '../../../../shared/etapa-endereco/etapa-endereco';
import { EtapaDadosPessoais } from '../../../../shared/etapa-dados-pessoais/etapa-dados-pessoais';
import { BotaoVoltar } from '../../../../shared/botao-voltar/botao-voltar';
import { PainelGato } from '../../../../shared/painel-gato/painel-gato';

@Component({
  selector: 'app-login',
  imports: [RouterLink, PainelGato, BotaoVoltar, EtapaDadosPessoais, EtapaEndereco, EtapaPerfil, EtapaFinal],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements AfterViewInit {

  private authService = inject(LoginService);
  private router = inject(Router);

  carregando = false;
  

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

  @Input() toUrl: string = '';
  @Output() botaoClicado = new EventEmitter<void>();

  aoClicar(): void {
    this.botaoClicado.emit();
  }

  @ViewChild('googleButton')
  googleButton!: ElementRef;

  entrarComGoogle(credential: string) {
    this.authService.loginComGoogle(credential).subscribe({
      next: (resposta: any) => {
        console.log('Login realizado:', resposta);
        this.etapa = 1;
      },
    });
  }

  ngAfterViewInit() {
    this.inicializarGoogle();
  }

  inicializarGoogle() {
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: '158654072886-prqsffc413vlfrbr1dtfs7aqmpmssnnt.apps.googleusercontent.com',
        callback: (resposta: any) => {
          this.entrarComGoogle(resposta.credential);
        }
      });

      google.accounts.id.renderButton(
        this.googleButton.nativeElement,
        {}
      );
    }
  }
}
declare var google: any;