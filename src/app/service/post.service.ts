import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiUrl} from '../../environments/config';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) {
    }

    storePost(formData) {
        return this.http.post(apiUrl + 'api/post',formData);
    }

    findPostList() {
        return this.http.get(apiUrl + 'api/post');
    }

    deletePost(id) {
        return this.http.delete(apiUrl + 'api/post/' + id);
    }

    findEditPost(id) {
        return this.http.get(apiUrl + 'api/post/' + id);
    }

    updatePost(formData, id) {
        return this.http.put(apiUrl + 'api/post/' + id, formData);
    }
}
