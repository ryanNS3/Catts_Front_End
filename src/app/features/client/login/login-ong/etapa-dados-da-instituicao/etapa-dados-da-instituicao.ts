import { Component, Input } from "@angular/core";
import { StepSlideOng } from "../../../../../shared/components/step-slide-ong/step-slide-ong";
import { FormGroup } from "@angular/forms";
import { CampoTexto } from "../../../../../shared/components/campo-texto/campo-texto";

@Component({
  imports: [StepSlideOng, CampoTexto],
  selector: "app-etapa-dados-da-instituicao",
  styleUrl: "./etapa-dados-da-instituicao.css",
  templateUrl: "./etapa-dados-da-instituicao.html",
})
export class EtapaDadosDaInstituicao {
 
   @Input() formulario!: FormGroup;
}
  


