import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenGuardGuard } from './services/token-guard.guard';
import { AuthService } from './services/auth.service';
import { ProfileAccountService } from './services/profile-account.service';
import { InterceptorService } from './services/interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './controls/login/login.component';
import { LogoutComponent } from './controls/logout/logout.component';
import { RegisterComponent } from './controls/register/register.component';
import { CreateBookingsComponent } from './booking/create-bookings/create-bookings.component';
import { ViewBookingsComponent } from './booking/view-bookings/view-bookings.component';
import { HomeComponent } from './layout/home/home.component';
import { BookingDetailsComponent } from './booking/booking-details/booking-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    CreateBookingsComponent,
    ViewBookingsComponent,
    HomeComponent,
    BookingDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    TokenGuardGuard,
    AuthService,
    ProfileAccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
