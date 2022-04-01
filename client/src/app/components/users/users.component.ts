import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Users[];

  constructor(private router: Router, private usersService: UsersService, private dialogModule: DialogModule, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe(res => {
      this.users = res;
    })
  }

  deleteUser(user: string) {
      this.confirmationService.confirm({
      message: 'Are you sure do you want to delete this user?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(user).subscribe(res => this.getUsers())
      },
      reject: () => { }
    });
  }

  editUser(user: string) {
    this.router.navigateByUrl(`users/form/${user}`)
  }

}

