import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';
import * as countriesList from 'i18n-iso-countries';

declare const require: any;

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
  countries: {id: string, name: string}[];

  constructor(private route: ActivatedRoute, private location: Location, private formBuilder: FormBuilder, private usersService: UsersService) { }

  ngOnInit(): void {
    this.userform = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      country: ['', [Validators.required]],
      id: ['']
    })
    this.checkEditMode();
    this.getCountries();
  }

  onSubmit() {
    const data = {
      name: this.usersForm.name.value,
      email: this.usersForm.email.value,
      id: this.usersForm.id.value,
      country: this.usersForm.country.value,
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

  get usersForm() {
    return  this.userform.controls
  }


  checkEditMode() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.editMode = true
        this.usersService.getUser(params.id).subscribe(res => {
          this.userform.controls.name.setValue(res.name)
          this.userform.controls.email.setValue(res.email)
          this.userform.controls.country.setValue(res.country)
        });
      };
    })
  }

  getCountries() {
    countriesList.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countriesList.getNames("en", { select: "official" })).map(elm => {
      return {
        id: elm[0],
        name: elm[1]
      }
    })
  }

}
