import { Component, Input } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: "app-admin-cat-card",
  styleUrl: "./admin-cat-card.css",
  templateUrl: "./admin-cat-card.html",
})
export class AdminCatCard {
  @Input() nome: string = '';
  @Input() idade: string = '';
  @Input() imagem: string = '';
  @Input() id: number = 0;
  @Input() tamanho: string = 'normal';

  constructor(private router: Router) {}

abrirDetalhes() {
  this.router.navigate(['/admin/gatos', this.id]);
}
}
