import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, NgZone, OnInit, Output, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoginService } from "../../../../service/login/loginservice";
import { PainelGato } from "../../../../shared/components/painel-gato/painel-gato";
import { BotaoAzul } from "../../../../shared/components/botao-azul/botao-azul";
import { BotaoVoltar } from "../../../../shared/components/botao-voltar/botao-voltar";
import { EtapaLocalidade } from "./etapa-localidade/etapa-localidade";
import { EtapaContato } from "./etapa-contato/etapa-contato";
import { EtapaDadosDaInstituicao } from "./etapa-dados-da-instituicao/etapa-dados-da-instituicao";
import { PainelPetAleatorio } from "../../../../shared/components/painel-pet-aleatorio/painel-pet-aleatorio";


@Component({
  imports: [BotaoAzul, EtapaLocalidade, EtapaContato, EtapaDadosDaInstituicao, BotaoVoltar, PainelPetAleatorio],
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

  if (this.etapa === 1 && this.dadosInstituicao.invalid) {
    this.dadosInstituicao.markAllAsTouched();
    return;
  }

  if (this.etapa === 2 && this.contato.invalid) {
    this.contato.markAllAsTouched();
    return;
  }

  if (this.etapa === 3 && this.localidade.invalid) {
    this.localidade.markAllAsTouched();
    return;
  }

  if (this.etapa < 3) {
    this.etapa++;
  }

}

  voltar() {
    if (this.etapa > 1) {
      this.etapa--;
    }
  }

  // Volta para a tela Escolher Perfil
voltarParaPerfil() {
  this.router.navigate(['/escolher-perfil']);
}

formulario = new FormGroup({

  // ETAPA 1 - Dados da instituição
  dadosInstituicao: new FormGroup({
    nomeOng: new FormControl('', Validators.required),
    cnpj: new FormControl('', Validators.required),
  }),

  // ETAPA 2 - Contato
  contato: new FormGroup({
  whatsapp: new FormControl('', Validators.required),
  instagram: new FormControl(''),
  facebook: new FormControl(''),
  horarioInicio: new FormControl('', Validators.required),
  horarioFim: new FormControl('', Validators.required),
  diasSelecionados: new FormControl<string[]>([], Validators.required),

}),

  // ETAPA 3 - Localidade
  localidade: new FormGroup({

  cep: new FormControl('', Validators.required),

  rua: new FormControl(''),

  cidade: new FormControl(''),

  estado: new FormControl(''),

  complemento: new FormControl(''),

  cepEncontrado: new FormControl(false, Validators.requiredTrue),

  }),

});

finalizarCadastro() {

  if (this.localidade.invalid) {
    this.localidade.markAllAsTouched();
    return;
  }

  if (this.formulario.invalid) {
    this.formulario.markAllAsTouched();
    return;
  }

  console.log('Dados da ONG:', this.formulario.value);

}

get dadosInstituicao() {
  return this.formulario.controls.dadosInstituicao;
}

get contato() {
  return this.formulario.controls.contato;
}

get localidade() {
  return this.formulario.controls.localidade;
}

constructor() {

  // Observa quando o usuário altera o CEP
  this.localidade.controls.cep.valueChanges.subscribe(() => {

    // Limpa o endereço anterior
    this.localidade.patchValue({
      rua: '',
      cidade: '',
      estado: '',
      cepEncontrado: false
    });

  });

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

