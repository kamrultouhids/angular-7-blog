import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiUrl} from '../../environments/config';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    findUserList() {
        return this.http.get(apiUrl + 'api/user');
    }

    deleteUser(id) {
        return this.http.delete(apiUrl + 'api/user/'+id);
    }

    findEditUser(id) {
        return this.http.get(apiUrl + 'api/user/'+id);
    }

    updateUser(formData,id) {
        return this.http.put(apiUrl + 'api/user/'+id,formData);
    }

}
