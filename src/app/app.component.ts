import {Component, DoCheck, OnInit} from '@angular/core';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'Property Management';
  isLogin: boolean;
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLogin = this.authService.isLogin();
  }

  ngDoCheck(): void {
    this.isLogin = this.authService.isLogin();
  }

  logout(): void {
    this.authService.logout();
    this.isLogin = false;
  }
}
