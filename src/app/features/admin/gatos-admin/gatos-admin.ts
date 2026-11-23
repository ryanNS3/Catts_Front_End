import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AdminNavBar } from '../../../shared/components/admin-nav-bar/admin-nav-bar';
import { AdminPageIcon } from '../../../shared/components/admin-page-icon/admin-page-icon';
import { AdminCounter } from '../../../shared/components/admin-counter/admin-counter';
import { AdminCatCard } from '../../../shared/components/admin-cat-card/admin-cat-card';
import { AnimalService } from '../../../service/animal/animal';
import { Animal } from '../../../service/@Type/animal';

@Component({
  imports: [AdminNavBar, AdminPageIcon, AdminCounter, AdminCatCard,],
  selector: 'app-gatos-admin',
  styleUrl: './gatos-admin.css',
  templateUrl: './gatos-admin.html',
})
export class GatosAdmin implements OnInit {
  private animalService = inject(AnimalService);
  private router = inject(Router);

  gatos = signal<Animal[]>([]);

  ngOnInit() {
    const token = localStorage.getItem('token');
    const ongId = this.obterIdDoToken(token);

    if (!ongId) {
      console.warn('ID da ONG não encontrado no token.');
      return;
    }

    this.animalService.buscarAnimaisPorOng(ongId).subscribe({
      next: (dados) => {
        this.gatos.set(dados);
      },
      error: (erro) => {
        console.error('Erro ao buscar animais da ONG:', erro);
      },
    });
  }

  adicionarGato() {
    this.router.navigate(['/admin/gatos/adicionar']);
  }

  private obterIdDoToken(token: string | null): number | null {
    if (!token) return null;

    try {
      const payloadBase64 = token.split('.')[1];
      if (!payloadBase64) return null;

      const base64Normal = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      const payloadJson = JSON.parse(atob(base64Normal));

      return payloadJson.id ?? null;
    } catch (erro) {
      console.error('Erro ao ler dados do token:', erro);
      return null;
    }
  }
}