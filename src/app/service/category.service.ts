import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiUrl} from '../../environments/config';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) {
    }

    saveCategory(formData) {
        return this.http.post(apiUrl + 'api/category',formData);
    }

    findCategoryList() {
        return this.http.get(apiUrl + 'api/category');
    }

    deleteCategory(id) {
        return this.http.delete(apiUrl + 'api/category/' + id);
    }

    findEditCategory(id) {
        return this.http.get(apiUrl + 'api/category/' + id);
    }

    updateCategory(formData, id) {
        return this.http.put(apiUrl + 'api/category/' + id, formData);
    }

}
