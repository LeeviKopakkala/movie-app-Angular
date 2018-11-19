import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from  '../../services/api.service';
import { SuggestedComponent } from '../suggested/suggested.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
    this.getUserDetails();
  }

  public getUserDetails(){
    this.apiService.getUser().subscribe((data: Array<any>) => {
        this.userDetails = data;
    });
  }

}
