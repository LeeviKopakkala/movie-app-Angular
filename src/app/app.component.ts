import {Component, OnInit} from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticationService } from './../services/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ AuthenticationService ],
})
export class AppComponent implements OnInit {
  showMenu = false;

  currentUser: User;
  logged = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        console.log(this.currentUser);
    }

  ngOnInit() {
    if (localStorage.hasOwnProperty('currentUser') == true) {
      this.logged = true;
      console.log(this.logged);
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


}