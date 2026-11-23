import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BotaoAzul } from '../../../../shared/components/botao-azul/botao-azul';
import { BotaoVoltar } from '../../../../shared/components/botao-voltar/botao-voltar';
import { PainelPetAleatorio } from '../../../../shared/components/painel-pet-aleatorio/painel-pet-aleatorio';
import { Toast } from '../../../../shared/components/toast/toast';

import { EtapaDadosDaInstituicao } from './etapa-dados-da-instituicao/etapa-dados-da-instituicao';
import { EtapaContato } from './etapa-contato/etapa-contato';
import { EtapaLocalidade } from './etapa-localidade/etapa-localidade';

import { AnimalService } from '../../../../service/animal/animal';
import { OngService } from '../../../../service/ong/ong.service';
import { LoginService } from '../../../../service/login/loginservice';

@Component({
  selector: 'app-login-ong',
  imports: [
    BotaoAzul,
    BotaoVoltar,
    PainelPetAleatorio,
    EtapaDadosDaInstituicao,
    EtapaContato,
    EtapaLocalidade,
    Toast
  ],
  templateUrl: './login-ong.html',
  styleUrl: './login-ong.css'
})
export class LoginOng {
  private router = inject(Router);
  private loginService = inject(LoginService);
  private animalService = inject(AnimalService);
  private ongService = inject(OngService);


  etapa = 1;
  salvandoCadastro = false;
  cadastroSalvo = false;

  mostrarToast = false;
  mensagemToast = '';
  tipoToast: 'sucesso' | 'erro' = 'sucesso';

  formulario = new FormGroup({
    // Etapa 1: dados da instituição
    dadosInstituicao: new FormGroup({
      nomeOng: new FormControl('', Validators.required),
      cnpj: new FormControl('', Validators.required)
    }),

    // Etapa 2: contato
    contato: new FormGroup({
      whatsapp: new FormControl('', Validators.required),
      instagram: new FormControl(''),
      facebook: new FormControl(''),
      horarioInicio: new FormControl('', Validators.required),
      horarioFim: new FormControl('', Validators.required),
      diasSelecionados: new FormControl<string[]>([], Validators.required)
    }),

    // Etapa 3: localidade
    localidade: new FormGroup({
      cep: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]),
      rua: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl(''),
      complemento: new FormControl(''),
      numero: new FormControl<number | null>(null, [Validators.required,Validators.min(1)]),
      cepEncontrado: new FormControl(false, Validators.requiredTrue)
    })
  });

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
    this.localidade.controls.cep.valueChanges.subscribe(() => {
      this.localidade.patchValue({
        rua: '',
        cidade: '',
        estado: '',
        cepEncontrado: false
      });
    });
  }

  exibirToast(mensagem: string, tipo: 'sucesso' | 'erro') {
    this.mensagemToast = mensagem;
    this.tipoToast = tipo;
    this.mostrarToast = true;
  }

  continuar() {
    if (this.salvandoCadastro || this.cadastroSalvo) {
      return;
    }

    this.mostrarToast = false;

    if (this.etapa === 1) {
      if (this.dadosInstituicao.invalid) {
        this.dadosInstituicao.markAllAsTouched();
        this.exibirToast('Preencha os dados da instituição corretamente!', 'erro');
        return;
      }

      this.etapa = 2;
      return;
    }

    if (this.etapa === 2) {
      if (this.contato.invalid) {
        this.contato.markAllAsTouched();
        this.exibirToast('Preencha os dados de contato corretamente!', 'erro');
        return;
      }

      this.etapa = 3;
      return;
    }

    if (this.etapa === 3) {
      if (this.localidade.invalid) {
        this.localidade.markAllAsTouched();
        this.exibirToast('Confira o CEP e o número do imóvel.', 'erro');
        return;
      }

      this.salvarCadastro();
    }
  }

  voltar() {
    if (this.salvandoCadastro || this.etapa <= 1) {
      return;
    }

    this.mostrarToast = false;
      this.etapa--;
    }
  voltarParaPerfil() {
      this.router.navigate(['/escolher-perfil']);
    }
  

   salvarCadastro(): void {
    const dadosInstituicao = this.dadosInstituicao.getRawValue();
    const contato = this.contato.getRawValue();
    const localidade = this.localidade.getRawValue();

 const dados = {
  googleToken: this.loginService.googleToken,
  CNPJ: dadosInstituicao.cnpj?.replace(/\D/g, ''),
  nomeInstitucional: dadosInstituicao.nomeOng,
  contato: contato.whatsapp?.replace(/\D/g, ''),
  instagram: contato.instagram,
  facebook: contato.facebook,
  horarioInicio: contato.horarioInicio,
  horarioFim: contato.horarioFim,
  diaDisponibilidade: `[${(contato.diasSelecionados ?? []).join(', ')}]`,
  address: {
    street: localidade.rua,
    number: Number(localidade.numero),
    city: localidade.cidade,
    state: localidade.estado,
    cep: localidade.cep?.replace(/^(\d{5})(\d{3})$/, '$1-$2')
  }
};

this.salvandoCadastro = true;

this.ongService.cadastrarOng(dados).subscribe({
  next: () => {
    this.salvandoCadastro = false;
    this.cadastroSalvo = true;
    this.router.navigate(['/admin']);
  },
  error: () => {
    this.salvandoCadastro = false;
    this.exibirToast('Não foi possível salvar o cadastro. Tente novamente.', 'erro');
    }
  });
}
}