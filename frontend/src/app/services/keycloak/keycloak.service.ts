import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;
  private _user: UserProfile | undefined;

  // Singleton pattern for Keycloak reference
  get keycloak() {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:9090',
        realm: 'keycloak-integration',
        clientId: 'keycloak-auth',
      });
    }
    return this._keycloak;
  }

  async init() {
    console.log('Initializing Keycloak...');
    const authenticated = await this.keycloak?.init({
      onLoad: 'login-required',
      checkLoginIframe: false,
    });

    if (authenticated) {
      console.log('User authenticated');
      this._user = (await this.keycloak?.loadUserProfile()) as UserProfile;
      this._user.token = this.keycloak?.token;
    } else {
      console.log('User needs to authenticate');
    }
  }

  login() {
    return this.keycloak?.login();
  }

  logout() {
    return this.keycloak?.logout({
      redirectUri: 'http://localhost:4200',
    });
  }

  isAuthenticated(): boolean {
    return this.keycloak?.authenticated || false;
  }

  getUserProfile(): UserProfile | undefined {
    return this._user;
  }
}
