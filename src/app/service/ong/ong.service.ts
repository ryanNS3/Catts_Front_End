import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OngService {
  private httpClient = inject(HttpClient);
  private readonly API = 'http://localhost:3000/ongs';

  cadastrarOng(dados: object) {
    return this.httpClient.post(this.API, dados);
  }
}