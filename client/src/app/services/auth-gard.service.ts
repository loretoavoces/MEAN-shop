import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate {

  constructor(private localStorage: LocalstorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorage.getToken()
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode.isAdmin && !this.tokenExpired(tokenDecode.exp)) return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

    private tokenExpired(expiration: any) {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
