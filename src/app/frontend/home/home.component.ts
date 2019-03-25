import {Component, OnInit} from '@angular/core';
import {FrontendService} from '../../service/index';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public categories: any = [];
    public postsResults: any = [];
    public categoryloading = false;
    public postLoading = false;
    public category_id = '';
    public keywordSearch = '';

    constructor(public frontendService: FrontendService) {
    }

    ngOnInit() {
        this.findCategoryList();
        this.findAndFilterPosts(this.category_id, this.keywordSearch);
    }

    findCategoryList() {
        this.categoryloading = true;
        this.frontendService.findCategoryList().subscribe(response => {
            let res = JSON.parse(JSON.stringify(response));
            if (res.code == 200) {
                this.categories = res.data;
            }
            this.categoryloading = false;
        }, error => {
            console.log(error);
            this.categoryloading = false;
        });
    }

    findAndFilterPosts(category_id, keywordSearch) {
        this.postLoading = true;
        this.frontendService.findAndFilterPosts(category_id, keywordSearch).subscribe(response => {
            let res = JSON.parse(JSON.stringify(response));
            if (res.code == 200) {
                this.postsResults = res.data;
            }
            this.postLoading = false;
        }, error => {
            console.log(error);
            this.postLoading = false;
        });
    }

    makeImage(picture) {
        return this.postsResults.image_url + picture;
    }

    sliceDescription(text) {
        return text.slice(0, 200);
    }

    findCategoryWisePost(id) {
        this.category_id = id;
        this.findAndFilterPosts(this.category_id, '');
    }

    searchPost() {
        if(this.keywordSearch !=''){
            this.findAndFilterPosts('', this.keywordSearch);
        }
    }


}
