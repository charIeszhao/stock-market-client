import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './user';

export function getAccessToken(): string {
  return sessionStorage.getItem('token');
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtService: JwtHelperService
  ) { }

  isAuthenticated(): boolean {
    const isTokenExpired = this.jwtService.isTokenExpired(getAccessToken());
    if (isTokenExpired && this.router.url !== '/login') {
      this.logout();
    }
    return !isTokenExpired;
  }

  login(user: User) {
    return this.http.post('/login', user);
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUser(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.http.get(`/user/info`).subscribe((userRes: any) => {
        resolve(userRes.data);
      },
      error => {
        reject(error);
      });
    });
  }
}
