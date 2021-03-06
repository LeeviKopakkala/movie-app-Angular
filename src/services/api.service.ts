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

  searchMovie(keyword){
      let user = this.authService.currentUserValue;
      console.log(user);
      return this.http.post<any>(`${Config.apiUrl}/movie/search`, { Authorization: 'Basic ZW5kdW14Oll0U21DbU9wU1I=', 'JWT-X': 'Bearer' + user.token, 'keyword': keyword })
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
            console.log("PLAYLIST");
            console.log(movie);
            return movie;
        }));
    }
    getUser(){
        return this.http.get<any>(`${Config.apiUrl}/user/getInfo`)
        .pipe(map(user => {
            // If User is set and has a token
            console.log(user);
            return user;
        }));
    }

    addToPlaylist(id, name){
        let user = this.authService.currentUserValue;
        console.log(user);
        console.log(id, name);
        return this.http.post<any>(`${Config.apiUrl}/movie/addToPlaylist`, { 'movieId': id, 'movieName': name,  Authorization: 'Basic ZW5kdW14Oll0U21DbU9wU1I=', 'JWT-X': 'Bearer' + user.token })
        .pipe(map(movie => {
            // If User is set and has a token
            console.log(movie);
            return movie;
        }));
    }
    removeFromPlaylist(id){
        let user = this.authService.currentUserValue;
        console.log(user);
        console.log(id);
        return this.http.post<any>(`${Config.apiUrl}/movie/removeFromPlaylist`, { 'movieId': id, 'movieName': name,  Authorization: 'Basic ZW5kdW14Oll0U21DbU9wU1I=', 'JWT-X': 'Bearer' + user.token })
        .pipe(map(movie => {
            // If User is set and has a token
            return movie;
        }));
    }

    setWatched(id){
        let user = this.authService.currentUserValue;
        console.log(user);
        console.log(id, name);
        return this.http.post<any>(`${Config.apiUrl}/movie/setWatched`, { 'movieId': id, 'movieName': name,  Authorization: 'Basic ZW5kdW14Oll0U21DbU9wU1I=', 'JWT-X': 'Bearer' + user.token })
        .pipe(map(movie => {
            // If User is set and has a token
            console.log(movie);
            return movie;
        }));
    }
}
    