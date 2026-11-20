import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  imports: [],
  selector: "app-toast",
  styleUrl: "./toast.css",
  templateUrl: "./toast.html",
})
export class Toast {
   @Input() mensagem = '';
  @Input() tipo: 'sucesso' | 'erro' = 'sucesso';

  @Output() fechar = new EventEmitter<void>();
}
