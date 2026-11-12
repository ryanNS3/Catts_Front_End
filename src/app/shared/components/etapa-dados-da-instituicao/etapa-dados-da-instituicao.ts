import { Component, EventEmitter, Output } from "@angular/core";
import { StepSlideOng } from "../step-slide-ong/step-slide-ong";
import { BotaoVoltar } from "../botao-voltar/botao-voltar";
@Component({
  imports: [BotaoVoltar, StepSlideOng],
  selector: "app-etapa-dados-da-instituicao",
  styleUrl: "./etapa-dados-da-instituicao.css",
  templateUrl: "./etapa-dados-da-instituicao.html",
})
export class EtapaDadosDaInstituicao {

  @Output() voltar = new EventEmitter<void>();
}
  


