import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { ProfileAccountService } from './../services/profile-account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public success: boolean = false;
  public isValidated: string;
  public userDetailsArray = [];
  public userProfileForm: FormGroup;
  public isEditable: boolean = false;
  constructor(
    private profile: ProfileAccountService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.profile.load_profile().subscribe(
      (profileData: any) => {
        this.userDetailsArray.push(profileData.profile);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          if (err.status >= 400) console.log(err.status);
        }
        console.log({
          StatusText: err.statusText,
          Status: err.status,
        });
      }
    );

    /**
     * Form Validations
     */
    this.userProfileForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      contacts: ['', [Validators.required, Validators.maxLength(10)]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  onUpdateProfile() {
    if (!this.userProfileForm.value.firstname) {
      this.isValidated = 'Firstname Feild Cannot Be Empty.';
      this.success = false;
    } else if (!this.userProfileForm.value.lastname) {
      this.isValidated = 'Lastname Feild Cannot Be Empty.';
      this.success = false;
    } else if (!this.userProfileForm.value.contacts) {
      this.isValidated = 'Contacts Feild Cannot Be Empty.';
      this.success = false;
    } else if (!this.userProfileForm.value.gender) {
      this.isValidated = 'Gender Feild Cannot Be Empty.';
      this.success = false;
    }
    // Optional
    // else if (!this.userProfileForm.value.address) {

    //   this.success = false;
    // }
    else {
      this.profile.update_profile(this.userProfileForm.value).subscribe(
        (response: any) => {
          if (response.errorOutput) {
            this.isValidated = response.errorOutput;
            this.success = false;
          } else {
            this.isValidated = response.updatedResutlsMessage;
          }
        },

        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            if (err.status >= 400) console.log(err.status);
          }
          console.log({
            StatusText: err.statusText,
            Status: err.status,
          });
        }
      );
    }
  }

  onEditToggleButtonProfile() {
    return (this.isEditable = true);
  }

  onEditToggleButtonEdit() {
    return (this.isEditable = false);
  }
}
