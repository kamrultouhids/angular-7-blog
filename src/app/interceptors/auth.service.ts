import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {map, catchError} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.headers.get('authorization')) {
                        localStorage.setItem('token', 'Bearer ' + event.headers.get('authorization'));
                    }
                }
                return event;
            }));

    }


}
