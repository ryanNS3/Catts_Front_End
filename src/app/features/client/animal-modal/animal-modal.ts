import { Component, Input, Output, EventEmitter} from "@angular/core";
import { Animal } from "../../../service/@Type/animal";
import { BotaoVoltar } from "../../../shared/components/botao-voltar/botao-voltar";
import { BotaoAzul } from "../../../shared/components/botao-azul/botao-azul";

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
