import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ApiService } from  '../../services/api.service';
import { AuthenticationService } from '../../services/auth.service';


@Component({
  selector: 'app-suggested',
  templateUrl: './suggested.component.html',
  styleUrls: ['./suggested.component.scss']
})
export class SuggestedComponent implements OnInit {

  @Input() title:string;

  popularMovies:  Array<any> = [];
  constructor(private  apiService:  ApiService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.getMovie(this.title);
  }

  public getMovie(title){
    this.apiService.searchMovie(title).subscribe((data:  Array<any>) => {
        this.popularMovies = data;
    });
  }


}
