import { Component, OnInit } from '@angular/core';
import { ProfileAccountService } from './../../services/profile-account.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private profile: ProfileAccountService) {}

  ngOnInit(): void {
    return this.profile.logout();
  }
}
