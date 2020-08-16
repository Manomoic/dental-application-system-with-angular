import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileAccountService } from './../../services/profile-account.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css'],
})
export class BookingDetailsComponent implements OnInit {
  constructor(private profile: ProfileAccountService) {}
  public profile_user_id: string;
  public profile_user_array = [];

  ngOnInit(): void {
    this.profile.view_bookings().subscribe(
      (full_patient_profile: any) => {
        this.profile
          .view_booked_client(full_patient_profile.userProfile._id)
          .subscribe(
            (singleUserDetails: any) => {
              this.profile_user_array.push(singleUserDetails.userProfile);
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
