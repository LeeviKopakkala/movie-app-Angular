import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  private movieDetails:  Array<object> = [];
  id: string;
  private sub: any;

  constructor(private  apiService:  ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
   });
    this.getMovieDetails(this.id);
  }

  public getMovieDetails(id){
    this.apiService.getMovieDetails(id).subscribe((data:  Array<object>) => {
        this.movieDetails = data;
    });
  }
  

}
