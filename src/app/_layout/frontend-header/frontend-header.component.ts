import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-frontend-header',
	templateUrl: './frontend-header.component.html',
	styleUrls: ['./frontend-header.component.css']
})
export class FrontendHeaderComponent implements OnInit {

	public isLogin = false;

	constructor() { }

	ngOnInit() {
		if (localStorage.getItem('token')) {
			this.isLogin = true;
		}
	}

}
