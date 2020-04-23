import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(resolve => {
      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']);
        resolve(false);
      }

      this.authService.getUser().then((user: User) => {
        if (user.role !== 'admin') {
          this.router.navigate(['/dashboard']);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}
