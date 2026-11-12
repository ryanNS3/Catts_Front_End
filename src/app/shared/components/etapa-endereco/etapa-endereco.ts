import { Component, EventEmitter, Output } from "@angular/core";
import { BotaoVoltar } from "../botao-voltar/botao-voltar";
import { StepSlide } from "../step-slide/step-slide";

@Component({
  imports: [BotaoVoltar, StepSlide],
  selector: "app-etapa-endereco",
  styleUrl: "./etapa-endereco.css",
  templateUrl: "./etapa-endereco.html",
})
export class EtapaEndereco {

   @Output() voltar = new EventEmitter<void>();

  tipoResidencia: 'condominio' | 'independente' = 'condominio';
}
