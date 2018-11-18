import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  videoPlayer: HTMLVideoElement;

  @ViewChild('videoPlayer') videoplayer: any;

  toggleVideo(event: any) {
    setTimeout(function(){
      this.videoplayer.nativeElement.play();
    },3000);
      
  }

  constructor() { }

  ngOnInit() {
  }

}
