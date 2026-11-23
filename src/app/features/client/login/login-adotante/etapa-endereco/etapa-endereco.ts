
import { Component, EventEmitter, inject, Input, Output, signal } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { BotaoVoltar } from "../../../../../shared/components/botao-voltar/botao-voltar";
import { StepSlide } from "../../../../../shared/components/step-slide/step-slide";
import { CampoTexto } from "../../../../../shared/components/campo-texto/campo-texto";
import { ViaCep } from "../../../../../service/via-cep/via-cep";


@Component({
  imports: [BotaoVoltar, StepSlide, CampoTexto, ReactiveFormsModule],
  selector: "app-etapa-endereco",
  styleUrl: "./etapa-endereco.css",
  templateUrl: "./etapa-endereco.html",
})
export class EtapaEndereco {

  // Botão para voltar à etapa anterior.
  @Output() voltar = new EventEmitter<void>();

  // Recebe o formulário do LoginAdotante.
  @Input() formulario!: FormGroup;

  // Permite utilizar a API ViaCEP.
  private viaCep = inject(ViaCep);

  // Guarda o CEP que foi encontrado pela API.
  cepConsultado = '';

  // Recupera o tipo de residência selecionado.
  get tipoResidencia() {
    return this.formulario.get('tipoResidencia')?.value;
  }

  // Atualiza o tipo de residência.
  selecionarResidencia(tipo: string) {
    this.formulario.get('tipoResidencia')?.setValue(tipo);
  }

 // Essa variável vai guardar as mensagens de erro do CEP.
  erroCep = signal('');
  // Método responsável por buscar o CEP.
  buscarCep() {
    this.erroCep.set('');

    // Pega o CEP digitado.
    const cep = this.formulario.get('cep')?.value || '';

    const cepLimpo = cep.replace(/\D/g, '');

    // Limpa o endereço anterior.
    this.formulario.patchValue({
      logradouro: '',
      bairro: '',
      cidade: '',
      estado: '',
      cepEncontrado: false
    });

    // Verifica se o CEP tem 8 números.
    if (cepLimpo.length !== 8) {
      this.erroCep.set('O CEP deve conter 8 números');
      return;
    }
    
    // Consulta a API ViaCEP.
    this.viaCep.buscarCep(cepLimpo).subscribe({

      // Quando a API responde.
      next: (dados) => {

        // Pega o CEP que está no campo neste momento.
        const cepAtual = (
          this.formulario.get('cep')?.value || '' ).replace(/\D/g, '');

          if (cepAtual !== cepLimpo) {
          return;
        }

        // Verifica se o CEP existe.
        if (dados.erro) {
          this.erroCep.set('CEP não encontrado');
          return;
        }

        // Guarda o endereço no formulário.
        this.formulario.patchValue({ //patchValue atualizar alguns campos de um formulário de uma vez.
          logradouro: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf,
          cepEncontrado: true
        });

        // Guarda qual CEP foi consultado.
        this.cepConsultado = cepLimpo;

        // Mostra os dados no console.
        console.log('Endereço:', this.formulario.value);
      },
  
      error: () => {
        this.erroCep.set('Erro ao consultar o CEP');
      }

    });
  }
}
