import { Component, EventEmitter, Output } from "@angular/core";
import { StepSlide } from "../../step-slide/step-slide";
import { CampoTexto } from "../campo-texto/campo-texto";
import { BotaoContinuar } from "../botao-continuar/botao-continuar";
import { BotaoVoltar } from "../botao-voltar/botao-voltar";

@Component({
  imports: [BotaoVoltar, BotaoContinuar, CampoTexto, StepSlide],
  selector: "app-etapa-perfil",
  styleUrl: "./etapa-perfil.css",
  templateUrl: "./etapa-perfil.html",
})
export class EtapaPerfil {
  @Output() voltar = new EventEmitter<void>();
  @Output() continuar = new EventEmitter<void>();

  qtdPets = 'nenhum';                // saiu do login.ts
  horasTrabalho = 'nao-trabalha';    // saiu do login.ts
}
