import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { ProfileAccountService } from './../../services/profile-account.service';

@Component({
  selector: 'app-create-bookings',
  templateUrl: './create-bookings.component.html',
  styleUrls: ['./create-bookings.component.css'],
})
export class CreateBookingsComponent implements OnInit {
  public profileFullNames: string;
  public setAppointmentForm: FormGroup;
  public success: boolean = false;
  public isValidated: string;
  public userDetailsArray = [];
  public dentalTypeArray = [
    { value: '-1', label: '' },
    { value: '0', label: 'General Dentists' },
    { value: '1', label: 'Pedodontists or Pediatric Dentists' },
    { value: '2', label: 'Oral pathologists and oral surgeons' },
    { value: '3', label: 'Orthodontists' },
    { value: '4', label: 'Periodontists' },
    { value: '5', label: 'Endodontists' },
    { value: '6', label: 'Prosthodontists' },
  ];
  public doctorsNameArray = [
    { value: '-1', label: '' },
    { value: '0', label: 'Dr. Idris Alba' },
    { value: '1', label: 'Dr. Morgan Freeman' },
    { value: '2', label: 'Dr. Paul Moonie' },
  ];

  constructor(
    private profile: ProfileAccountService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profile.load_profile().subscribe(
      (profileData: any) => {
        this.userDetailsArray.push(profileData.profile);
        console.log(profileData.profile);
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
     * -----------------------------------------------------
     */
    this.setAppointmentForm = this.fb.group({
      doctorsName: ['', Validators.required],
      dentalType: ['', Validators.required],
      appointmentDate: ['', Validators.required],
    });
  }

  onSubmitAppointment() {
    if (!this.setAppointmentForm.value.doctorsName) {
      this.isValidated = 'Please Select A Dental Specialist.';
      this.success = false;
    } else if (!this.setAppointmentForm.value.dentalType) {
      this.isValidated = 'Please Select A Dental Specialist.';
      this.success = false;
    } else if (!this.setAppointmentForm.value.appointmentDate) {
      this.isValidated = 'Please Select An Appointment Date.';
      this.success = false;
    } else {
      this.profile.create_bookings(this.setAppointmentForm.value).subscribe(
        (bookingResponse: any) => {
          if (bookingResponse.errorOutput) {
            console.log(bookingResponse.errorOutput);
          } else {
            console.log(bookingResponse.bookingsResults);
            this.router.navigate(['/view-bookings']);
            this.success = true;
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

  selectDentalTypeChangeHandler() {
    // if (!this.setAppointmentForm.value.dentaltype) {
    //   this.isValidated = 'Please Select Your Preferred Dental Type.';
    //   this.success = false;
    // }
    // return this.setAppointmentForm.value.dentaltype;
  }

  selectDoctorNameChangeHandler() {
    // if (!this.setAppointmentForm.value.doctorsname) {
    //   this.isValidated = 'Please Select A Dental Specialist.';
    //   this.success = false;
    // }
    // return this.setAppointmentForm.value.doctorsname;
  }
}
