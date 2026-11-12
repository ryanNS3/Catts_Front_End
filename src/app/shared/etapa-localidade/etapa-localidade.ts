import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BotaoVoltar } from '../botao-voltar/botao-voltar';
import { StepSlideOng } from '../step-slide-ong/step-slide-ong';

interface RespostaViaCep {
  logradouro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

@Component({
  selector: 'app-etapa-localidade',
  imports: [FormsModule, BotaoVoltar, StepSlideOng],
  templateUrl: './etapa-localidade.html',
  styleUrl: './etapa-localidade.css',
})
export class EtapaLocalidade {
  private http = inject(HttpClient);

  @Output() voltar = new EventEmitter<void>();

  cep = signal('');
  rua = signal('');
  cidade = signal('');
  estado = signal('');
  buscando = signal(false);
  erroCep = signal('');

  complemento = '';

  // roda a cada tecla digitada no CEP
  formatarCep(evento: Event) {
    const input = evento.target as HTMLInputElement;
    const numeros = input.value.replace(/\D/g, '').slice(0, 8);

    this.cep.set(
      numeros.length > 5 ? numeros.slice(0, 5) + '-' + numeros.slice(5) : numeros
    );
    input.value = this.cep();

    if (numeros.length === 8) {
      this.buscarCep(numeros);
    } else {
      this.limparEndereco();
      this.erroCep.set('');
    }
  }

  buscarCep(cep: string) {
    this.buscando.set(true);
    this.erroCep.set('');

    this.http.get<RespostaViaCep>(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
      next: (dados) => {
        this.buscando.set(false);

        if (dados.erro) {
          this.limparEndereco();
          this.erroCep.set('CEP não encontrado');
          return;
        }

        this.rua.set(dados.logradouro);
        this.cidade.set(dados.localidade);
        this.estado.set(dados.uf);
      },
      error: () => {
        this.buscando.set(false);
        this.limparEndereco();
        this.erroCep.set('Erro ao buscar o CEP');
      },
    });
  }

  limparEndereco() {
    this.rua.set('');
    this.cidade.set('');
    this.estado.set('');
  }
}