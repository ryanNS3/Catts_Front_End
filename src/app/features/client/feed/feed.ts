import { Component, HostListener, inject, OnInit, signal } from "@angular/core";
import { ClientNavBar } from "../../../shared/client-nav-bar/client-nav-bar";
import { AnimalService } from "../../../service/animal/animal";
import { AnimalModal } from "../animal-modal/animal-modal";
import { Animal } from "../../../service/@Type/animal";

@Component({
  imports: [ClientNavBar, AnimalModal],
  selector: "app-feed",
  styleUrl: "./feed.css",
  templateUrl: "./feed.html",
})
export class Feed implements OnInit {

  // Declaração do Math para ser acessível diretamente no template HTML
  protected Math = Math;

  private animaisService = inject(AnimalService);

  // Signal que armazena os animais vindos da API
  animalList = signal<Animal[]>([]);

  animaisExibidos: Animal[] = [];

  animalSelecionado: Animal | null = null;

  ngOnInit(): void {
    this.animaisService.buscarAnimais().subscribe({
      next: (dados) => {
        console.log("Animais recebidos da API:", dados);
        this.animalList.set(dados);
        
        // Assim que os dados chegam da API, alimentamos os exibidos na tela
        if (dados && dados.length > 0) {
          this.carregarMaisAnimais();
        }
      },
      error: (erro) => {
        console.error("Erro ao buscar animais da API:", erro);
      }
    });
  }

  abrirModal(animal: Animal) {
    this.animalSelecionado = animal;
  }

  fecharModal() {
    this.animalSelecionado = null;
  }

  adotarAnimal(animal: Animal) {
    this.animaisService.selecionarAnimal(animal);
  }

  @HostListener("window:scroll")
  aoRolar() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300
    ) {
      this.carregarMaisAnimais();
    }
  }

  carregarMaisAnimais() {
    const listaAtual = this.animalList();
    if (listaAtual.length === 0) return;

    for (let i = 0; i < 6; i++) {
      const indice = Math.floor(Math.random() * listaAtual.length);
      this.animaisExibidos.push(listaAtual[indice]);
    }
  }
}