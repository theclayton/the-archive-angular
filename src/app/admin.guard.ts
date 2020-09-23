import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from "rxjs"
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    boolean | Observable<boolean> | Promise<boolean> {

    const isAuth = this.authService.isAuth()

    if (isAuth) {
      const user = this.authService.getUser()

      if (user.authLevel === "admin") {
        return true
      } else {
        this.router.navigate(['/login'])
        return false
      }
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }
}