import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from  '../../services/api.service';
import { AuthenticationService } from '../../services/auth.service';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  popularMovies:  Array<any> = [];
  constructor(private  apiService:  ApiService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.getPlaylist();
  }

  public getPlaylist(){
    this.apiService.getUserPlayList().subscribe((data:  Array<any>) => {
        this.popularMovies = data;
    });
  }
}
