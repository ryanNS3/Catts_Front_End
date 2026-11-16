
import { Component, inject, OnInit } from '@angular/core';
import { AnimalService } from '../../../service/animal/animal';
import { Animal } from '../../../service/@Type/animal';

@Component({
  selector: 'app-painel-pet-aleatorio',
  imports: [],
  templateUrl: './painel-pet-aleatorio.html',
  styleUrl: './painel-pet-aleatorio.css',
})
export class PainelPetAleatorio implements OnInit {

  private animalService = inject(AnimalService);

  // Guarda o pet sorteado
  animalAleatorio: Animal | null = null;

  ngOnInit() {

    // Busca os animais cadastrados na API
    this.animalService.buscarAnimais().subscribe({

      next: (animais) => {

        // Verifica se existem animais
        if (animais.length > 0) {

          // Sorteia uma posição da lista
          const indice = Math.floor(Math.random() * animais.length);

          // Guarda o animal sorteado
          this.animalAleatorio = animais[indice];

        }

      },

      error: (erro) => {
        console.error('Erro ao buscar animais:', erro);
      }

    });

  }

  nomeIdadeGatos(): string {

    const animal = this.animalAleatorio;

    if (!animal) return '';

    return `Gato ${animal.name} - ${animal.age} anos`;
  }

  observacaoDoGato(): string {

    const animal = this.animalAleatorio;

    if (!animal) return '';

    return animal.description ||
      `Gato ${animal.name} cadastrado recentemente para adoção.`;
  }

}
