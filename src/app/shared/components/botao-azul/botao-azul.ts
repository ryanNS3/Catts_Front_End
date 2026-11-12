import { Component, Output, EventEmitter, Input} from "@angular/core";
import { Router, RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  selector: "app-botao-azul",
  styleUrl: "./botao-azul.css",
  templateUrl: "./botao-azul.html",
})
export class BotaoAzul {
  
   @Input() toUrl?: string = '';

   @Input() texto: string = 'Adotar'; 

   @Output() acaoBotao = new EventEmitter<void>();
}
