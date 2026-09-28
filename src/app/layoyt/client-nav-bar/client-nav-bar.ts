import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonGhostLink } from '../../shared/button-ghost-link/button-ghost-link';

@Component({
  imports: [RouterLink, ButtonGhostLink, RouterOutlet, RouterLinkActive],
  selector: 'app-client-nav-bar',
  styleUrl: './client-nav-bar.css',
  templateUrl: './client-nav-bar.html',
})
export class ClientNavBar {
  
  
}

