import { Component, Input } from "@angular/core";

@Component({
  imports: [],
  selector: "app-botao-continuar",
  styleUrl: "./botao-continuar.css",
  templateUrl: "./botao-continuar.html",
})
export class BotaoContinuar {
    @Input() texto = 'Continuar';  

}
