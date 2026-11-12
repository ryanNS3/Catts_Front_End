import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BotaoVoltar } from '../botao-voltar/botao-voltar';
import { StepSlideOng } from '../step-slide-ong/step-slide-ong';

@Component({
  selector: 'app-etapa-contato',
  imports: [FormsModule, BotaoVoltar, StepSlideOng],
  templateUrl: './etapa-contato.html',
  styleUrl: './etapa-contato.css',
})
export class EtapaContato {
  @Output() voltar = new EventEmitter<void>();

  whatsapp = '';
  instagram = '';
  facebook = '';
  horarioInicio = '';
  horarioFim = '';

  dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  diasSelecionados: string[] = [];

  estaSelecionado(dia: string): boolean {
    return this.diasSelecionados.includes(dia);
  }

  alternarDia(dia: string) {
    if (this.estaSelecionado(dia)) {
      this.diasSelecionados = this.diasSelecionados.filter(d => d !== dia);
    } else {
      this.diasSelecionados = [...this.diasSelecionados, dia];
    }
  }
}