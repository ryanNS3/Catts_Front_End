import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  imports: [],
  selector: "app-botao-opcao",
  styleUrl: "./botao-opcao.css",
  templateUrl: "./botao-opcao.html",
})
export class BotaoOpcao {
  
  @Input() selecionado = false;
  @Output() pressionado = new EventEmitter<void>();
  
  vacinas = ['Raiva', 'V3', 'V4', 'V5', 'FeLV', 'Dermatofitose', 'Outros'];
  
  vacinasSelecionadas: string[] = [];
  
  alternarVacina(vacina: string) {
    if (this.vacinasSelecionadas.includes(vacina)) {
      this.vacinasSelecionadas = this.vacinasSelecionadas.filter(
        item => item !== vacina
      );
  } else {
    this.vacinasSelecionadas.push(vacina);
  }
}
}
