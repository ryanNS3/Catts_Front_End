import { Component, Input } from "@angular/core";

@Component({
  imports: [],
  selector: "app-campo-texto",
  styleUrl: "./campo-texto.css",
  templateUrl: "./campo-texto.html",
})
export class CampoTexto {
   @Input() rotulo = '';                    // texto em cima do campo
  @Input() idCampo = '';                   // liga o rótulo ao campo
  @Input() placeholder = '';
  @Input() tipo = 'text';                  // text, number, date...
  @Input() maximo: number | null = null;   // máximo de caracteres
  @Input() altura = 44;                    // altura do campo em px
}
