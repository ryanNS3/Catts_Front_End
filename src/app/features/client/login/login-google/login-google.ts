
import { AfterViewInit, Component, ElementRef, inject, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../service/login/loginservice';
import { BotaoVoltar } from '../../../../shared/components/botao-voltar/botao-voltar';
import { PainelPetAleatorio } from '../../../../shared/components/painel-pet-aleatorio/painel-pet-aleatorio';

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

etapa = 1

  voltar() {
  this.router.navigate(['/']);
}


  @ViewChild('googleButton')
  googleButton!: ElementRef;

  // Executado após carregar o HTML
  ngAfterViewInit() {
    this.inicializarGoogle();
  }

  // Inicializa o botão do Google
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

  // Envia a credencial para o backend
  entrarComGoogle(credential: string) {
    this.authService.loginComGoogle(credential).subscribe({
      next: (resposta: any) => {
        localStorage.setItem('token', resposta.token);
        this.authService.googleToken = credential;
        this.zone.run(() => {
          
          if (resposta.cadastrado) {
            this.router.navigate(['']);
          } else {
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
declare var google: any;
