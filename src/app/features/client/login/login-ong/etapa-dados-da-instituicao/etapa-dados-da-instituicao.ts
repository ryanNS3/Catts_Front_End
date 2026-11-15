import { Component, EventEmitter, Output } from "@angular/core";
import { StepSlideOng } from "../../../../../shared/components/step-slide-ong/step-slide-ong";

@Component({
  imports: [StepSlideOng],
  selector: "app-etapa-dados-da-instituicao",
  styleUrl: "./etapa-dados-da-instituicao.css",
  templateUrl: "./etapa-dados-da-instituicao.html",
})
export class EtapaDadosDaInstituicao {

  @Output() voltar = new EventEmitter<void>();
}
  


