
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AdminNavBar } from "../../../shared/components/admin-nav-bar/admin-nav-bar";
import { AdminPageIcon } from "../../../shared/components/admin-page-icon/admin-page-icon";
import { AdminCounter } from "../../../shared/components/admin-counter/admin-counter";
import { AdminCatCard } from "../../../shared/components/admin-cat-card/admin-cat-card";
import { CampoTexto } from "../../../shared/components/campo-texto/campo-texto";
import { BotaoOpcao } from "../../../shared/components/botao-opcao/botao-opcao";
import { RadioOpcao } from "../../../shared/components/radio-opcao/radio-opcao";

@Component({
  imports: [
    ReactiveFormsModule,
    AdminNavBar,
    AdminPageIcon,
    AdminCounter,
    AdminCatCard,
    CampoTexto,
    BotaoOpcao,
    RadioOpcao
  ],
  selector: "app-detalhe-gato-admin",
  styleUrl: "./detalhe-gato-admin.css",
  templateUrl: "./detalhe-gato-admin.html",
})
export class DetalheGatoAdmin {

  idGato: string | null = null;

  formulario = new FormGroup({
    historia: new FormControl(""),
    nome: new FormControl(""),
    cpf: new FormControl(""),
    idade: new FormControl(""),
    peso: new FormControl("")
  });

  gatos = [
    {
      id: 1,
      nome: "Tom",
      idade: "2 anos",
      imagem: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500"
    },
    {
      id: 2,
      nome: "Luna",
      idade: "1 ano",
      imagem: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500"
    },
    {
      id: 3,
      nome: "Téo",
      idade: "6 meses",
      imagem: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500"
    }
  ];

  gatoSelecionado: any;

  constructor(private route: ActivatedRoute) {

    this.idGato = this.route.snapshot.paramMap.get("id");

    this.gatoSelecionado = this.gatos.find(
      gato => gato.id === Number(this.idGato)
    );

    if (this.gatoSelecionado) {
      this.formulario.patchValue({
        nome: this.gatoSelecionado.nome,
        idade: this.gatoSelecionado.idade
      });
    }
  }

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
}
