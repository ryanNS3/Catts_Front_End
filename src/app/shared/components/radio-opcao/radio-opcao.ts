
import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-radio-opcao",
  imports: [],
  templateUrl: "./radio-opcao.html",
  styleUrl: "./radio-opcao.css",
})
export class RadioOpcao {

  @Input() selecionado: boolean | null = null;

  @Output() resposta = new EventEmitter<boolean>();

  selecionar(valor: boolean) {
    this.resposta.emit(valor);
  }

}
