import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-button-ghost-link',
  styleUrl: './button-ghost-link.css',
  templateUrl: './button-ghost-link.html',
})
export class ButtonGhostLink {
  
  @Input() toUrl: string = '/login';

  @Output() botaoClicado = new EventEmitter<void>();

  aoClicar(): void {
    this.botaoClicado.emit();
}
}
