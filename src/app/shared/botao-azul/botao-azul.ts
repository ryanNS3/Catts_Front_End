import { Component, Output, EventEmitter} from "@angular/core";

@Component({
  imports: [],
  selector: "app-botao-azul",
  styleUrl: "./botao-azul.css",
  templateUrl: "./botao-azul.html",
})
export class BotaoAzul {
  @Output() adotar = new EventEmitter<void>();
}
