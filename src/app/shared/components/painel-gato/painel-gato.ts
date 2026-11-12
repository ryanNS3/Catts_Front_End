import { Component, inject } from "@angular/core";
import { AnimalService } from "../../../service/animal/animal";

@Component({
  imports: [],
  selector: "app-painel-gato",
  styleUrl: "./painel-gato.css",
  templateUrl: "./painel-gato.html",
})
export class PainelGato {
  private animalService = inject(AnimalService);

   nomeIdadeGatos(name?: string, age?: number): string {
    const animal = this.animalSelecionado();
    const nomeReal = animal?.name || name || 'Pet';
    const idadeReal = animal?.age !== undefined ? animal.age : (age || 0);
    return `Gato ${nomeReal} - ${idadeReal} anos`;
  }

  animalSelecionado = this.animalService.animalSelecionado;

    // Funções dinâmicas utilizando os dados reais da API (name, age, description)
  observacaoDoGato(name?: string): string {
    const animal = this.animalSelecionado();
    if (animal && animal.description) {
      return animal.description;
    }
    return `Gato ${name || 'Pet'} cadastrado recentemente para adoção.`;
  }
}
