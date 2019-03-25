import { Component, OnInit } from '@angular/core';
import {  UserService } from '../../service/index';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
 	public users: any = [];
 	public deleteUserId = null;
 	public editUserId = null;
 	public isSubmitting = false;
	public error: any = [];
	public listView = true;
	public loading = false;

	form: any = {
		name: '',
		email: ''
	};

	constructor(private userService: UserService, private toastr: ToastrService) { }

	ngOnInit() {
		this.findUserList();
	}

  	findUserList() {
		this.loading = true;
		this.userService.findUserList().subscribe(response => {
			let res = JSON.parse(JSON.stringify(response));
			this.users = res.data;
			this.loading = false;
		},error => {
			console.log(error);
			this.loading = false;
		});
	}

	findDeleteUser(id) {
		this.deleteUserId = id;
	}

	findEditUser(id) {
		this.isSubmitting = true;
		this.listView = false;
		this.editUserId = id;
		this.userService.findEditUser(this.editUserId).subscribe(response => {
			let res = JSON.parse(JSON.stringify(response));
			if (res.code == 200) {
				this.form = res.data;
			} else if (res.code == 400) {
				this.toastr.error(res.massage, "Error!");
			}
			this.isSubmitting = false;
		},error => {
			console.log(error);
			this.isSubmitting = false;
		});
	}

	updateUser() {
		this.isSubmitting = true;
		this.userService.updateUser(this.form, this.editUserId).subscribe(response => {
			let res = JSON.parse(JSON.stringify(response));
			if (res.code == 200) {
				this.toastr.success(res.massage, "Success!");
				this.findUserList();
				this.listView = true;
			} else if (res.code == 422) {
				this.error = res.massage;
			} else if (res.code == 400) {
				this.toastr.error(res.massage, "Error!");
			}
			this.isSubmitting = false;
		},error => {
			console.log(error);
			this.isSubmitting = false;

		});
	}

	deleteUser() {
		this.userService.deleteUser(this.deleteUserId).subscribe(response => {
			let res = JSON.parse(JSON.stringify(response));
			if (res.code == 200) {
				this.toastr.success(res.massage, "Success!");
				this.findUserList();
			} else if (res.code == 400) {
				this.toastr.error(res.massage, "Error!");
			}
		},error => {
			console.log(error);
		});
	}

	backToUserList() {
		this.listView = true;
	}

}
