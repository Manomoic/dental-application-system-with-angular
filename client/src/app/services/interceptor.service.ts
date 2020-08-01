import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private intector: Injector) {}

  intercept(req, next) {
    let theAuthService = this.intector.get(AuthService);

    let copiedToken = req.clone({
      setHeaders: { Authorization: `Bearer ${theAuthService.getToken()}` },
    });

    return next.handle(copiedToken);
  }
}
