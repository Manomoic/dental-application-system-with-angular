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

  constructor(private profile: ProfileAccountService) {}

  ngOnInit(): void {
    this.profile.view_bookings().subscribe(
      (bookingsOutput: any) => {
        if (bookingsOutput.error) {
          console.log(bookingsOutput.errorOutput);
        }
        // this.bookingResultsArray.push();
        bookingsOutput.bookingsRecords.map((response: any) =>
          this.bookingResultsArray.push(response)
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
  }
}
