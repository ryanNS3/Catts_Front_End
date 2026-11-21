import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BotaoVoltar } from '../../../../../shared/components/botao-voltar/botao-voltar';
import { StepSlideOng } from '../../../../../shared/components/step-slide-ong/step-slide-ong';
import { CampoTexto } from '../../../../../shared/components/campo-texto/campo-texto';
import { BotaoOpcao } from '../../../../../shared/components/botao-opcao/botao-opcao';

@Component({
  selector: 'app-etapa-contato',
  imports: [BotaoVoltar, StepSlideOng, CampoTexto, BotaoOpcao],
  templateUrl: './etapa-contato.html',
  styleUrl: './etapa-contato.css',
})
export class EtapaContato {
  @Input() formulario!: FormGroup;
  @Output() voltar = new EventEmitter<void>();

  // Dias disponíveis
  dias = [ 'Segunda','Terça','Quarta', 'Quinta','Sexta', 'Sábado','Domingo'];

  // Acessa o controle dos dias no formulário
  get controleDias(): FormControl<string[]> {
    return this.formulario.get('diasSelecionados') as FormControl<string[]>;
  }

  // Verifica se o dia está selecionado
  estaSelecionado(dia: string): boolean {
    return this.controleDias.value.includes(dia);
  }

  // Adiciona ou remove um dia selecionado
  alternarDia(dia: string) {
    const selecionados = this.controleDias.value;

    if (this.estaSelecionado(dia)) {
      this.controleDias.setValue(
        selecionados.filter(d => d !== dia)
      );
    
    } else {
      this.controleDias.setValue([...selecionados, dia]);
    }
    
    this.controleDias.markAsTouched();
  }
}