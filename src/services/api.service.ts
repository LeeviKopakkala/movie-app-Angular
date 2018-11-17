import { Injectable } from  '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { Config } from '../config';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/auth.service';

@Injectable({
providedIn:  'root'
})

export  class  ApiService {

  constructor(private http: HttpClient, private authService: AuthenticationService) {}

  getPopular(){
      let user = this.authService.currentUserValue;
      console.log(user);
      return this.http.post<any>(`${Config.apiUrl}/user/login`, {email: username, password: password })
      .pipe(map(user => {
          // If User is set and has a token
          if (user && user.token) {
              localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
      }));
  }

}