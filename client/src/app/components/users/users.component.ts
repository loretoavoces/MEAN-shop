import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Users[];
  display: boolean = false;
  editMode: boolean;
  form: FormGroup;
  isSubmitted: boolean = false;

  constructor(private usersService: UsersService, private formBuilder: FormBuilder, private dialogModule: DialogModule, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getUsers();
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      id: ['']
    })
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

  async editUser(user: string) {
    this.display = true;
      const data = {
        name: this.usersForm.name.value,
        email: this.usersForm.email.value,
        id: user
      }
    await this.usersService.editUser(user, data).toPromise();
      this.display = false;
      this.getUsers();
  }

  async createUser() {
    this.display = true;
    this.editMode = false;
    const data = {
      name: this.usersForm.name.value,
      email: this.usersForm.email.value,
      id: this.usersForm.id.value
    }
    await this.usersService.postUser(data).toPromise();
    this.display = false;
    this.getUsers();
  }

  get usersForm() {
    return this.form.controls;
  }
}

