import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from  '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  videoPlayer: HTMLVideoElement;
  userDetails:  Array<any> = [];

  @ViewChild('videoPlayer') videoplayer: any;

  toggleVideo(event: any) {
    setTimeout(function(){
      this.videoplayer.nativeElement.play();
    },3000);
      
  }

  constructor(private  apiService:  ApiService) { }

  ngOnInit() {
  }

  public getMovieDetails(id){
    this.apiService.getMovieDetails(id).subscribe((data: Array<any>) => {
        this.userDetails = data;
    });
  }

}
