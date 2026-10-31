import { HttpClient } from "@angular/common/http";
import { inject, Injectable, Service } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class LoginService {    // <-- Este é o "authService"
    private http = inject(HttpClient);

    private apiUrl = 'http://localhost:4200'; 

    loginComGoogle(credential: string) {
  return this.http.post( this.apiUrl + '/auth/google', { credential: credential }
  );
}
}
