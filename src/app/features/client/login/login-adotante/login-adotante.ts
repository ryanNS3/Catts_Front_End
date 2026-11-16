
import { AfterViewInit, Component, ElementRef, inject, NgZone, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "../../../../service/login/loginservice";
import { PainelGato } from "../../../../shared/components/painel-gato/painel-gato";
import { BotaoVoltar } from "../../../../shared/components/botao-voltar/botao-voltar";
import { BotaoAzul } from "../../../../shared/components/botao-azul/botao-azul";
import { EtapaDadosPessoais } from "./etapa-dados-pessoais/etapa-dados-pessoais";
import { EtapaEndereco } from "./etapa-endereco/etapa-endereco";
import { EtapaPerfil} from "./etapa-perfil/etapa-perfil";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  imports: [PainelGato, BotaoVoltar, BotaoAzul, EtapaDadosPessoais, EtapaEndereco, EtapaPerfil],
  selector: "app-login-adotante",
  styleUrl: "./login-adotante.css",
  templateUrl: "./login-adotante.html",
})

export class LoginAdotante implements AfterViewInit, OnInit {

  private authService = inject(LoginService);
  private router = inject(Router);
  private zone = inject(NgZone);

  carregando = false;

  // Etapa 0 - Login Google
  // Etapa 1 - Dados pessoais
  // Etapa 2 - Endereço
  // Etapa 3 - Perfil
  // Etapa 4 - Final
  etapa = 0;

  // FORMULÁRIO DE DADOS PESSOAIS
  // FormGroup agrupa os campos do formulário.
  // FormControl armazena o valor de cada campo.
  dadosPessoais = new FormGroup({

    contato: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    nascimento: new FormControl('', Validators.required)

  });

  // FORMULÁRIO DE ENDEREÇO
  endereco = new FormGroup({

   
    cep: new FormControl('', Validators.required),

    
    tipoResidencia: new FormControl('condominio', Validators.required),

    telasProtecao: new FormControl('', Validators.required),

    imovelAlugado: new FormControl('', Validators.required),

    // Dados recebidos automaticamente pela API ViaCEP.
    logradouro: new FormControl(''),
    bairro: new FormControl(''),
    cidade: new FormControl(''),
    estado: new FormControl(''),

    // Indica se o CEP foi encontrado pela API.
    cepEncontrado: new FormControl(false)

  });

  // FORMULÁRIO DO PERFIL
// Armazena as respostas do usuário na etapa 3.
perfil = new FormGroup({

  faixaSalarial: new FormControl('', Validators.required),

  qtdPets: new FormControl('nenhum', Validators.required),

  horasTrabalho: new FormControl('nao-trabalha', Validators.required),

  // Armazena quantas pessoas moram com o usuário.
  pessoasEmCasa: new FormControl<number | null>(
    null,
    [Validators.required, Validators.min(1)]
  ),

  aceitaFotos: new FormControl(false)

});

  // NOVO: observa quando o usuário modifica o CEP.
  constructor() {

    // valueChanges detecta alterações no campo CEP.
    this.endereco.controls.cep.valueChanges.subscribe(() => {

      // Limpa o endereço armazenado anteriormente.
      // O CEP precisará ser consultado novamente.
      this.endereco.patchValue({
        logradouro: '',
        bairro: '',
        cidade: '',
        estado: '',
        cepEncontrado: false
      });

    });
  }

  continuar() {

    // ETAPA 1 - DADOS PESSOAIS
    if (this.etapa === 1) {

      // Verifica se os campos obrigatórios estão preenchidos.
      if (this.dadosPessoais.valid) {
        this.etapa++;

      } else {

        // Marca os campos como tocados.
        this.dadosPessoais.markAllAsTouched();

        alert('Preencha todos os campos obrigatórios.');
      }

      return;
    }

    // ETAPA 2 - ENDEREÇO
    if (this.etapa === 2) {

      // Verifica se o formulário está válido
      // e se a API encontrou o CEP.
      if (
        this.endereco.valid &&
        this.endereco.get('cepEncontrado')?.value === true
      ) {
        this.etapa++;

      } else {

        // Marca os campos como tocados.
        this.endereco.markAllAsTouched();

        alert('Preencha os campos e informe um CEP válido.');
      }

      return;
    }

  // ETAPA 3 - PERFIL

  if (this.etapa === 3) {

  // Verifica se todos os campos obrigatórios estão válidos.
  if (this.perfil.valid) {

    // Mostra os dados preenchidos no console.
    console.log('Dados pessoais:', this.dadosPessoais.value);
    console.log('Endereço:', this.endereco.value);
    console.log('Perfil:', this.perfil.value);


    this.router.navigate(['/']);

  } else {

    // Marca os campos como tocados.
    this.perfil.markAllAsTouched();

    alert('Preencha todos os campos do perfil.');
  }

  return;
}

  this.etapa++;

  }

  // MÉTODO PARA VOLTAR
  voltar() {

    // Só volta se não estiver na primeira etapa.
    if (this.etapa > 0) {
      this.etapa--;
    }
  }

  // ROTA DO GATO
  private route = inject(ActivatedRoute);

  // Recupera o ID do gato enviado pela URL.
  gatoId = this.route.snapshot.paramMap.get('id');

  // Executado quando o componente é inicializado.
  ngOnInit() {

    // Recupera o parâmetro "etapa" da URL.
    const etapaUrl = this.route.snapshot.queryParamMap.get('etapa');

    // Se existir, começa diretamente na etapa informada.
    if (etapaUrl) {
      this.etapa = Number(etapaUrl);
    }
  }

  // BOTÃO GOOGLE
  @ViewChild('googleButton')
  googleButton!: ElementRef;

  entrarComGoogle(credential: string) {

    // Envia a credencial do Google para o backend.
    this.authService.loginComGoogle(credential).subscribe({

      next: (resposta: any) => {

        // Armazena o token recebido.
        localStorage.setItem('token', resposta.token);

        // Executa a navegação dentro do Angular.
        this.zone.run(() => {

          // Se já estiver cadastrado, vai para o feed.
          if (resposta.cadastrado) {
            this.router.navigate(['/feed']);

          } else {
            this.router.navigate(['/escolher-perfil']);
          }

        });
      },

      // Mostra no console caso aconteça algum erro.
      error: (erro) => console.error('Erro no login:', erro),

    });
  }

  // Executado depois que o HTML é carregado.
  ngAfterViewInit() {
    this.inicializarGoogle();
  }

  inicializarGoogle() {

    // Verifica se a biblioteca do Google está disponível.
    if (typeof google !== 'undefined' && google.accounts) {

      google.accounts.id.initialize({

        client_id: '158654072886-prqsffc413vlfrbr1dtfs7aqmpmssnnt.apps.googleusercontent.com',

        // Recebe a credencial quando o usuário faz login.
        callback: (resposta: any) => {
          this.entrarComGoogle(resposta.credential);
        }
      });

      // Exibe o botão de login do Google.
      google.accounts.id.renderButton(
        this.googleButton.nativeElement,
        {}
      );
    }
  }
}

// Declara a variável global utilizada pela biblioteca Google.
declare var google: any;
