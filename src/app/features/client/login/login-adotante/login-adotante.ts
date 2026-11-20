
import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PainelGato } from "../../../../shared/components/painel-gato/painel-gato";
import { BotaoAzul } from "../../../../shared/components/botao-azul/botao-azul";
import { EtapaDadosPessoais } from "./etapa-dados-pessoais/etapa-dados-pessoais";
import { EtapaEndereco } from "./etapa-endereco/etapa-endereco";
import { EtapaPerfil} from "./etapa-perfil/etapa-perfil";
import {AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { Toast } from "../../../../shared/components/toast/toast";

@Component({
  imports: [PainelGato, BotaoAzul, EtapaDadosPessoais, EtapaEndereco, EtapaPerfil, Toast],
  selector: "app-login-adotante",
  styleUrl: "./login-adotante.css",
  templateUrl: "./login-adotante.html",
})

export class LoginAdotante implements OnInit {
  private router = inject(Router);

  // Etapa 1 - Dados pessoais
  // Etapa 2 - Endereço
  // Etapa 3 - Perfil
  // Etapa 4 - Final
  etapa = 1;

  // FORMULÁRIO DE DADOS PESSOAIS
  // FormGroup agrupa os campos do formulário.
  // FormControl armazena o valor de cada campo.
  dadosPessoais = new FormGroup ({

    contato: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{2}9[0-9]{8}$/)]),
    cpf: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{11}$/), this.validarCpf]),
    nascimento: new FormControl('', [Validators.required, this.validarIdade])

  });

  // FORMULÁRIO DE ENDEREÇO
  endereco = new FormGroup ({

    cep: new FormControl('', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]),
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


validarCpf(control: AbstractControl) {
  const cpf = control.value;

  if (!cpf || cpf.length !== 11) {
    return null;
  }

  // Impede CPFs com todos os números iguais
  if (/^(\d)\1{10}$/.test(cpf)) {
    return { cpfInvalido: true };
  }

  // Verifica os dois últimos números do CPF
  for (let i = 9; i < 11; i++) {
    let soma = 0;

    for (let j = 0; j < i; j++) {
      soma += Number(cpf[j]) * (i + 1 - j);
    }

    const resto = (soma * 10) % 11;
    const digito = resto === 10 ? 0 : resto;

    if (digito !== Number(cpf[i])) {
      return { cpfInvalido: true };
    }
  }

  return null;
}


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


mostrarToast = false;
mensagemToast = '';
tipoToast: 'sucesso' | 'erro' = 'sucesso';

exibirToast(mensagem: string, tipo: 'sucesso' | 'erro') {
  this.mensagemToast = mensagem;
  this.tipoToast = tipo;
  this.mostrarToast = true;
}


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




validarIdade(control: AbstractControl) {

  if (!control.value) {
    return null;
  }

  const nascimento = new Date(control.value + 'T00:00:00');
  const hoje = new Date();

  const idadeMinima = new Date();
  idadeMinima.setFullYear(hoje.getFullYear() - 18);

  if (nascimento > idadeMinima) {
    return { menorIdade: true };
  }

  return null;
}




  continuar() {

    // ETAPA 1 - DADOS PESSOAIS
    
    if (this.etapa === 1) {

    if (this.dadosPessoais.valid) {
    this.mostrarToast = false;
    this.etapa++;

    } else {
    this.dadosPessoais.markAllAsTouched();

    this.exibirToast(
      'Preencha os dados pessoais corretamente!',
      'erro'
    );
  }

  return;
}

    // ETAPA 2 - ENDEREÇO
    if (this.etapa === 2) {

      // Verifica se o formulário está válido
      // e se a API encontrou o CEP.
      if ( this.endereco.valid && this.endereco.get('cepEncontrado')?.value === true) {
        this.mostrarToast = false;
        this.etapa++;
      } else {

        this.endereco.markAllAsTouched();
         this.exibirToast('Preencha os dados do endereço corretamente!', 'erro');
      }

      return;
    }

  // ETAPA 3 - PERFIL

  if (this.etapa === 3) {
  // Verifica se todos os campos obrigatórios estão válidos.
  if (this.dadosPessoais.valid && this.endereco.valid && this.endereco.controls.cepEncontrado.value === true && this.perfil.valid) {

    // Mostra os dados preenchidos no console.
    console.log('Dados pessoais:', this.dadosPessoais.value);
    console.log('Endereço:', this.endereco.value);
    console.log('Perfil:', this.perfil.value);

     this.exibirToast('Dados preenchidos com sucesso!', 'sucesso');
  } else {
    this.perfil.markAllAsTouched();
    this.exibirToast( 'Preencha os dados do perfil corretamente!', 'erro');
  }

  return;
}
}
  
  // MÉTODO PARA VOLTAR
  voltar() {

    if (this.etapa > 1) {
      this.etapa--;
    }
    else{
        this.router.navigate(['/escolher-perfil']);

    }
  }
  irParaFeed() {
  this.router.navigate(['/']);
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

}

