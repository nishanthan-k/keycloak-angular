import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { KeycloakService } from "../services/keycloak/keycloak.service";

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private keycloakService: KeycloakService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.keycloakService.keycloak.token;

    if (token) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      })
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
