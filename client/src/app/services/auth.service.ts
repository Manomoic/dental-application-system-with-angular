import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string;

  constructor() {}

  public saveToken(token: string): void {
    localStorage.setItem('Authorization', token);

    this.token = token;
  }

  public getToken() {
    return localStorage.getItem('Authorization');
  }

  public isUserLoggedIn() {
    return !!localStorage.getItem('Authorization');
  }
}
