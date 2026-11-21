import { Component, inject, OnInit, } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { BotaoAzul } from "../../../../shared/components/botao-azul/botao-azul";
import { BotaoVoltar } from "../../../../shared/components/botao-voltar/botao-voltar";
import { EtapaLocalidade } from "./etapa-localidade/etapa-localidade";
import { EtapaContato } from "./etapa-contato/etapa-contato";
import { EtapaDadosDaInstituicao } from "./etapa-dados-da-instituicao/etapa-dados-da-instituicao";
import { PainelPetAleatorio } from "../../../../shared/components/painel-pet-aleatorio/painel-pet-aleatorio";
import { Toast } from "../../../../shared/components/toast/toast";
import { OngService } from "../../../../service/ong/ong.service";


@Component({
  imports: [BotaoAzul, EtapaLocalidade, EtapaContato, EtapaDadosDaInstituicao, BotaoVoltar, PainelPetAleatorio, Toast],
  selector: "app-login-ong",
  styleUrl: "./login-ong.css",
  templateUrl: "./login-ong.html",
})
export class LoginOng implements OnInit {

  private router = inject(Router);
  private ongService = inject(OngService);
  private salvandoCadastro = false;
  etapa = 1;

  continuar() {
  if (this.etapa === 1) {
    if (this.dadosInstituicao.valid) {
      this.mostrarToast = false;
      this.etapa++;
    } else {
      this.dadosInstituicao.markAllAsTouched();
      this.exibirToast('Preencha os dados da instituição corretamente!', 'erro');
    }

    return;
  }
  if (this.etapa === 2) {
    if (this.contato.valid) {
      this.mostrarToast = false;
      this.etapa++;
    } else {
      this.contato.markAllAsTouched();
      this.exibirToast('Preencha os dados de contato corretamente!', 'erro');
    }

    return;
  }

  // ETAPA 3 - LOCALIDADE
  if (this.etapa === 3) {
    this.finalizarCadastro();
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
    cnpj: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{14}$/)]),
  }),

  // ETAPA 2 - Contato
  contato: new FormGroup({
  whatsapp: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{2}9[0-9]{8}$/)]),
  instagram: new FormControl(''),
  facebook: new FormControl(''),
  horarioInicio: new FormControl('', Validators.required),
  horarioFim: new FormControl('', Validators.required),
  diasSelecionados: new FormControl<string[]>([], Validators.required),

}),

  // ETAPA 3 - Localidade
  localidade: new FormGroup({
  cep: new FormControl('', [Validators.required,Validators.pattern(/^\d{5}-?\d{3}$/)]), // Esse código aceita 12345678 ou 12345-678, mas rejeita CEPs incompletos.
  rua: new FormControl(''),
  cidade: new FormControl(''),
  estado: new FormControl(''),
  complemento: new FormControl(''),
  cepEncontrado: new FormControl(false, Validators.requiredTrue),

  }),

});

mostrarToast = false;
mensagemToast = '';
tipoToast: 'sucesso' | 'erro' = 'sucesso';

exibirToast(mensagem: string, tipo: 'sucesso' | 'erro') {
  this.mensagemToast = mensagem;
  this.tipoToast = tipo;
  this.mostrarToast = true;
}


finalizarCadastro() {

  if (this.localidade.invalid) {
    this.localidade.markAllAsTouched();
    this.exibirToast('Preencha os campos obrigatórios!',  'erro');

    return;
  }

  if (this.formulario.invalid) {
    this.formulario.markAllAsTouched();
    this.exibirToast('Verifique os dados do cadastro!',  'erro');

    return;
  }
  if (this.salvandoCadastro) {
  return;
}
this.salvandoCadastro = true;

this.ongService.cadastrarOng(this.formulario.getRawValue()).subscribe({
  next: () => {

  console.log('Dados da ONG:', this.formulario.value);
  this.exibirToast('Dados preenchidos com sucesso!',  'sucesso');
      this.router.navigate(['/']);
  },
  error: () => {
    this.salvandoCadastro = false;
    this.exibirToast('Não foi possível salvar. Tente novamente.', 'erro');
  }
});
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
  ngOnInit() {
  const etapaUrl = this.route.snapshot.queryParamMap.get('etapa');
  if (etapaUrl) {
    this.etapa = Number(etapaUrl);
  }
}
}

