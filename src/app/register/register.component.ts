import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/index';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    form: any = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    };

    public error = [];
    public isSubmitting = false;

    constructor(private authenticationService: AuthenticationService,
                private toastr: ToastrService,
                private router: Router) {

    }

    ngOnInit() {

    }
    register() {
        this.isSubmitting = true;
        this.authenticationService.registration(this.form).subscribe(response => {
            let res = JSON.parse(JSON.stringify(response));
            if (res.code == 422) {
                this.error = res.massage;
            } else if (res.code == 400) {
                this.toastr.error(res.massage, "Error!");
            } else if (res.code == 200) {
                this.toastr.success(res.massage, "Success!");
                this.router.navigate(['/login']);
            }
            this.isSubmitting = false;
        }, error => {
            console.log(error);
            this.isSubmitting = false;
        });
    }
}
