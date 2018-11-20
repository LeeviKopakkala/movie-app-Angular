import { Component, OnInit } from '@angular/core';
import { ApiService } from  '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  keyword: string;
  private sub: any;
  searchForm: FormGroup;

  constructor(private  apiService:  ApiService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.keyword = params['keyword']; // (+) converts string 'id' to a number
   });
   this.searchForm = this.formBuilder.group({
    search: ['', Validators.required]
  });
  }

  // Get form fields
  get f() { return this.searchForm.controls; }

  public onSearch(){
    
    this.router.navigate(['/search/'+this.f.search.value]);
    window.location.reload();
  }

}
