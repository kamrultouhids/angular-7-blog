import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/index';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form: any = {
        email: '',
        password: ''
    };

    public error = [];
    public isSubmitting = false;

    constructor(private authenticationService: AuthenticationService,
                private toastr: ToastrService,
                private router: Router) {

    }

    ngOnInit() {
        if (localStorage.getItem('token')) {
            this.router.navigate(['dashboard']);
        }
    }

    login() {
        this.isSubmitting = true;
        this.authenticationService.attemptAuth(this.form).subscribe(response => {
            let res = JSON.parse(JSON.stringify(response));
            if (res.code == 422) {
                this.error = res.massage;
            } else if (res.code == 400) {
                this.toastr.error(res.massage, "Error!");
            } else if (res.code == 200) {
                localStorage.setItem('token', res.data.token);
                this.router.navigate(['/dashboard'])
            }
            this.isSubmitting = false;
        }, error => {
            console.log(error);
            this.isSubmitting = false;
        });
    }

}
