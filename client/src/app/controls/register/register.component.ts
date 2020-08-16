import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileAccountService } from './../../services/profile-account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public success: Boolean = false;
  public isValidated: string;
  public userAccountSelected = [
    { value: '-1', label: '' },
    { value: '0', label: 'User' },
    { value: '1', label: 'Admin' },
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: ProfileAccountService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],

      confirm_password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],

      selectUserAccount: ['', Validators.required],
    });
  }

  onRegisterHandler() {
    if (!this.registerForm.value.email) {
      this.isValidated = 'Email Field Cannot Be Empty.';
      this.success = false;
    } else if (!this.registerForm.value.password) {
      this.isValidated = 'Password Field Cannot Be Empty.';
      this.success = false;
    } else if (!this.registerForm.value.confirm_password) {
      this.isValidated = 'Confirm Password Field Cannot Be Empty.';
      this.success = false;
    } else if (
      this.registerForm.value.password !==
      this.registerForm.value.confirm_password
    ) {
      this.isValidated = 'Passwords Do Not Match.';
      this.success = false;
    } else if (!this.registerForm.value.selectUserAccount) {
      this.isValidated = 'Please Select Your Account.';
      this.success = false;
    } else {
      this.auth.createAccount(this.registerForm.value).subscribe(
        (response: any) => {
          if (response.errorOuput) {
            this.isValidated = response.errorOuput;
          } else if (response.errorMessage) {
            this.isValidated = response.errorMessage;
          } else {
            localStorage.setItem('Authorization', response.accessToken);
            this.router.navigate(['/login']);
            return (this.success = true);
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err.error instanceof Error);
        }
      );
    }
  }

  selectUserAccountHandler() {}
}
