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

  searchMovie(){
      let user = this.authService.currentUserValue;
      console.log(user);
      return this.http.post<any>(`${Config.apiUrl}/movie/search`, { Authorization: 'Basic ZW5kdW14Oll0U21DbU9wU1I=', 'JWT-X': 'Bearer' + user.token, 'keyword': 'Dead' })
      .pipe(map(movie => {
          // If User is set and has a token
          console.log(movie);
          return movie;
      }));
  }

    getPopular(){
        let user = this.authService.currentUserValue;
        console.log(user);
        return this.http.get<any>(`${Config.apiUrl}/movie/getToplist`, { })
        .pipe(map(movie => {
            // If User is set and has a token
            console.log(movie);
            return movie;
        }));
    }

    getMovieDetails(id){
        let user = this.authService.currentUserValue;
        console.log(user);
        return this.http.post<any>(`${Config.apiUrl}/movie/findById`, { Authorization: 'Basic ZW5kdW14Oll0U21DbU9wU1I=', 'JWT-X': 'Bearer' + user.token, 'movieId': id })
        .pipe(map(movie => {
            // If User is set and has a token
            console.log(movie);
            return movie;
        }));
    }

    getUserPlayList(){
        let user = this.authService.currentUserValue;
        console.log(user);
        return this.http.post<any>(`${Config.apiUrl}/movie/showPlaylist`, { Authorization: 'Basic ZW5kdW14Oll0U21DbU9wU1I=', 'JWT-X': 'Bearer' + user.token })
        .pipe(map(movie => {
            // If User is set and has a token
            console.log(movie);
            return movie;
        }));
    }
    getUser(){
        return this.http.get<any>(`${Config.apiUrl}user/getInfo`)
        .pipe(map(user => {
            // If User is set and has a token
            console.log(user);
            return user;
        }));
    }
    

}