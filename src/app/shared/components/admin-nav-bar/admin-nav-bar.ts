import { Component, Input } from "@angular/core";

@Component({
  imports: [],
  selector: "app-admin-nav-bar",
  styleUrl: "./admin-nav-bar.css",
  templateUrl: "./admin-nav-bar.html",
})
export class AdminNavBar {

  @Input() novasSolicitacoes: number = 0;
  @Input() paginaAtiva: string = "inicio";
}
