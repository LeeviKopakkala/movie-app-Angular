import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showMenu = false;

  ngOnInit() {

  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }


}