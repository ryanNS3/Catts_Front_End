import { Component, inject } from '@angular/core';
import { AnimalService } from '../../../service/animal/animal';

@Component({
  selector: 'app-painel-pet-aleatorio',
  templateUrl: './painel-pet-aleatorio.html',
  styleUrl: './painel-pet-aleatorio.css',
})
export class PainelPetAleatorio {
  private animalService = inject(AnimalService);

  get animalAleatorio() {
    return this.animalService.gatoSorteado();
  }

  nomeIdadeGatos(): string {
    const animal = this.animalAleatorio;

    if (!animal) return '';
    return `Gato ${animal.name} - ${animal.age} anos`;
  }
  urlDaFoto(caminho: string): string {
  return new URL(
    caminho,
    'https://catts-api-hhegcygvgbcrgkas.brazilsouth-01.azurewebsites.net'
  ).href;
}



  observacaoDoGato(): string {
    const animal = this.animalAleatorio;

    if (!animal) return '';
     return animal.description || `Gato ${animal.name} cadastrado recentemente para adoção.`;
  }
}