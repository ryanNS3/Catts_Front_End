import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  imports: [ReactiveFormsModule],
  selector: "app-campo-texto",
  styleUrl: "./campo-texto.css",
  templateUrl: "./campo-texto.html",
})
export class CampoTexto {

   // Texto que aparece acima do input.
  @Input() label = '';

  // Identificador que conecta o label ao input.
  @Input() idInput = '';

  // Texto de exemplo que aparece dentro do input.
  @Input() placeholder = '';

  // Define o tipo do input: text, email, date etc.
  @Input() tipo = 'text';

  // Define a quantidade máxima de caracteres.
  // null significa que não existe um limite definido.
  @Input() maximo: number | null = null;

  // Recebe o controle do formulário criado no componente pai.
  // O ! indica que esse valor será recebido posteriormente.
  @Input() controlPai!: FormControl;

  // Avisa ao componente pai quando o usuário sai do input.
  @Output() saiuDoCampo = new EventEmitter<void>();

  

}
