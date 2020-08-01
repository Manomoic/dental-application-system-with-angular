import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenGuardGuard implements CanActivate {
  constructor(private tokenAuth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.tokenAuth.isUserLoggedIn()) return true;

    this.router.navigate(['/login']);
    return false;
  }
}
