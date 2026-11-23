import { AfterViewInit, Component, ElementRef, inject, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, AuthResponse } from '../../../../service/login/loginservice';
import { BotaoVoltar } from '../../../../shared/components/botao-voltar/botao-voltar';
import { PainelPetAleatorio } from '../../../../shared/components/painel-pet-aleatorio/painel-pet-aleatorio';

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
  private zone = inject(NgZone);

  etapa = 1;

  @ViewChild('googleButton')
  googleButton!: ElementRef;

  voltar() {
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

        this.zone.run(() => {
          if (!resposta.precisaCompletarCadastro && resposta.token) {
            // Usuário já possui cadastro: salva o JWT e vai para a home/feed
            localStorage.setItem('token', resposta.token);
            if (resposta.tipo) localStorage.setItem('tipo', resposta.tipo);
            this.router.navigate(['']);
          } else {
            // Primeiro acesso: vai escolher entre Adotante ou ONG
            this.router.navigate(['/escolher-perfil']);
          }
        });
      },
      error: (erro) => {
        console.error('Erro no login:', erro);
      }
    });
  }
}