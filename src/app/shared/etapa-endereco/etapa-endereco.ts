import { Component, EventEmitter, Output } from "@angular/core";
import { BotaoVoltar } from "../botao-voltar/botao-voltar";
import { BotaoAzul } from "../botao-azul/botao-azul";
import { CampoTexto } from "../campo-texto/campo-texto";
import { StepSlide } from "../../step-slide/step-slide";

@Component({
  imports: [BotaoVoltar, BotaoAzul, CampoTexto, StepSlide],
  selector: "app-etapa-endereco",
  styleUrl: "./etapa-endereco.css",
  templateUrl: "./etapa-endereco.html",
})
export class EtapaEndereco {

   @Output() voltar = new EventEmitter<void>();
  @Output() continuar = new EventEmitter<void>();

  tipoResidencia: 'condominio' | 'independente' = 'condominio';
}
