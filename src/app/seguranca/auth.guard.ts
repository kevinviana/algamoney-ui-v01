import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.auth.isAccessTokenInvalid()) {
      console.log(
        'Navegando com access token inválido: obtendo novo access token...'
      );

      return this.auth.getNewAccessToken().then(() => {
        if (this.auth.isAccessTokenInvalid()) {
          this.router.navigate(['/login']);
          return false;
        }

        return true;
      });
    } else if (
      route.data['roles'] &&
      !this.auth.hasAnyAuthority(route.data['roles'])
    ) {
      this.router.navigate(['/nao-autorizado']);
      return false;
    }
    return true;
  }
}
