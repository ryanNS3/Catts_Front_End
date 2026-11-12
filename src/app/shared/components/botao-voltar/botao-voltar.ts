import { Component, Output, EventEmitter, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  imports: [],
  selector: "app-botao-voltar",
  styleUrl: "./botao-voltar.css",
  templateUrl: "./botao-voltar.html",
})
export class BotaoVoltar {

  @Output() voltar = new EventEmitter<void>();

  @Input() irParaFeed = false;

  constructor(private router: Router) {}

  voltarPagina() {
    if (this.irParaFeed) {
      this.router.navigate(["/"]);
    } else {
      this.voltar.emit();
    }
  }
}

