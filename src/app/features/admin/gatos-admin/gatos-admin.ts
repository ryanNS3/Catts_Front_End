import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AdminNavBar } from "../../../shared/components/admin-nav-bar/admin-nav-bar";
import { AdminPageIcon } from "../../../shared/components/admin-page-icon/admin-page-icon";
import { AdminCounter } from "../../../shared/components/admin-counter/admin-counter";
import { AdminCatCard } from "../../../shared/components/admin-cat-card/admin-cat-card";

@Component({
  imports: [AdminNavBar, AdminPageIcon, AdminCounter, AdminCatCard],
  selector: "app-gatos-admin",
  styleUrl: "./gatos-admin.css",
  templateUrl: "./gatos-admin.html",
})
export class GatosAdmin {

  constructor(private router: Router) {}

  gatos = [
    {
      id: 1,
      nome: "Tom",
      idade: "2 anos",
      imagem: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500"
    },
    {
      id: 2,
      nome: "Luna",
      idade: "1 ano",
      imagem: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500"
    },
    {
      id: 3,
      nome: "Téo",
      idade: "6 meses",
      imagem: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500"
    }
  ];

  adicionarGato() {
    this.router.navigate(['/admin/gatos/adicionar']);
  }
}
