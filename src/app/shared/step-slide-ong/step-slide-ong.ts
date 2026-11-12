import { Component, Input } from "@angular/core";

@Component({
  imports: [],
  selector: "app-step-slide-ong",
  styleUrl: "./step-slide-ong.css",
  templateUrl: "./step-slide-ong.html",
})
export class StepSlideOng {

  @Input() etapa = 1;

  

  continuar() {
  this.etapa++;
}

voltar() {
  this.etapa--;
}
}
