import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {apiUrl} from '../../environments/config';
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient) {
    }

    attemptAuth(data) {
        return this.http.post(apiUrl + 'api/login', data);
    }

    registration(data) {
        return this.http.post(apiUrl + 'api/registration', data);
    }
}
