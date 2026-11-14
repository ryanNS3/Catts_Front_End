import { Component, EventEmitter, Input, Output } from "@angular/core";

import { StepSlide } from "../step-slide/step-slide";
import { FormGroup, ReactiveFormsModule  } from "@angular/forms";
import { CampoTexto } from "../campo-texto/campo-texto";

@Component({
  imports: [StepSlide, CampoTexto, ReactiveFormsModule],
  selector: "app-etapa-perfil",
  styleUrl: "./etapa-perfil.css",
  templateUrl: "./etapa-perfil.html",
})
export class EtapaPerfil {
// Emite o evento para voltar.
  @Output() voltar = new EventEmitter<void>();

  // Emite o evento para continuar.
  @Output() continuar = new EventEmitter<void>();

  // Recebe o formulário criado no LoginAdotante.
  @Input() formulario!: FormGroup;

  // Recupera a quantidade de pets selecionada.
  get qtdPets() {
    return this.formulario.get('qtdPets')?.value;
  }

  // Recupera as horas de trabalho selecionadas.
  get horasTrabalho() {
    return this.formulario.get('horasTrabalho')?.value;
  }

  // Atualiza o valor de um campo do formulário.
  selecionarOpcao(campo: string, valor: string) {

    // get() encontra o campo pelo nome.
    // setValue() altera o valor armazenado.
    this.formulario.get(campo)?.setValue(valor);
  }
}