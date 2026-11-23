import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, ReactiveFormsModule  } from "@angular/forms";
import { StepSlide } from "../../../../../shared/components/step-slide/step-slide";
import { CampoTexto } from "../../../../../shared/components/campo-texto/campo-texto";
import { BotaoVoltar } from "../../../../../shared/components/botao-voltar/botao-voltar";


@Component({
  imports: [StepSlide, CampoTexto, ReactiveFormsModule, BotaoVoltar],
  selector: "app-etapa-perfil",
  styleUrl: "./etapa-perfil.css",
  templateUrl: "./etapa-perfil.html",
})
export class EtapaPerfil {
  @Output() voltar = new EventEmitter<void>();

  @Output() continuar = new EventEmitter<void>();

  @Input() formulario!: FormGroup;

  get qtdPets() {
    return this.formulario.get('qtdPets')?.value;
  }

  get horasTrabalho() {
    return this.formulario.get('horasTrabalho')?.value; //ler o valor do campo somente se ele existir
  }

  // Atualiza o valor de um campo do formulário.  
selecionarOpcao(campo: 'qtdPets' | 'horasTrabalho', valor: string) {
 
  this.formulario.get(campo)?.setValue(valor);
}
}