import { Component, EventEmitter, inject, Input, Output, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnimalService } from '../../../service/animal/animal';
import { Router } from '@angular/router';
import { LoginService } from '../../../service/login/loginservice';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements AfterViewInit {

  private animalService = inject(AnimalService);
  private authService = inject(LoginService);
  private router = inject(Router);

  carregando = false;

  animalSelecionado = this.animalService.animalSelecionado;

  // Funções dinâmicas utilizando os dados reais da API (name, age, description)
  observacaoDoGato(name?: string): string {
    const animal = this.animalSelecionado();
    if (animal && animal.description) {
      return animal.description;
    }
    return `Gato ${name || 'Pet'} cadastrado recentemente para adoção.`;
  }

  nomeIdadeGatos(name?: string, age?: number): string {
    const animal = this.animalSelecionado();
    const nomeReal = animal?.name || name || 'Pet';
    const idadeReal = animal?.age !== undefined ? animal.age : (age || 0);
    return `Gato ${nomeReal} - ${idadeReal} anos`;
  }

  tipoResidencia: 'condominio' | 'independente' = 'condominio';

  qtdPets = 'nenhum';
  horasTrabalho = 'nao-trabalha';

  etapa = 0;

  continuar() {
    this.etapa++;
  }

  voltar() {
    if (this.etapa > 0) {
      this.etapa--;
    }
  }

  private route = inject(ActivatedRoute);
  gatoId = this.route.snapshot.paramMap.get('id');

  @Input() toUrl: string = '';
  @Output() botaoClicado = new EventEmitter<void>();

  aoClicar(): void {
    this.botaoClicado.emit();
  }

  @ViewChild('googleButton')
  googleButton!: ElementRef;

  entrarComGoogle(credential: string) {
    this.authService.loginComGoogle(credential).subscribe({
      next: (resposta: any) => {
        console.log('Login realizado:', resposta);
        this.etapa = 1;
      },
    });
  }

  ngAfterViewInit() {
    this.inicializarGoogle();
  }

  inicializarGoogle() {
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.initialize({
        client_id: '158654072886-prqsffc413vlfrbr1dtfs7aqmpmssnnt.apps.googleusercontent.com',
        callback: (resposta: any) => {
          this.entrarComGoogle(resposta.credential);
        }
      });

      google.accounts.id.renderButton(
        this.googleButton.nativeElement,
        {}
      );
    }
  }
}
declare var google: any;