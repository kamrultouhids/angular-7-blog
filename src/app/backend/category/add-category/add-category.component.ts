import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../service/index';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

    public isSubmitting = false;
    public error: any = [];

    form: any = {
        name: ''
    };

    constructor(private categoryService: CategoryService,
                private toastr: ToastrService,
                private router: Router) {

    }


    ngOnInit() {
    }

    storeCategory() {
        this.isSubmitting = true;
        this.categoryService.saveCategory(this.form).subscribe(response => {
            let res = JSON.parse(JSON.stringify(response));
            if (res.code == 422) {
                this.error = res.massage;
            } else if (res.code == 400) {
                this.toastr.error(res.massage, "Error!");
            } else if (res.code == 200) {
                this.toastr.success(res.massage, "Success!");
                this.router.navigate(['/category']);
            }
            this.isSubmitting = false;
        }, error => {
            console.log(error);
            this.isSubmitting = false;
        });
    }
}
