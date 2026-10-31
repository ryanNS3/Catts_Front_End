
import { Component, HostListener, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ClientNavBar } from "../../../layoyt/client-nav-bar/client-nav-bar";
import { Animal, AnimalService } from "../../../service/animal/animal";

@Component({
  imports: [ClientNavBar],
  selector: "app-feed",
  styleUrl: "./feed.css",
  templateUrl: "./feed.html",
})
export class Feed {

  private animaisService = inject(AnimalService);
  private router = inject(Router);

  animais: Animal[] = [
    {
      nome: "Tom",
      idade: 3,
      cidade: "São Paulo",
      imagem: "https://images.unsplash.com/photo-1583795128727-6ec3642408f8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
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

  animaisExibidos: Animal[] = [];

  constructor() {
    this.carregarMaisAnimais();
  }

  abrirLogin(animal: Animal) {
    this.animaisService.selecionarAnimal(animal);
    this.router.navigate(["/login"]);
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
