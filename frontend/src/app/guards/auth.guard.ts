import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from '../services/keycloak/keycloak.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private kcService = inject(KeycloakService);
  private router = inject(Router);

  async canActivate(): Promise<boolean> {
    await this.kcService.init();

    if (this.kcService.isAuthenticated()) {
      console.log('Access granted');
      return true;
    } else {
      console.log('Access denied. Redirecting to login...');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
