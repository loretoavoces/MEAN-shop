import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  users: Users[];
  editMode = false;
  userform: FormGroup;
  isSubmitted: boolean = false;

  constructor(private route: ActivatedRoute, private location: Location, private formBuilder: FormBuilder, private usersService: UsersService) { }

  ngOnInit(): void {
    this.createForm();
    this.checkEditMode();
  }

  onSubmit() {
    const data = {
        name: this.usersForm.name.value,
        email: this.usersForm.email.value,
        id: this.usersForm.id.value
      }
    if (this.editMode) {
      this.route.params.subscribe(params => {
        this.usersService.editUser(params.id, data).subscribe();
        this.location.back();
      })
    } else {
      this.usersService.postUser(data).toPromise();
      this.location.back();
    }
  }

  createForm() {
    this.userform = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      id: ['']
    })
  }

  get usersForm() {
    return  this.userform.controls
  }

  checkEditMode() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.editMode = true
      };
    })
  }

}
