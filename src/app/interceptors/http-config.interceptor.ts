import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/services/token.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({ url: environment.baseUrl + req.url });

    const token = this.tokenService.get();
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
    }
    req = req.clone({
      headers: req.headers.set('Content-Type', 'application/json'),
    });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (!event.ok) {
            console.warn('unexpected http response-> ' + event);
          }
        }
        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('http error occured-> ' + err.error);
        return throwError(err);
      })
    );
  }
}
