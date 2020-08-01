import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileAccountService } from './../../services/profile-account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public success: Boolean = false;
  public isValidated: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: ProfileAccountService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }
  // manomoic@gmail.com
  onLoginHandler() {
    if (!this.loginForm.value.email) {
      this.isValidated = 'Email Field Cannot Be Empty.';
      this.success = false;
    } else if (!this.loginForm.value.password) {
      this.isValidated = 'Password Field Cannot Be Empty.';
      this.success = false;
    } else {
      this.auth.createLogin(this.loginForm.value).subscribe(
        (dataLoginResponse) => {
          if (dataLoginResponse.errorOuput) {
            this.isValidated = dataLoginResponse.errorOuput;
          } else if (dataLoginResponse.invalidEmail) {
            this.isValidated = dataLoginResponse.invalidEmail;
          } else if (dataLoginResponse.invalidPassword) {
            this.isValidated = dataLoginResponse.invalidPassword;
            this.success = false;
          } else {
            localStorage.setItem(
              'Authorization',
              dataLoginResponse.accessToken
            );
            this.router.navigate(['/']);
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err.error instanceof Error);
        }
      );
    }
  }
}
