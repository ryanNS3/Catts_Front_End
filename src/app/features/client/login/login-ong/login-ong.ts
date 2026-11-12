import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, NgZone, OnInit, Output, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "../../../../service/login/loginservice";
import { PainelGato } from "../../../../shared/components/painel-gato/painel-gato";
import { BotaoAzul } from "../../../../shared/components/botao-azul/botao-azul";
import { EtapaLocalidade } from "../../../../shared/components/etapa-localidade/etapa-localidade";
import { EtapaContato } from "../../../../shared/components/etapa-contato/etapa-contato";
import { EtapaDadosDaInstituicao } from "../../../../shared/components/etapa-dados-da-instituicao/etapa-dados-da-instituicao";


@Component({
  imports: [PainelGato, BotaoAzul, EtapaLocalidade, EtapaContato, EtapaDadosDaInstituicao],
  selector: "app-login-ong",
  styleUrl: "./login-ong.css",
  templateUrl: "./login-ong.html",
})
export class LoginOng implements AfterViewInit, OnInit {

  private authService = inject(LoginService);
  private router = inject(Router);
  private zone = inject(NgZone);

  carregando = false;
  

  etapa = 1;

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
  @Output() acaoBotao = new EventEmitter<void>();



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

