import {Component, OnInit} from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ AuthenticationService ]
})
export class AppComponent implements OnInit {
  showMenu = false;

  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit() {

  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}