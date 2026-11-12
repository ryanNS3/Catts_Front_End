import { AfterViewInit, Component, ElementRef, inject, NgZone, OnInit, ViewChild } from "@angular/core";
import { EtapaPerfil } from "../../../../shared/etapa-perfil/etapa-perfil";
import { EtapaEndereco } from "../../../../shared/etapa-endereco/etapa-endereco";
import { EtapaDadosPessoais } from "../../../../shared/etapa-dados-pessoais/etapa-dados-pessoais";
import { BotaoVoltar } from "../../../../shared/botao-voltar/botao-voltar";
import { PainelGato } from "../../../../shared/painel-gato/painel-gato";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "../../../../service/login/loginservice";
import { BotaoAzul } from "../../../../shared/botao-azul/botao-azul";



@Component({
  imports: [ PainelGato, BotaoVoltar, BotaoAzul, EtapaDadosPessoais, EtapaEndereco, EtapaPerfil],
  selector: "app-login-adotante",
  styleUrl: "./login-adotante.css",
  templateUrl: "./login-adotante.html",
})


export class LoginAdotante  implements AfterViewInit, OnInit {
    private authService = inject(LoginService);
  private router = inject(Router);
  private zone = inject(NgZone);

  carregando = false;

  //etapa 0 --login do google
  //etapa 1 --Dados pessoais
  //etapa 2 --Endereco
  //etapa 1 --Seu Perfil 

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


    ngOnInit() {
  const etapaUrl = this.route.snapshot.queryParamMap.get('etapa');
  if (etapaUrl) {
    this.etapa = Number(etapaUrl);
  }
}

  @ViewChild('googleButton')
  googleButton!: ElementRef;

  entrarComGoogle(credential: string) {
  this.authService.loginComGoogle(credential).subscribe({
    next: (resposta: any) => {
      localStorage.setItem('token', resposta.token);

      // o callback do Google roda fora do Angular, por isso o zone.run
      this.zone.run(() => {
        if (resposta.cadastrado) {
          this.router.navigate(['/feed']);
        } else {
          this.router.navigate(['/escolher-perfil']);
        }
      });
    },
    error: (erro) => console.error('Erro no login:', erro),
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

