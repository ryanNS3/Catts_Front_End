import { Component, Input } from "@angular/core";

@Component({
  imports: [],
  selector: "app-step-slide",
  styleUrl: "./step-slide.css",
  templateUrl: "./step-slide.html",
})
export class StepSlide {
   @Input() etapa = 1;
}
