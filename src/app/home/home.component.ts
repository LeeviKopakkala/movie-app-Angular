import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from  '../../services/api.service';
import { SuggestedComponent } from '../suggested/suggested.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  videoPlayer: HTMLVideoElement;
  userDetails:  Array<any> = [];

  searchForm: FormGroup;

  @ViewChild('videoPlayer') videoplayer: any;

  toggleVideo(event: any) {
    setTimeout(function(){
      this.videoplayer.nativeElement.play();
    },3000);
      
  }

  constructor(private  apiService:  ApiService, private formBuilder: FormBuilder, private router: Router,
    ) { }

  ngOnInit() {
    this.getUserDetails();

    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });
  }

  // Get form fields
  get f() { return this.searchForm.controls; }

  public getUserDetails(){
    this.apiService.getUser().subscribe((data: Array<any>) => {
        this.userDetails = data;
    });
  }

  public onSearch(){
    
    this.router.navigate(['/search/'+this.f.search.value]);
  }

}
