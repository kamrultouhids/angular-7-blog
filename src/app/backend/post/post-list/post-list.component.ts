import {Component, OnInit} from '@angular/core';
import {PostService} from '../../../service/index';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

    public posts: any = [];
    public error: any = [];
    public deletePostId = null;
    public loading = false;

    constructor(private postService: PostService,
                private toastr: ToastrService) {
    }

    ngOnInit() {
        this.findPostList();
    }

    findDeletePost(id) {
        this.deletePostId = id;
    }

    findPostList() {
        this.loading = true;
        this.postService.findPostList().subscribe(response => {
            let res = JSON.parse(JSON.stringify(response));
            if (res.code == 200) {
                this.posts = res.data.posts;
            }else if (res.code == 400) {
                this.toastr.error(res.massage, "Error!");
            }
            this.loading = false;
        },error => {
            console.log(error);
            this.loading = false;
        })
    }

    deleteCategory() {
        this.postService.deletePost(this.deletePostId).subscribe(response => {
            let res = JSON.parse(JSON.stringify(response));
            if (res.code == 200) {
                this.toastr.success(res.massage, "Success!");
                this.findPostList();
            } else if (res.code == 400) {
                this.toastr.error(res.massage, "Error!");
            }
        },error => {
            console.log(error);
        });
    }

}
