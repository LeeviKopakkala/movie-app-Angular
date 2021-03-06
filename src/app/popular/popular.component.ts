import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from  '../../services/api.service';
import { AuthenticationService } from '../../services/auth.service';


@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
})
export class PopularComponent implements OnInit {

  popularMovies:  Array<any> = [];
  constructor(private  apiService:  ApiService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.getPopular();
  }

  public getPopular(){
    this.apiService.getPopular().subscribe((data:  Array<any>) => {
        this.popularMovies = data;
    });
  }

}
