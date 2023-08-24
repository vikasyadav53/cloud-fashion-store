import { HttpInterceptor } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
    'providedIn' : 'root'
})
export class CorsHandlerService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
            },
            withCredentials: true
        });
        return next.handle(req);
    }

}