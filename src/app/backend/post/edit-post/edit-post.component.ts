import {Component, OnInit} from '@angular/core';
import {PostService, CategoryService} from '../../../service/index';
import {ToastrService} from 'ngx-toastr';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-edit-post',
    templateUrl: './edit-post.component.html',
    styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

    public isSubmitting = false;
    public error: any = [];
    public categories: any = [];
    public editId;
    public imageUrl = '';
    public previousImageUrl = '';

    form: any = {
        category_id: '',
        title: '',
        description: '',
        date: '',
        post_slug: '',
        status: '',
        picture: '',
    };

    constructor(private postService: PostService,
                private categoryService: CategoryService,
                private toastr: ToastrService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {

    }

    ngOnInit() {
        this.editId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
        this.findCategoryList();
        this.findEditPost();
    }

    generatePostSlug() {
        var slugify = this.slugify(this.form.title);
        this.form.post_slug = slugify;

    }

    slugify(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }

    processFile(event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.readAsDataURL(event.target.files[0]); // read file as data url

            reader.onload = (event: Event) => {
                _this.form.newPicture = reader.result;
                _this.previousImageUrl = '';
            }
        }
    }

    findCategoryList() {
        this.categoryService.findCategoryList().subscribe(response => {
            let res = JSON.parse(JSON.stringify(response));
            if (res.code == 200) {
                this.categories = res.data;
            }
        }, error => {
            console.log(error);
        });
    }

    findEditPost() {
        this.isSubmitting = true;
        this.postService.findEditPost(this.editId).subscribe(response => {
            let res = JSON.parse(JSON.stringify(response));
            if (res.code == 200) {
                this.form = res.data.editModeData;
                this.previousImageUrl = res.data.editModeData.picture;
                this.imageUrl = res.data.image_url;
            } else if (res.code == 400) {
                this.toastr.error(res.massage, "Error!");
            }
            this.isSubmitting = false;
        }, error => {
            console.log(error);
            this.isSubmitting = false;
        });
    }

    updatePost() {
        this.isSubmitting = true;
        this.postService.updatePost(this.form,this.editId).subscribe(response => {
            let res = JSON.parse(JSON.stringify(response));
            if (res.code == 422) {
                this.error = res.massage;
            } else if (res.code == 400) {
                this.toastr.error(res.massage, "Error!");
            } else if (res.code == 200) {
                this.toastr.success(res.massage, "Success!");
                this.router.navigate(['/post']);
            }
            this.isSubmitting = false;
        }, error => {
            this.isSubmitting = false;
        });
    }

    makeImage() {
        return this.imageUrl + this.previousImageUrl;
    }
}
