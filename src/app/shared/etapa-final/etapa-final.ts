import { Component, inject, Input } from "@angular/core";
import { AnimalService } from "../../service/animal/animal";

@Component({
  imports: [],
  selector: "app-etapa-final",
  styleUrl: "./etapa-final.css",
  templateUrl: "./etapa-final.html",
})
export class EtapaFinal {
   private animalService = inject(AnimalService);

  animalSelecionado = this.animalService.animalSelecionado;
}
