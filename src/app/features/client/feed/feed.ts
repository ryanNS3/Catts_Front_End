import { Component, HostListener, inject} from "@angular/core";
import { ClientNavBar } from "../../../layoyt/client-nav-bar/client-nav-bar";
import { Animal, AnimalService } from "../../../service/animal/animal";
import { Router } from "@angular/router";


@Component({
  imports: [ClientNavBar],
  selector: "app-feed",
  styleUrl: "./feed.css",
  templateUrl: "./feed.html",
})
export class Feed {

  private Animais = inject(AnimalService);
  private router = inject(Router);

  animais= [
  {
    nome:"Tom",
    idade: 3,
    cidade: "São Paulo",
    imagem: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4"
  },
   {
    nome:"Luna",
    idade: 6,
    cidade: "São Paulo",
    imagem: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4"
  },
   {
    nome:"Téo",
    idade: 6,
    cidade: "Rio de Janeiro",
    imagem: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4"
  },
   {
    nome:"Olivia",
    idade: 8,
    cidade: "São Paulo",
    imagem: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4"
  },
  ];


  abrirLogin(animal: Animal) {
    this.Animais.selecionarAnimal(animal);
    this.router.navigate(["/login"]);
  }
  
  @HostListener("window:scroll")
    aoRolar() {

      const chegouNoFinal = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

      if(chegouNoFinal) {
        this.carregarMaisAnimais();
      }
    }

    carregarMaisAnimais() {
      this.animais = [...this.animais, ...this.animais];
    }
}
