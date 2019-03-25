import {Component, OnInit} from '@angular/core';
import {MixinsService} from '../../service/index';
import {Router} from '@angular/router';

@Component({
    selector: 'app-backend-header',
    templateUrl: './backend-header.component.html',
    styleUrls: ['./backend-header.component.css']
})
export class BackendHeaderComponent implements OnInit {

    public authUser: any = {};

    constructor(private mixinsService: MixinsService,
                private router: Router) {
    }

    ngOnInit() {
        this.findAuthUser();
    }

    findAuthUser() {
        this.mixinsService.findAuthUser().subscribe(response => {
            let res = JSON.parse(JSON.stringify(response));
            this.authUser = res.data;
        }, error => {
            console.log(error);
        });
    }

    logout() {
        localStorage.setItem('token', '');
        this.router.navigate(['login']);
    }

}
