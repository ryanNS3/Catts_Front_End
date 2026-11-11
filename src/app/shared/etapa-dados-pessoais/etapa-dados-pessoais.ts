import { Component, EventEmitter, Output } from "@angular/core";
import { StepSlide } from "../../step-slide/step-slide";
import { BotaoVoltar } from "../botao-voltar/botao-voltar";
import { BotaoAzul } from "../botao-azul/botao-azul";

@Component({
  imports: [BotaoVoltar, BotaoAzul, StepSlide],
  selector: "app-etapa-dados-pessoais",
  styleUrl: "./etapa-dados-pessoais.css",
  templateUrl: "./etapa-dados-pessoais.html",
})
export class EtapaDadosPessoais {
  @Output() voltar = new EventEmitter<void>();      // avisa o login
  @Output() continuar = new EventEmitter<void>(); 
}
