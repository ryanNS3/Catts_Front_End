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
   //O false deixa o botão disponível por padrão. 
   // Quando o modal estiver enviando a solicitação, ele poderá passar true para bloquear o clique.
   @Input() desabilitado = false;
   @Output() acaoBotao = new EventEmitter<void>();
}
