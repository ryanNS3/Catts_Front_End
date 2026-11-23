import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Animal } from '../../../service/@Type/animal';
import { AdocaoService, RetornoAdocao } from '../../../service/adocao/adocao.service';
import { AnimalService } from '../../../service/animal/animal';
import { BotaoVoltar } from '../../../shared/components/botao-voltar/botao-voltar';
import { BotaoAzul } from '../../../shared/components/botao-azul/botao-azul';
import { Toast } from '../../../shared/components/toast/toast';

@Component({
  selector: 'app-animal-modal',
  imports: [BotaoVoltar, BotaoAzul, FormsModule, Toast],
  templateUrl: './animal-modal.html',
  styleUrl: './animal-modal.css',
})
export class AnimalModal implements OnInit {
  private adocoes = inject(AdocaoService);
  private animais = inject(AnimalService);

  @Input({ required: true }) animal!: Animal;
  @Input() retorno?: RetornoAdocao;
  @Output() fechar = new EventEmitter<void>();

  mensagemAdotante = '';
  enviando = signal(false);
  concluido = signal(false);
  aviso = signal('');

  ngOnInit() {
    // Quando o modal abre pelo feed, começa com uma mensagem editável.
    this.mensagemAdotante = `Olá! Tenho interesse em adotar ${this.animal.name}.`;

    // Quando volta do login, recupera a mensagem escrita para esse gato.
    if (this.retorno && this.retorno.rascunho.animal.id === this.animal.id) {
      this.mensagemAdotante = this.retorno.rascunho.mensagemAdotante;

      if (this.retorno.enviar) {
        this.adotar();
      }
    }
  }

  adotar() {
   // Se o primeiro clique ainda está sendo processado, aguarda.
    if (this.enviando()) 
    return;

    // Se o envio já foi confirmado neste modal, só mostra o aviso.
  if (this.concluido()) {
  this.aviso.set('Você já enviou uma solicitação para este gato.');
  return;
}

    const id = this.animal.id;
    const mensagem = this.mensagemAdotante.trim();
    const token = localStorage.getItem('token');

    if (!id) {
      this.aviso.set('Não foi possível identificar o gato.');
      return;
    }

    if (!mensagem) {
      this.aviso.set('Escreva uma mensagem para a ONG.');
      return;
    }

    // Sem token, abre o login levando o gato e a mensagem.
    if (!token) {
      this.animais.selecionarAnimal(this.animal);
      this.adocoes.abrirLogin({
        animal: this.animal,
        mensagemAdotante: mensagem
      });
      return;
    }

    if (localStorage.getItem('tipo') === 'ONG') {
      this.aviso.set('Entre com uma conta de adotante para solicitar a adoção.');
      return;
    }

    // Com o token do adotante, envia o pedido ao backend.
    this.enviando.set(true);
    this.aviso.set('');

    this.adocoes.solicitar(id, mensagem, token).subscribe({
      next: () => {
        this.enviando.set(false);
        this.concluido.set(true);
        this.aviso.set('Solicitação enviada à ONG!');
      },
      error: (erro) => {
        this.enviando.set(false);
        
        if (erro.status === 409) { //Erro 409 Solicitacao ja enviada
        this.concluido.set(true);
        this.aviso.set('Você já enviou uma solicitação para este gato.');
        return;
  }


        if (erro.status === 401) { // 401 — Falha de autenticação
          if (localStorage.getItem('token') === token) {
            localStorage.removeItem('token');
            localStorage.removeItem('tipo');
          }
          this.aviso.set('Sua sessão expirou. Faça login novamente.');
          return;
        }

        this.aviso.set('Não foi possível confirmar o envio da solicitação.');
      }
    });
  }
}