import { Component, Input, Output, EventEmitter} from "@angular/core";
import { Animal } from "../../../service/animal/animal";
import { BotaoVoltar } from "../../../shared/botao-voltar/botao-voltar";
import { BotaoAzul } from "../../../shared/botao-azul/botao-azul";

@Component({
  imports: [BotaoVoltar, BotaoAzul],
  selector: "app-animal-modal",
  styleUrl: "./animal-modal.css",
  templateUrl: "./animal-modal.html",
})
export class AnimalModal {

  @Input() animal!: Animal;

  @Output() fechar = new EventEmitter<void>();

  @Output() adotar = new EventEmitter<Animal>();
}
