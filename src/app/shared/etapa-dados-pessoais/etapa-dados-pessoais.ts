import { Component, EventEmitter, Output } from "@angular/core";
import { StepSlide } from "../../step-slide/step-slide";
import { BotaoVoltar } from "../botao-voltar/botao-voltar";

@Component({
  imports: [BotaoVoltar, StepSlide],
  selector: "app-etapa-dados-pessoais",
  styleUrl: "./etapa-dados-pessoais.css",
  templateUrl: "./etapa-dados-pessoais.html",
})
export class EtapaDadosPessoais {
  @Output() voltar = new EventEmitter<void>();     // avisa o login
}
