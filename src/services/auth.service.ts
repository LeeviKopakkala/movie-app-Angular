import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from '../config';

import { User } from '../app/models/user';

@Injectable()
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${Config.apiUrl}/user/login`, { Authorization: 'Basic ZW5kdW14Oll0U21DbU9wU1I=' ,email: username, password: password })
            .pipe(map(user => {
                // If User is set and has a token
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }
    register(name: string, username: string, password: string) {
        return this.http.post<any>(`${Config.apiUrl}/user/register`, { Authorization: 'Basic ZW5kdW14Oll0U21DbU9wU1I=' , name: name, email: username, password: password })
            .pipe(map(user => {
                // If User is set and has a token
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        window.location.reload();
    }
}