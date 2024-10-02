import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    // private baseUrl: string = 'https://ttoffer.com/backend/public/api';
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req.url);
        const token = localStorage.getItem('authToken');
        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`),
                url: `${environment.apiBaseUrl}${req.url}`,
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
