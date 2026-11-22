import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PainelGato } from '../../../../shared/components/painel-gato/painel-gato';
import { BotaoAzul } from '../../../../shared/components/botao-azul/botao-azul';
import { Toast } from '../../../../shared/components/toast/toast';

import { EtapaDadosPessoais } from './etapa-dados-pessoais/etapa-dados-pessoais';
import { EtapaEndereco } from './etapa-endereco/etapa-endereco';
import { EtapaPerfil } from './etapa-perfil/etapa-perfil';

import { AnimalService } from '../../../../service/animal/animal';
import { AdotanteService } from '../../../../service/adotante/adotante.service';
import { LoginService } from '../../../../service/login/loginservice';

@Component({
  selector: 'app-login-adotante',
  imports: [PainelGato, BotaoAzul, EtapaDadosPessoais, EtapaEndereco, EtapaPerfil, Toast],
  templateUrl: './login-adotante.html',
  styleUrl: './login-adotante.css'
})

export class LoginAdotante {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private loginService = inject(LoginService);
  private animalService = inject(AnimalService);
  private adotanteService = inject(AdotanteService);

  etapa = 1;
  salvandoCadastro = false;
  cadastroSalvo = false;

  mostrarToast = false;
  mensagemToast = '';
  tipoToast: 'sucesso' | 'erro' = 'sucesso';

  // Etapa 1: dados pessoais
  dadosPessoais = new FormGroup({
    contato: new FormControl('', Validators.required),
    cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
    nascimento: new FormControl('', [Validators.required, this.validarIdade])
  });

  // Etapa 2: endereço
  endereco = new FormGroup({
    cep: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]),
    numero: new FormControl<number | null>(null, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
    tipoResidencia: new FormControl('condominio', Validators.required),
    telasProtecao: new FormControl('', Validators.required),
    imovelAlugado: new FormControl('', Validators.required),
    logradouro: new FormControl(''),
    bairro: new FormControl(''),
    cidade: new FormControl(''),
    estado: new FormControl(''),
    cepEncontrado: new FormControl(false)
  });

  // Etapa 3: campos e cards do Figma
  perfil = new FormGroup({
    faixaSalarial: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    qtdPets: new FormControl('nenhum',Validators.required),
    horasTrabalho: new FormControl('nao-trabalha', Validators.required),   
    pessoasEmCasa: new FormControl<number | null>(null, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
    aceitaFotos: new FormControl(false)
  });

  constructor() {
    this.endereco.controls.cep.valueChanges.subscribe(() => {
      this.endereco.patchValue({
        logradouro: '',
        bairro: '',
        cidade: '',
        estado: '',
        cepEncontrado: false
      });
    });
  }
  validarIdade(control: AbstractControl) {
     if (!control.value) {
       return null;
     }
     const nascimento = new Date(control.value + 'T00:00:00');
     const limite = new Date();
     limite.setFullYear(limite.getFullYear() - 18);

     return nascimento > limite ? { menorIdade: true } : null;
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
      if (this.dadosPessoais.invalid) {
        this.dadosPessoais.markAllAsTouched();
        this.exibirToast('Preencha os dados pessoais corretamente!', 'erro');
        return;
      }

      this.etapa = 2;
      return;
    }

    if (this.etapa === 2) {
      if (this.endereco.invalid || this.endereco.controls.cepEncontrado.value !== true) {
        this.endereco.markAllAsTouched();
        this.exibirToast('Confira o CEP, o número do imóvel e as opções do endereço.', 'erro');
        return;
      }

      this.etapa = 3;
      return;
    }

    if (this.etapa === 3) {
      if (this.perfil.invalid) {
        this.perfil.markAllAsTouched();
        this.exibirToast('Confira o salário e a quantidade de pessoas em casa.', 'erro');
        return;
      }

    this.salvarCadastro();

    }
  }

  voltar() {
      // Se o cadastro ainda está sendo salvo, interrompe o método.
    if (this.salvandoCadastro) {
      return;
    }
      this.mostrarToast = false;

    if (this.etapa > 1) {
      this.etapa--;
      return;
    }

    const gato = this.animalService.animalSelecionado();
    
    this.router.navigate(['/'], { state: { gatoParaReabrir: gato } }); //state é a opção do Angular que permite enviar dados junto com a navegação
    return;

  }

  private salvarCadastro(): void {
  const pessoal = this.dadosPessoais.getRawValue(); //getRawValue lê os valores de todos os campos de um grupo do formulário
  const endereco = this.endereco.getRawValue();
  const perfil = this.perfil.getRawValue();

  // Junta os valores das três etapas em um único objeto.
  const dados = {
    // Mantém a chamada compatível com o serviço atual.
    googleToken: this.loginService.googleToken,

    contato: pessoal.contato,              
    cpf: pessoal.cpf,                              
    dataNascimento: pessoal.nascimento,    

    tipoResidencia: endereco.tipoResidencia?.toUpperCase(), //toUpperCase() para deixar em letra maiuscula, ? DANDO POSSIBILIDADE PARA UNDEFINED
    possuiTelaProtecao: endereco.telasProtecao === 'sim',
    imovelAlugado: endereco.imovelAlugado === 'sim',

    salario: Number(perfil.faixaSalarial),
    quantidadePet: perfil.qtdPets,
    quantidadeHorasTrabalho:
      perfil.horasTrabalho === 'nao-trabalha' ? 'nao trabalho' // ? entao use
      : perfil.horasTrabalho === '+8h' ? '8+' // : signific senao
      : perfil.horasTrabalho,
    quantidadePessoasCasa: Number(perfil.pessoasEmCasa),

    // Agrupa os campos do endereço no formato que seu código já usava.
    address: {
      street: endereco.logradouro,
      number: Number(endereco.numero),
      city: endereco.cidade,
      state: endereco.estado,
      cep: endereco.cep
    }
  };
  this.salvandoCadastro = true;

  // Envia o objeto e aguarda a resposta do backend.
  this.adotanteService.cadastrarAdotante(dados).subscribe({
    next: () => {
      // O backend respondeu com sucesso.
      this.salvandoCadastro = false;
      this.cadastroSalvo = true;
      this.router.navigate(['/']); // Abre o feed.
    },

    error: () => {
      // O envio falhou. Libera o botão para a pessoa tentar novamente.
      this.salvandoCadastro = false;
      this.exibirToast('Não foi possível salvar o cadastro. Tente novamente.', 'erro');
    }
  });
}
}