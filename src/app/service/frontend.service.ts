import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiUrl} from '../../environments/config';

@Injectable({
    providedIn: 'root'
})
export class FrontendService {

    constructor(private http: HttpClient) {
    }

    findCategoryList() {
        return this.http.get(apiUrl + 'api/frontend/findCategoryList');
    }

    findAndFilterPosts(category_id,searchKeywords) {
        return this.http.get(apiUrl + 'api/frontend/findAndFilterPosts?category_id='+category_id+'&keywordSearch='+searchKeywords);
    }
}
