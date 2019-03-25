import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../../environments/config';

@Injectable({
  providedIn: 'root'
})
export class MixinsService {

  constructor(private http: HttpClient) { }

  findAuthUser() {
      return this.http.get(apiUrl+'api/user/findAuthUser');
  }
}
