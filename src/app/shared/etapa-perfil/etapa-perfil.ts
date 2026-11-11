import { Component, EventEmitter, Output } from "@angular/core";
import { StepSlide } from "../../step-slide/step-slide";
import { BotaoVoltar } from "../botao-voltar/botao-voltar";
import { BotaoAzul} from "../botao-azul/botao-azul";

@Component({
  imports: [BotaoVoltar, BotaoAzul, StepSlide],
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
