import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonGhostLink } from '../../shared/button-ghost-link/button-ghost-link';

@Component({
  imports: [RouterLink, ButtonGhostLink, RouterOutlet],
  selector: 'app-client-nav-bar',
  styleUrl: './client-nav-bar.css',
  templateUrl: './client-nav-bar.html',
})
export class ClientNavBar {
  
  @Input() toUrl: string = '/login';

  @Output() botaoClicado = new EventEmitter<void>();

  aoClicar(): void {
    this.botaoClicado.emit();
}
}
