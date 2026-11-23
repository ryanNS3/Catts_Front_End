import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface AuthResponse {
  precisaCompletarCadastro: boolean;
  token: string | null;
  tipo: 'ADOTANTE' | 'ONG' | null;
  email: string;
  nome: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  googleToken = '';
  emailGoogle = '';
  nomeGoogle = '';

  // Sem barra no final e com /api
  private apiUrl = 'https://catts-api-hhegcygvgbcrgkas.brazilsouth-01.azurewebsites.net/api';

  // Manda o token do Google para POST /api/auth/google
  loginComGoogle(credential: string) {
    this.googleToken = credential;

    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/google`,
      { token: credential } // O DTO no Spring espera "token"
    );
  }

  // Salva o perfil de Adotante -> POST /api/auth/completar-cadastro/adotante
  completarCadastroAdotante(dadosAdotante: any) {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/completar-cadastro/adotante`,
      {
        googleToken: this.googleToken,
        ...dadosAdotante
      }
    );
  }

  // Salva o perfil de ONG -> POST /api/auth/completar-cadastro/ong
  completarCadastroOng(dadosOng: any) {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/completar-cadastro/ong`,
      {
        googleToken: this.googleToken,
        ...dadosOng
      }
    );
  }
}