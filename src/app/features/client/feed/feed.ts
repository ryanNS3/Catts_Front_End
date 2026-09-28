import { Component, HostListener} from "@angular/core";

@Component({
  imports: [],
  selector: "app-feed",
  styleUrl: "./feed.css",
  templateUrl: "./feed.html",
})
export class Feed {

  gatos= [
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

  @HostListener("window:scroll")
    aoRolar() {

      const chegouNoFinal = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

      if(chegouNoFinal) {
        this.carregarMaisGatos();
      }
    }

    carregarMaisGatos() {
      this.gatos = [...this.gatos, ...this.gatos];
    }
}
