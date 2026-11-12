import { Component, EventEmitter, Output } from "@angular/core";
import { BotaoVoltar } from "../botao-voltar/botao-voltar";
import { StepSlide } from "../step-slide/step-slide";

@Component({
  imports: [BotaoVoltar, StepSlide],
  selector: "app-etapa-dados-pessoais",
  styleUrl: "./etapa-dados-pessoais.css",
  templateUrl: "./etapa-dados-pessoais.html",
})
export class EtapaDadosPessoais {
  @Output() voltar = new EventEmitter<void>();     // avisa o login
}
