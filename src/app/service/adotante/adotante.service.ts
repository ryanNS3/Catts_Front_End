import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdotanteService {
  private httpClient = inject(HttpClient);
  private readonly API = 'http://localhost:3000/adotantes';

  cadastrarAdotante(dados: object) {
    return this.httpClient.post(this.API, dados);
  }
}