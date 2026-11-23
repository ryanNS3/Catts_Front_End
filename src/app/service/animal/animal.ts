import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../@Type/animal';

@Injectable({
  providedIn: 'root'
})

export class AnimalService {

  private http = inject(HttpClient);

  buscarAnimais() {
     return this.http.get<Animal[]>('https://catts-api-hhegcygvgbcrgkas.brazilsouth-01.azurewebsites.net/v1/animal');
  }

  buscarAnimaisPorOng(ongId: string | number) {
  return this.http.get<Animal[]>(
    `https://catts-api-hhegcygvgbcrgkas.brazilsouth-01.azurewebsites.net/v1/animal/ong/${ongId}`
  );
}

  animalSelecionado = signal<Animal | null>(null);

  selecionarAnimal(animal: Animal) {
    this.animalSelecionado.set(animal);
  }

  gatoSorteado = signal<Animal | null>(null);

sortearGato() {
  // A pessoa começou um novo fluxo pela navbar.
  this.animalSelecionado.set(null);
  this.gatoSorteado.set(null);

  this.buscarAnimais().subscribe((gatos) => {
    if (gatos.length > 0) {
      const posicao = Math.floor(Math.random() * gatos.length);
      this.gatoSorteado.set(gatos[posicao]);
    }
  });
}
}