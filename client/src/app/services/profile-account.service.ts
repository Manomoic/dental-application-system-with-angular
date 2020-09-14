import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';

export interface UserRegistrationForm {
  email: string;
  password: string;
}

export interface TokenRespose {
  token: string;
}

let headers = new HttpHeaders({
  'Content-Type': 'application/json; charset=UTF-8',
  'Access-Control-Allow-Origin': 'http://localhost:8000',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
  'Access-Control-Allow-Methods': ['POST, GET, PUT, DELETE'],
});

@Injectable({
  providedIn: 'root',
})
export class ProfileAccountService {
  constructor(
    private http: HttpClient,
    private tokenAuth: AuthService,
    private router: Router
  ) {}

  public createAccount(account: UserRegistrationForm): Observable<any> {
    return this.http.post<any>(
      `${environment.userAPI}/user/register`,
      account,
      { headers }
    );
  }

  public createLogin(account: UserRegistrationForm): Observable<any> {
    const register = this.http.post<any>(
      `${environment.userAPI}/user/login`,
      account,
      { headers }
    );

    const submit = register.pipe(
      map((generatedToken: TokenRespose) => {
        if (generatedToken.token) {
          this.tokenAuth.saveToken(generatedToken.token);
        }
        return generatedToken;
      })
    );

    return submit;
  }

  public logout(): any {
    if (this.tokenAuth.isUserLoggedIn() == true) {
      this.http.get<any>(`${environment.userAPI}/user/logout`, { headers });

      window.localStorage.removeItem('Authorization');
      return this.router.navigate(['/login']);
    }
  }

  public load_profile(): Observable<any> {
    if (this.tokenAuth.isUserLoggedIn() == true) {
      return this.http.get<any>(`${environment.userAPI}/profile/profile`, {
        headers,
      });
    }
  }

  public update_profile(update: any): Observable<any> {
    if (this.tokenAuth.isUserLoggedIn() == true) {
      return this.http.post<any>(
        `${environment.userAPI}/profile/update_profile`,
        update,
        {
          headers,
        }
      );
    }
  }

  public create_bookings(bookings: any): Observable<any> {
    if (this.tokenAuth.isUserLoggedIn() == true) {
      return this.http.post<any>(
        `${environment.userAPI}/profile/create_bookings`,
        bookings,
        { headers }
      );
    }
  }

  public view_bookings(): any {
    if (this.tokenAuth.isUserLoggedIn() == true) {
      return this.http.get<any>(
        `${environment.userAPI}/profile/view_bookings`,
        {
          headers,
        }
      );
    }
  }

  public view_booked_client(id: any): Observable<any> {
    if (this.tokenAuth.isUserLoggedIn() == true) {
      return this.http.get<any>(
        `${environment.userAPI}/profile/booking-details/${id}`
      );
    }
  }
}
