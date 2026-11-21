import { Component, Input } from "@angular/core";

@Component({
  imports: [],
  selector: "app-admin-counter",
  styleUrl: "./admin-counter.css",
  templateUrl: "./admin-counter.html",
})
export class AdminCounter {
  @Input() valor: number = 0;
  @Input() descricao: string = "";
}
