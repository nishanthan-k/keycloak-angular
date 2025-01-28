import { KeycloakService } from './services/keycloak.service';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  private kcService = inject(KeycloakService);

  ngOnInit(): void {
    this.kcService.init();
  }
}
