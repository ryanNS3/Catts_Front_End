import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdotanteService {
  private httpClient = inject(HttpClient);
  private readonly API = 'https://catts-api-hhegcygvgbcrgkas.brazilsouth-01.azurewebsites.net/api/auth/completar-cadastro/adotante';

  cadastrarAdotante(dados: object) { 
    return this.httpClient.post(this.API, dados); //para onde enviar e o que enviar.
  }
}