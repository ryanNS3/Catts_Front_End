import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BotaoVoltar } from "../../../../../shared/components/botao-voltar/botao-voltar";
import { StepSlide } from "../../../../../shared/components/step-slide/step-slide";
import { CampoTexto } from "../../../../../shared/components/campo-texto/campo-texto";

@Component({
  imports: [BotaoVoltar, StepSlide, CampoTexto],
  selector: "app-etapa-dados-pessoais",
  styleUrl: "./etapa-dados-pessoais.css",
  templateUrl: "./etapa-dados-pessoais.html",
})
export class EtapaDadosPessoais {

  // Input recebe dados do componente pai.
// Output permite enviar eventos ao componente pai.

 // Recebe o formulário enviado pelo LoginAdotante.
  @Input() formulario!: FormGroup;

  // Emite um evento quando o usuário clica em voltar.
  @Output() voltar = new EventEmitter<void>();
}
