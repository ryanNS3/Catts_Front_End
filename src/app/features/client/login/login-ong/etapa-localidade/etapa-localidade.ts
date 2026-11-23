import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BotaoVoltar } from '../../../../../shared/components/botao-voltar/botao-voltar';
import { StepSlideOng } from '../../../../../shared/components/step-slide-ong/step-slide-ong';
import { CampoTexto } from '../../../../../shared/components/campo-texto/campo-texto';

import { ViaCep } from '../../../../../service/via-cep/via-cep'; // Confira o caminho do seu serviço

@Component({
  selector: 'app-etapa-localidade',
  imports: [BotaoVoltar, StepSlideOng, CampoTexto],
  templateUrl: './etapa-localidade.html',
  styleUrl: './etapa-localidade.css',
})
export class EtapaLocalidade {

  private viaCep = inject(ViaCep);
  @Input() formulario!: FormGroup;
  @Output() voltar = new EventEmitter<void>();

  buscando = signal(false);
  erroCep = signal('');
  
  buscarCep() {
    const cep = this.formulario.get('cep')?.value?.replace(/\D/g, '');
    
      this.formulario.patchValue({ // atualizar os campos que você escolher no formulário.
        rua: '',
        cidade: '',
        estado: '',
        cepEncontrado: false
      
      });
      
      if (!cep) {
        this.erroCep.set('');
        return;
      }
      
      if (cep.length !== 8) {
        this.erroCep.set('O CEP deve conter 8 números');
        return;
      }
      
      this.buscando.set(true);
      this.erroCep.set('');

      this.viaCep.buscarCep(cep).subscribe({
        next: (dados) => {
          this.buscando.set(false);
          
        if (dados.erro) {
          this.erroCep.set('CEP não encontrado');
          return;
      }
      
      this.formulario.patchValue({
        rua: dados.logradouro,
        cidade: dados.localidade,
        estado: dados.uf,
        cepEncontrado: true
      });
      
      this.erroCep.set('');
    },
    
    error: () => {
      this.buscando.set(false);
      this.erroCep.set('Erro ao buscar o CEP');
    }

  });
}
}