import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Users } from 'src/app/models/users';
import { AuthGardService } from 'src/app/services/auth-gard.service';
import { LocalstorageService } from 'src/app/services/local-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {

  loginForm: FormGroup;
  isSubmitted: boolean = false;
  user: Users;
  authError = false;
  authMessage = 'Email or Password are wrong';

  constructor(private localStorage: LocalstorageService, private authGard: AuthGardService, private formBuilder: FormBuilder, private userService: UsersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required],
      name: ['', Validators.required],
      id: ['']
    })
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;

      if (this.loginForm.invalid) return;
      const data = {
        email: this.loginFormControls.email.value,
        password: this.loginFormControls.password.value,
        username: this.loginFormControls.username.value,
        id: this.loginFormControls.id.value,
        name: this.loginFormControls.name.value,
    }

    this.userService.login(data).subscribe(
      (user) => {
        this.authError = false;
        this.localStorage.setToken(user.token);
        console.log(user.token);
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error in the Server, please try again later!';
        }
      }
    );
  }

}
