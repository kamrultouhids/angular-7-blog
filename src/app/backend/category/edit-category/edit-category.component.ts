import {Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../service/index';
import {ToastrService} from 'ngx-toastr';
import {Router, ActivatedRoute  } from '@angular/router';


@Component({
    selector: 'app-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

    public isSubmitting = false;
    public error: any = [];
    public editId;

    form: any = {
        name: ''
    };

    constructor(private categoryService: CategoryService,
                private toastr: ToastrService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {

    }


    ngOnInit() {
        this.editId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
        this.findEditCategory();
    }

    findEditCategory() {
        this.isSubmitting = true;
        this.categoryService.findEditCategory(this.editId).subscribe(response => {
            let res = JSON.parse(JSON.stringify(response));
            if (res.code == 200) {
                this.form = res.data;
            } else if (res.code == 400) {
                this.toastr.error(res.massage, "Error!");
            }
            this.isSubmitting = false;
        }, error => {
            console.log(error);
            this.isSubmitting = false;
        });
    }

    updateCategory() {
        this.isSubmitting = true;
        this.categoryService.updateCategory(this.form,this.editId).subscribe(response => {
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
