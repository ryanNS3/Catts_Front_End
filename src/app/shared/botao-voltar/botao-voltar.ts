import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  imports: [],
  selector: "app-botao-voltar",
  styleUrl: "./botao-voltar.css",
  templateUrl: "./botao-voltar.html",
})
export class BotaoVoltar {

  @Output() voltar = new EventEmitter<void>();
}
