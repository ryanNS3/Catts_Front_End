import { Injectable, signal } from '@angular/core';

export interface Animal {
  nome: string;
  idade: number;
  cidade: string;
  imagem: string;
}

@Injectable({
  providedIn: 'root'
})

export class AnimalService {

  animalSelecionado = signal<Animal | null>(null);

  selecionarAnimal(animal: Animal) {
    this.animalSelecionado.set(animal);
  }
}