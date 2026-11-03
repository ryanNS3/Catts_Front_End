import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../@Type/animal';

@Injectable({
  providedIn: 'root'
})

export class AnimalService {

  private http = inject(HttpClient);

  buscarAnimais() {
     return this.http.get<Animal[]>('http://localhost:8080/v1/animal');
  }

  animalSelecionado = signal<Animal | null>(null);

  selecionarAnimal(animal: Animal) {
    this.animalSelecionado.set(animal);
  }
}