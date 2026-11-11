import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  imports: [FormsModule],
  selector: "app-campo-texto",
  styleUrl: "./campo-texto.css",
  templateUrl: "./campo-texto.html",
})
export class CampoTexto {
  @Input() textoDigitado = '';                    // texto em cima do campo
  @Input() idCampo = '';                   // liga o rótulo ao campo
  @Input() placeholder = '';
  @Input() tipo = 'text';                  // text, number, date...
  @Input() maximo: number | null = null;   // máximo de caracteres
  @Input() altura = 44;                    // altura do campo em px

  valor = '';
}
