import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Users[];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe(res => {
      this.users = res;
      console.log(this.users);
    })
  }

  deleteUser(user: string) {
    this.usersService.deleteUser(user).subscribe(res => this.getUsers())
    
  }

  editUser(user: string) {
    
  }

}
