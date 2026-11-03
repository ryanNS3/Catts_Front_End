
import { Component, HostListener, inject, OnInit, signal } from "@angular/core";
import { ClientNavBar } from "../../../layoyt/client-nav-bar/client-nav-bar";
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

  private animaisService = inject(AnimalService);

  // Objetos de teste enquanto a API não fornece os dados
  animais: Animal[] = [
    {
      nome: "Tom",
      idade: 3,
      cidade: "São Paulo",
      imagem: "https://images.unsplash.com/photo-1583795128727-6ec3642408f8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
      historia: "Gato Tom tem 3 anos e foi abandonado pelos antigos tutores. Ele adora brincar de bolinha e é muito carinhoso.",
      castrado: true,
      vacinas: ["Raiva"],
      deficiencia: "Nenhuma",
      peso: 5,
      ong: "ONG Catts"
    },
    {
      nome: "Luna",
      idade: 6,
      cidade: "São Paulo",
      imagem: "https://premierpet.com.br/wp-content/uploads/2021/07/srd-thumbnail-1.jpg"
    },
    {
      nome: "Téo",
      idade: 6,
      cidade: "Rio de Janeiro",
      imagem: "https://images.unsplash.com/photo-1597626291251-aa2f94db7927?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
    },
    {
      nome: "Olivia",
      idade: 8,
      cidade: "São Paulo",
      imagem: "https://i.pinimg.com/236x/8b/a1/65/8ba1650d82d60e8ca767e4ed791a4d5a.jpg"
    }
  ];

  animalList = signal<Animal[]>([]);

  animaisExibidos: Animal[] = [];

  animalSelecionado: Animal | null = null;

  constructor() {
    this.carregarMaisAnimais();
  }

  ngOnInit(): void {
    console.log("Animais cadastrados para teste:", this.animais);
    console.log("Animais exibidos no Feed:", this.animaisExibidos);

    this.animaisService.buscarAnimais().subscribe({
      next: (dados) => {
        console.log("Animais recebidos da API:", dados);
        this.animalList.set(dados);
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
    for (let i = 0; i < 6; i++) {
      const indice = Math.floor(Math.random() * this.animais.length);
      this.animaisExibidos.push(this.animais[indice]);
    }
  }
}
