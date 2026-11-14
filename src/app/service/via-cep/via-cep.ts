// Injectable permite que o serviço seja utilizado em outros componentes.
import { Injectable } from '@angular/core';

// HttpClient permite fazer requisições HTTP para APIs.
import { HttpClient } from '@angular/common/http';

// Interface que representa os dados que o ViaCEP retorna.
export interface EnderecoViaCep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean; // O ViaCEP retorna erro quando não encontra o CEP.
}

@Injectable({
  providedIn: 'root' // Permite utilizar o serviço em todo o projeto.
})
export class ViaCep {

  // Recebe o HttpClient para realizar a consulta.
  constructor(private http: HttpClient) {}

  // Consulta o endereço utilizando o CEP informado.
  buscarCep(cep: string) {

    // Remove hífens e outros caracteres que não sejam números.
    const cepLimpo = cep.replace(/\D/g, '');

    // Faz uma requisição GET e retorna os dados da API.
    return this.http.get<EnderecoViaCep>(
      `https://viacep.com.br/ws/${cepLimpo}/json/`
    );
  }
}