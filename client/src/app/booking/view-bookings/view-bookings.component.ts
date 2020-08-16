import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileAccountService } from './../../services/profile-account.service';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css'],
})
export class ViewBookingsComponent implements OnInit {
  public totalBookingCount: number;
  public bookingResultsArray = [];
  public userDetailsArray = [];
  public allUserBookedForAppointmentArray = [];

  constructor(private profile: ProfileAccountService, private router: Router) {}

  ngOnInit(): void {
    this.profile.load_profile().subscribe(
      (profileData: any) => {
        this.userDetailsArray.push(profileData.profile);
        /**
         * End Bookings Function
         */
        this.profile.view_bookings().subscribe(
          (bookingsOutput: any) => {
            if (bookingsOutput.error) {
              console.log(bookingsOutput.errorOutput);
            }

            if (bookingsOutput.userProfile.role == 'User') {
              this.allUserBookedForAppointmentArray.push(
                bookingsOutput.userProfile
              );
            } else {
              this.totalBookingCount = bookingsOutput.userProfile.length;

              bookingsOutput.userProfile.map((all_results) => {
                this.bookingResultsArray.push(all_results);
              });
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
        /**
         * End Bookings Function
         */
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

  onViewBookedAppointment(appointment_user_id: any) {
    this.profile.view_booked_client(appointment_user_id).subscribe(
      (singleRecord: any) => {
        console.log(singleRecord, appointment_user_id);
        this.router.navigate(['booking-details/' + appointment_user_id]);
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
