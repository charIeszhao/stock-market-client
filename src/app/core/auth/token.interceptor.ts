import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private urlPrefix = environment.serverUrl;

  constructor(
    private router: Router,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      url: this.urlPrefix + request.url
    });
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            console.error('Unauthorized!');
            this.router.navigate(['/login']);
          }
        }
      })
    );
  }
}
