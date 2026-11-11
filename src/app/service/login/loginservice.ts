import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService { // -Este é o seu AuthService
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000'; // porta do seu backend

  // Manda o token do Google para o backend
  loginComGoogle(credential: string) {
    return this.http.post<{ token: string; cadastrado: boolean }>(
      this.apiUrl + '/auth/google',
      { credential: credential }
    );
  }

  // Salva o perfil escolhido
  salvarPerfil(perfil: string) {
    return this.http.post(this.apiUrl + '/usuarios/perfil', { perfil: perfil });
  }
}