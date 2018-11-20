import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  keyword: string;
  private sub: any;

  constructor(private  apiService:  ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.keyword = params['keyword']; // (+) converts string 'id' to a number
   });
  }

}
