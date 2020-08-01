import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './layout/home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './controls/register/register.component';
import { LoginComponent } from './controls/login/login.component';
import { LogoutComponent } from './controls/logout/logout.component';
import { CreateBookingsComponent } from './booking/create-bookings/create-bookings.component';
import { ViewBookingsComponent } from './booking/view-bookings/view-bookings.component';

import { TokenGuardGuard } from './services/token-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [TokenGuardGuard],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'create-bookings',
    component: CreateBookingsComponent,
    canActivate: [TokenGuardGuard],
  },
  {
    path: 'view-bookings',
    component: ViewBookingsComponent,
    canActivate: [TokenGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
