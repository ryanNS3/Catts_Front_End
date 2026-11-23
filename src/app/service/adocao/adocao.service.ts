import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Animal } from '../@Type/animal';

export interface RascunhoAdocao {
  animal: Animal;
  mensagemAdotante: string;
}

export interface RetornoAdocao {
  rascunho: RascunhoAdocao;
  enviar: boolean;
}

@Injectable({ providedIn: 'root' })
export class AdocaoService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private url = 'https://catts-api-hhegcygvgbcrgkas.brazilsouth-01.azurewebsites.net/api/adocoes';

  solicitar(animalId: string, mensagemAdotante: string, token: string) {
    return this.http.post(this.url,  { animalId, mensagemAdotante }, {
    // Envia o token do Catts no cabeçalho para o backend identificar quem está pedindo a adoção.
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'text'
    });
  }

  //clicou em adotar, foi para login google RASCUNHO sabe que a pessoa estava tentando adotar a Animal
  // 1. Abre o login levando o gato escolhido e a mensagem.
abrirLogin(rascunho: RascunhoAdocao, substituirPagina = false) {
  return this.router.navigate(['/login-google'], {
    // Guarda o gato e a mensagem com o nome "rascunhoAdocao" para o login recuperar.
    state: { rascunhoAdocao: rascunho },
    // false adiciona o login ao histórico. true substitui a página atual pelo login no histórico.
    replaceUrl: substituirPagina
  });
}

//clicou em adotar, foi para login google RASCUNHO sabe que a pessoa estava tentando adotar o Animal
rascunhoDoLogin(): RascunhoAdocao | undefined {
// Busca o rascunho na entrada atual do histórico. Se a pessoa veio pela navbar, retorna undefined.
  return history.state?.rascunhoAdocao;
}

// 3. Volta ao feed com o gato e informa se deve enviar o pedido.
voltarAoModal(rascunho: RascunhoAdocao, enviar: boolean) {
  return this.router.navigate(['/'], {
    // enviar = true retoma o pedido. enviar = false apenas reabre o modal.
    info: { rascunho, enviar },
 // O feed substitui a tela atual no histórico. O botão Voltar do navegador pula essa tela.
    replaceUrl: true
  });
}
}