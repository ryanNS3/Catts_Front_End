import { Component, EventEmitter, inject, Input, Output, ElementRef,ViewChild, AfterViewInit, } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnimalService } from '../../../service/animal/animal';
import { Router } from '@angular/router';
import { LoginService} from '../../../service/login/loginservice';

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

  // etapa = 0 ->feed sem login-informacoes gerais
  // etapa = 1 -> login com o google
  // etapa = 2 -> completar dados- adocao preencher o restante
  //etapa = 3 ->  completar dados - adocao preencher o restante 
  //etapa = 4 -> ainda nao distinguiu oq sera feito

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


  //BOTAO CONTINUAR
   @Input() toUrl: string = '';

  @Output() botaoClicado = new EventEmitter<void>();

  aoClicar(): void {
    this.botaoClicado.emit();
  }

   @ViewChild('googleButton')
  googleButton!: ElementRef;
    

    entrarComGoogle(credential: string) {
      this.authService.loginComGoogle(credential).subscribe({
        next: (resposta:any) => {
          console.log('Login realizado:', resposta);
          this.etapa = 1;
    },
    
  });

}
ngAfterViewInit() {
  this.inicializarGoogle();
}

inicializarGoogle() {
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
declare var google: any;


