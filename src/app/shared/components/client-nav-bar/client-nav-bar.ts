import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AnimalService } from '../../../service/animal/animal';

@Component({
  selector: 'app-client-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './client-nav-bar.html',
  styleUrl: './client-nav-bar.css',
})
export class ClientNavBar {
  private animalService = inject(AnimalService);

  sortearGato() {
    this.animalService.sortearGato();
  }

}
