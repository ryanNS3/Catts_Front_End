import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { AdminNavBar } from "../../../shared/components/admin-nav-bar/admin-nav-bar";
import { AdminPageIcon } from "../../../shared/components/admin-page-icon/admin-page-icon";
import { CampoTexto } from "../../../shared/components/campo-texto/campo-texto";
import { BotaoOpcao } from "../../../shared/components/botao-opcao/botao-opcao";
import { RadioOpcao } from "../../../shared/components/radio-opcao/radio-opcao";
import { BotaoAzul } from "../../../shared/components/botao-azul/botao-azul";

@Component({
  imports: [
    ReactiveFormsModule,
    AdminNavBar,
    AdminPageIcon,
    CampoTexto,
    BotaoOpcao,
    RadioOpcao,
    BotaoAzul
  ],
  selector: "app-adicionar-gato-admin",
  styleUrl: "./adicionar-gato-admin.css",
  templateUrl: "./adicionar-gato-admin.html",
})
export class AdicionarGatoAdmin {

  formulario = new FormGroup({
    historia: new FormControl(""),
    nome: new FormControl(""),
    cpf: new FormControl(""),
    idade: new FormControl(""),
    peso: new FormControl("")
  });

  vacinas = [
    "Raiva",
    "V3",
    "V4",
    "V5",
    "FeLV",
    "Dermatofitose",
    "Outros"
  ];

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

  castrado: boolean | null = null;
  vacinado: boolean | null = null;
  possuiDeficiencia: boolean | null = null;

  imagemSelecionada: string | null = null;
  arquivoImagem: File | null = null;

  selecionarImagem(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const arquivo = input.files[0];

      this.arquivoImagem = arquivo;

      const leitor = new FileReader();

      leitor.onload = () => {
        this.imagemSelecionada = leitor.result as string;
      };

      leitor.readAsDataURL(arquivo);
    }
  }
}