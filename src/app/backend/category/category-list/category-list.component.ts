import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../service/index';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

    public categories: any = [];
    public error: any = [];
    public deleteCategoryId = null;
    public loading = false;

    constructor(private categoryService: CategoryService,
                private toastr: ToastrService) {
    }

    ngOnInit() {
        this.findCategoryList();
    }


    findCategoryList() {
        this.loading = true;
        this.categoryService.findCategoryList().subscribe(response => {
            let res = JSON.parse(JSON.stringify(response));
            if (res.code == 200) {
                this.categories = res.data;
            }else if (res.code == 400) {
                this.toastr.error(res.massage, "Error!");
            }
            this.loading = false;
        }, error => {
            console.log(error);
            this.loading = false;
        });
    }

    findDeleteCategory(id) {
        this.deleteCategoryId = id;
    }

    deleteCategory() {
        this.categoryService.deleteCategory(this.deleteCategoryId).subscribe(response => {
            let res = JSON.parse(JSON.stringify(response));
            if (res.code == 200) {
                this.toastr.success(res.massage, "Success!");
                this.findCategoryList();
            } else if (res.code == 400) {
                this.toastr.error(res.massage, "Error!");
            }
        },error => {
            console.log(error);
        });
    }

}
