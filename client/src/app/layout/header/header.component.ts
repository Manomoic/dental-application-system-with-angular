import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public navbar_brand_name: string = 'Dental';

  constructor(public tokenAuth: AuthService) {}

  ngOnInit(): void {}
}
