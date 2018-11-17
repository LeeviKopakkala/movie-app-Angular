import { Injectable } from  '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { Config } from '../config';

@Injectable({
providedIn:  'root'
})

export  class  ApiService {

  constructor(private  httpClient:  HttpClient) {}

  getMovies(){
      return  this.httpClient.get(`${Config.apiUrl}/inserthere`);
  }

}