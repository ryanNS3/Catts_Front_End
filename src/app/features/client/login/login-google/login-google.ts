import { AfterViewInit, Component, ElementRef, inject, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, AuthResponse } from '../../../../service/login/loginservice';
import { BotaoVoltar } from '../../../../shared/components/botao-voltar/botao-voltar';
import { PainelPetAleatorio } from '../../../../shared/components/painel-pet-aleatorio/painel-pet-aleatorio';
import { AdocaoService } from '../../../../service/adocao/adocao.service';

declare var google: any;

@Component({
  selector: 'app-login-google',
  imports: [BotaoVoltar, PainelPetAleatorio],
  templateUrl: './login-google.html',
  styleUrl: './login-google.css',
})
export class LoginGoogle implements AfterViewInit {

  private authService = inject(LoginService);
  private router = inject(Router);
  private adocoes = inject(AdocaoService);
  private rascunho = this.adocoes.rascunhoDoLogin();
  private zone = inject(NgZone);

  etapa = 1;

  @ViewChild('googleButton')
  googleButton!: ElementRef;

  voltar() {
  if (this.rascunho) {
    this.adocoes.voltarAoModal(this.rascunho, false);
    return;
  }

  this.router.navigate(['/']);
}

  ngAfterViewInit() {
    this.inicializarGoogle();
  }

  inicializarGoogle() {
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: '536768273785-e5ce7thpb92hviduvivj0nbc8f8b6pe8.apps.googleusercontent.com',
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

  entrarComGoogle(credential: string) {
    this.authService.loginComGoogle(credential).subscribe({
      next: (resposta: AuthResponse) => {
        this.authService.googleToken = credential;
        this.authService.emailGoogle = resposta.email;
        this.authService.nomeGoogle = resposta.nome;

        this.zone.run(() => { // o Angular volta a acompanhar o código que abre a próxima tela.
        // Primeiro acesso: a pessoa ainda precisa completar o cadastro.
           if (resposta.precisaCompletarCadastro) {
           if (this.rascunho) {
        // Veio do modal Adotar. Leva o pedido para o cadastro de adotante.
           this.router.navigate(['/login'], {
           state: { rascunhoAdocao: this.rascunho },
           replaceUrl: true //faz a tela de cadastro ocupar o lugar da tela de login Google no histórico do navegador.
      });
    } else {
      this.router.navigate(['/escolher-perfil']);
    }
    return;
  }

  if (!resposta.token) {
    console.error('O Catts não retornou o token de acesso.');
    return;
  }


  localStorage.setItem('token', resposta.token);
  if (resposta.tipo) 
    localStorage.setItem('tipo', resposta.tipo);
   if (resposta.tipo === 'ONG') {
    this.router.navigate(['/admin']);
    return;
  }

  if (this.rascunho) {
    // Login concluído. O modal pode continuar o pedido.
    this.adocoes.voltarAoModal(this.rascunho, true);
  } else {
    this.router.navigate(['/']);
  }
});
      },
      error: (erro) => {
        console.error('Erro no login:', erro);
      }
    });
  }
}