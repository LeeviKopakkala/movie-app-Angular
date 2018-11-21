
<p align="center">
  <img height="150px" src="https://media.discordapp.net/attachments/499833921513586688/512349750163669004/movieappsmall.png">
   <img height="125px" src="https://media.discordapp.net/attachments/499833921513586688/512350532401233930/movieapptransparent.png">
</p>
<p align="center">
    <img height="40px" src="https://cdn.worldvectorlogo.com/logos/angular-3.svg">
</p>
<p align="center">
    <img height="75px" src="https://ubisafe.org/images/svg-logo-laravel-6.png">
</p>

***

# Harjoitustyön tiedot

[Angular projektin repositorio](https://github.com/LeeviKopakkala/movie-app-Angular)

[Videoesittely käyttöliittymästä](https://www.youtube.com/watch?v=45yHiU1g4G0&feature=youtu.be)

#### Tekijät
* Leevi Kopakkala - K8292
* Aku Lehtonen - K9264
#### Kurssi
* TTMS0900
* TTMS0500
#### Päivämäärä
Valmistunut ja esitelty: 20.11.2018

#### Itsearvio

Vaikka molemmat olimme käyttäneet Laravelia aikaisemmin, tuli tässä projektissa paljon uusia haasteita.
Miten toteuttaa Angularin ja Laravelin, sekä ulkoisen rajapinnan (OMDB) välinen liikenne ja näiden autentikaatiot.

Loppujenlopuksi, onnistuimme hyvin ja pääsimme käyttämään aivan uusia tekniikoita saavuttaaksemme halutun lopputuloksen.
Trial and error typpisesti.

Aku Lehtonen - 5  
Leevi Kopakkala - 5

# MovieApp

MovieApp on käyttäjäpohjainen sovellus jossa käyttäjä voi luoda tunnuksen, hakea elokuvia [The Open Movie Databasesta](http://www.omdbapi.com/), hakea elokuvien tietoja ja lisätä elokuvia omalle soittolistalle. Soittolistalla elokuvat on mahdollista merkitä katsotuksi. Sovellus näyttää myös 10 käyttäjien eniten soittolistalle lisättyä elokuvaa. Sivulla listataan IMDbn Youtube kanavalta 10 viimeksi lisättyä videota jotka on haettu Youtuben virallisesta [APIsta](https://console.cloud.google.com/apis/library/youtube.googleapis.com?id=125bab65-cfb6-4f25-9826-4dcc309bc508&project=project1-1539692939637). 

## Lähtökohta

Ennen kuin tiesimme minkälaisen sovelluksen toteutamme, lähtökohtana oli toteuttaa backend [Laravelilla](https://laravel.com/), koska näimme sen todella tehokkaaksi vaihtoehdoksi luoda oikeasti tuotantokelpoinen sovellus nopeasti ja tehokkaasti. Käyttöliittymä eli sovelluksen frontend on toteutettu kokonaan omana projektinaan. Käyttöliittymä on toteutettu käyttäen [Angular](https://angular.io/) Javascript frameworkkia.

Tämän lisäksi ajattelimme, että järkevintä on liittää TTMS0900 ja TTMS0500 -opintojaksojen harjoitustyöt yhteen ja näin saada eheämpi kokonaisuus.

## Asetelma

### Paketit & työkalut:

#### JWT-Auth
[JWT](https://github.com/tymondesigns/jwt-auth) eli JSON Web Token kompakti mutta turvallinen tapa varmentaa tiedonsiirtoa osapuolten välillä. JWT on nimensä mukaisesti JSON objekti, joka sisältää automaattisesti generoidun salausavaimen. Tässä tapauksessa käyttäjän kirjautuessa luodaan token, joka lähetetään vastauksena onnistuneesta kirjautumisesta ja tallennetaan muuttujaan. Aina käyttäjän lähettäessä pyyntöjä rajapintaan jotka hakevat/välittävät jotain käyttäjään liittyvää tietoa, vaaditaan pyynnön mukana token joka varmentaa käyttäjän. Se helpottaa käytettävyyttä ja lisää turvallisuutta. Token koostuu kolmesta osasta: 

`xxxxx.yyyyy.zzzzz`

* Header
    * Sisältää kaksi osaa, Tokenin tyyppi (JWT) ja käytettävä Hash algoritmi kuten SHA256 tai RSA  
    tämän jälkeen tieto Base64Url enkoodataan
* Payload
    * Sisältää tietoa (yleensä käyttäjän) joka myös Base64Url enkoodataan, esimerkiksi:  
    ```
    {
      "sub": "1234567890",
      "name": "John Doe",
      "admin": true
    }
    ```
* Signature
    * Signature muodostuu kun enkoodattu header ja payload hashataan headerissa määritellyllä hashaus algoritmillä:
    ```
      HMACSHA256(
      base64UrlEncode(header) + "." +
      base64UrlEncode(payload),
      secret)
    ```   
Kuvassa token joka palautuu käyttäjän kirjautuessa sisään, kun käyttäjä lähettää pyytöjä takaisin APIlle, lähetetään token osana HTTP-headeria jolloin voidaan validoida käyttäjä  
`JWT-X: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QvYXBpL3VzZXIvbG9naW4iLCJpYXQiOjE1NDIyMTE4OTQsImV4cCI6MTU0MjIxNTQ5NCwibmJmIjoxNTQyMjExODk0LCJqdGkiOiJkRkxtM0laTE10cHVkbmVZIn0.5B8zpGttm5NTSDcu-Zc-GepOc4jy-r9WKzxjS9N26kw`

<img src="https://cdn.discordapp.com/attachments/514253512490614785/514254359740022794/Screenshot_2018-11-20_at_3.42.58.png">

#### Laravel-CORS
[Laravel-CORS](https://github.com/barryvdh/laravel-cors) eli Cross-Origin Resource Sharing on mekanismi jonka avulla voidaan sallia suojatun/rajoitetun pääsyn takana olevan tiedon lähettäminen valituille verkkopalveluille. Eli kutsuja lähettävän palvelun (tässä tapauksessa käyttöliittymän) toimiessa kokonaan eri osoitteessa, saadaan sallittua tiedon lähettäminen ja varmistettua sen päätyvän luotettuun osoitteeseen.

#### Guzzle
[Guzzle](http://docs.guzzlephp.org/en/stable/) on PHP-pohjainen ohjelma, joka on tarkoitettu HTTP pyyntöjen lähettämiseen. Guzzlella voi luoda helposti kutsuja, hallita evästeitä, lähettää JSON dataa ja paljon muuta. Guzzlella voi luoda synkronisia (blocking) ja asynkronisia (non-blocking) pyyntöjä. Perus hakupyynnön lähettäminen Guzzlella on vaivatonta:
```php
$client = new GuzzleHttp\Client();
$res = $client->request('GET', 'https://api.github.com/user');
echo $res->getStatusCode();
// "200"
echo $res->getHeader('content-type');
// 'application/json; charset=utf8'
echo $res->getBody();
// {"type":"User"...'
```

### Kehitysympäristö

#### Homestead
[Homestead](https://laravel.com/docs/5.7/homestead) on Laravel-kehitykseen optimoitu virtuaalikone. Se asennetaan yhtenä pakettina käyttäen [Vagranttia](https://www.vagrantup.com/), joka on erilaisten kehitysympäristöjen hallintaan ja asentamiseen käytetty työkalu. Homesteadin asentaminen ja käyttöönotto on vaivatonta eikä vaadi asennettavaksi erikseen PHP:tä, web-palvelinta tai muuta vastaavaa. Se sisältää valmiina ominaisuuksia kuten Linux (Ubuntu 18.04), Git, PHPn, Nginxin, MySQL, Composer ja paljon muuta hyödyllistä.

<img height="600px" src="https://cdn.discordapp.com/attachments/514253512490614785/514255482316128266/Screenshot_2018-11-20_at_3.47.23.png">

#### Postman
[Postman](https://www.getpostman.com/) on rajapintojen kehittämiseen tarkoitettu työkalu. Se on täysin ilmainen ja tekee kehittämisestä helpompaa ja tehokkaampaa. Postmanilla pystyy lähettämään API requesteja eli kutsuja rajapintaan haluamallaan HTTP metodilla ja ohjelma palauttaa vastauksen joko JSON, raaka tai HTML muodossa. Postmanissa pystyy luomaan kokoelmia pyynnöistä eli samaa pyyntöä voi käyttää myöhemmin uudelleen eikä sitä tarvitse laatia joka kerta uudelleen. Pyyntöön pystyy liittämään haluamiaan parametrejä ja autentikointimenetelmiä vaivattomasti. Postmanilla on mahdollista luoda myös erilaisia testejä ja monitoroimaan APIn tilaa. Postmanista on saatavilla selaimeen asennettava versio sekä työpyötäsovellus.

<img src="https://cdn.discordapp.com/attachments/514253512490614785/514253668388831252/Screenshot_2018-11-20_at_3.36.29.png">

## To-Do List

* Movie search
    * By keyword(s) ✔️	
    * By IMDb-ID ✔️
* User
    * Register ✔️
    * User login ✔️
    * Change password ✖️
    * Email verification ✖️
* Playlist
    * Get user playlist ✔️
    * Add movie to playlist ✔️
    * Get 10 most popular movies ✔️
    * Select watched / not watched ✔️
* Videos
    * Get 10 last uploaded videos from IMDb Youtube channel ✔️
    
    
## Migraatiot
```php

Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
       
```
```php
Schema::create('password_resets', function (Blueprint $table) {
            $table->string('email')->index();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

```
```php
 Schema::create('playlists', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('movie_id', 16);
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->boolean('watched')->default(false);
            $table->timestamps();
        });
```

### API Routes

```php
// Group JWT-Auth routes
Route::middleware(['jwtx.auth'])->group(function () {

    // Show signed user
    Route::get('user/getInfo', 'UserController@getInfo');

    // User playlist
    Route::post('movie/showPlaylist', 'PlaylistController@getPlaylist');
    Route::post('movie/addToPlaylist', 'PlaylistController@addToPlaylist');
    Route::post('movie/removeFromPlaylist', 'PlaylistController@removeFromPlaylist');
    Route::post('movie/setWatched', 'PlaylistController@setWatched');
    Route::post('movie/findById', 'SearchController@findById');
});

// Search from OMDb
Route::post('movie/search', 'SearchController@searchByKeyword');

// IMDb's Youtube channel 10 latest videos
Route::get('video/imdbLatest', 'SearchController@imdbLatest');

// Playlist functionality
Route::get('movie/getToplist', 'PlaylistController@getToplist');

// User authentication
Route::post('user/register', 'APIRegisterController@register');
Route::post('user/login', 'APILoginController@login');

```

## API Requests

Send all requests to:
`www.endumx.com/api/[request]`

### User 

| Method | URL | Parameters | Authentication | Description |
|--------|-----|------------|----------------|-------------|
| POST | user/register | name, email, password | Basic | Register user and return JWT-token |
| POST | user/login | email, password | Basic | Login user and return JWT-token |
| GET | user/getInfo | ✖️ | Basic,<br>Bearer {token} | Return signed user information |

### Search

| Method | URL | Parameters | Authentication | Description |
|--------|-----|------------|----------------|-------------|
| POST | movie/search | keyword,<br> type (optional) | Basic | Returns search results by keyword |
| POST | movie/findById | movieId | Basic,<br>Bearer {token} | Returns all details from a single movie |
| GET | video/imdbLatest | ✖️ | Basic | Returns 10 last uploaded videos from IMDb channel |

### Playlist

| Method | URL | Parameters | Authentication | Description |
|--------|-----|------------|----------------|-------------|
| Post | movie/showPlaylist | ✖️ | Basic, <br>Bearer {token} | Returns signed user own playlist |
| POST | movie/addToPlaylist | movieId,<br>movieName | Basic, <br>Bearer {token} | Saves item to user own playlist |
| POST | movie/removeFromPlaylist | movieId | Basic,<br>Bearer {token} | Removes item from playlist |
| GET | movie/getToplist | ✖️ | Basic | Return 10 most popular movies |
| POST | movie/setWatched | movieId | Basic,<br>Bearer {token} | Sets 'watched' to true if false and vice versa |

## Middleware

```php
<?php

namespace App\Http\Middleware;
use Closure;
use Tymon\JWTAuth\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Middleware\BaseMiddleware;
class JWTAuthenticate extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, \Closure $next)
    {
        // Set custom header name for token
        $this->auth->setRequest($request)->parseToken("bearer","JWT-X");
        if (! $token = $this->auth->setRequest($request)->getToken()) {
            return $this->respond('tymon.jwt.absent', 'token_not_provided', 400);
        }
        try {
            $user = $this->auth->authenticate($token);
        } catch (TokenExpiredException $e) {
            return $this->respond('tymon.jwt.expired', 'token_expired', $e->getStatusCode(), [$e]);
        } catch (JWTException $e) {
            return $this->respond('tymon.jwt.invalid', 'token_invalid', $e->getStatusCode(), [$e]);
        }
        if (! $user) {
            return $this->respond('tymon.jwt.user_not_found', 'user_not_found', 404);
        }
        $this->events->fire('tymon.jwt.valid', $user);
        return $response;
    }
```

## Playlist Controller
```php
<?php

namespace App\Http\Controllers;

use App\Playlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PlaylistController extends Controller
{
    private $playlist;

    public function __construct(Playlist $playlist)
    {
        $this->playlist = $playlist;
    }

    public function getPlaylist()
    {
        try {
            $playlist = Playlist::where('user_id', $this->getUserId())
                ->latest()
                ->get();
            return $playlist;
        }
        catch (\Exception $e) {
            return 'Unable to get playlist: ' . $e->getMessage();
        }
    }

    public function addToPlaylist(Request $request)
    {
        try {
            $movieId = $request->movieId;
            $movieName = $request->movieName;
            $userId = $this->getUserId();

            $item = Playlist::where([
                'movie_id' => $movieId,
                'name' => $movieName,
                'user_id' => $userId
            ])->first();

            if ($item !== null) {
                return 'Movie '. $movieId .' is already on your playlist';
            } else {
                $this->playlist->movie_id = $movieId;
                $this->playlist->name = $movieName;
                $this->playlist->user_id = $userId;
                $this->playlist->save();
                return $this->playlist;
            }
        }
        catch (\Exception $e) {
            return 'Unable to save item to playlist: ' . $e->getMessage();
        }
    }

    public function removeFromPlaylist(Request $request) {
        $movieId = $request->movieId;
        $userId = $this->getUserId();

        try {
            $item = Playlist::where([
                'movie_id' => $movieId,
                'user_id' => $userId
            ])->first();

            if ($item == null) {
                return "Item is not in your playlist";
            } else {
                $item->delete();
                return auth()->user();
            }
        }
        catch (\Exception $e) {
            return 'Unable to delete item: ' . $e->getMessage();
        }
    }

    public function getToplist()
    {
        try {
            $topList = DB::table('playlists')
                ->select('name', DB::raw('COUNT(name) AS `amount`'))
                ->groupBy('name')
                ->latest('amount')
                ->take(10)
                ->get();
            return $topList;
        }
        catch (\Exception $e) {
            return 'Unable to get toplist: ' . $e->getMessage();
        }
    }

    public function setWatched(Request $request)
    {
        try {
            $item = Playlist::where([
                'movie_id' => $request->movieId,
                'user_id' => $this->getUserId()
            ])->first();
            $item->watched = !$item->watched;
            $item->save();
            return $item;
        }
        catch (\Exception $e) {
            return 'Unable to change watched state: ' . $e->getMessage();
        }
    }

    public function getUserId()
    {
        return auth()->id();
    }
}

```

## Search Controller

```php
<?php
namespace App\Http\Controllers;
use App\Playlist;
use Illuminate\Http\Request;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;
use PhpParser\Node\Expr\Cast\Object_;

class SearchController extends Controller
{
    private $ytClient;
    private $ytApiKey;

    private $omdbClient;
    private $omdbApiKey;

    public function __construct()
    {
        // Clients
        $this->omdbClient = new Client(['base_uri' => 'http://www.omdbapi.com/']);
        $this->ytClient = new Client(['base_uri' => 'https://www.googleapis.com/youtube/v3/search']);

        // API Keys
        $this->omdbApiKey = config('app.omdb_key');
        $this->ytApiKey = config('app.yt_key');
    }

    public function searchByKeyword(Request $request)
    {
        $keyword = $request->keyword;

        if ($request->type !== null) {
            $movieType = $request->type;
        } else {
            $movieType = '';
        }

        try {
            $response = $this->omdbClient->request('GET', '?apikey=' . $this->omdbApiKey . '&s=' . $keyword . '&type=' . $movieType)->getBody();
            $json = json_decode($response, true);

            if ($json['Response'] === 'False') return $json['Error'];

            return $json['Search'];
        }
        catch (\Exception $e) {
            return 'Unable to make search: ' . $e->getMessage();
        }
    }

    public function findById(Request $request)
    {
        $movieId = $request->movieId;
        $userId = $this->getUserId();

        try {
            $response = $this->omdbClient->request('GET', '?apikey=' . $this->omdbApiKey . '&i=' . $movieId . '&plot=full')->getBody();
            $json = json_decode($response, true);

            if ($json['Response'] === 'False') return $json['Error'];
            $json['InPlaylist'] = $this->checkIfWatched($userId, $movieId);

            return $json;
        }
        catch (\Exception $e) {
            return 'Unable to find that item: ' . $e->getMessage();
        }
    }

    public function imdbLatest()
    {
        try {
            $response = $this->ytClient->request('GET', '?part=snippet&channelId=UC_vz6SvmIkYs1_H3Wv2SKlg&maxResults=10&order=date&type=video&key=' . $this->ytApiKey)->getBody();
            $json = json_decode($response, true);

            foreach ($json['items'] as $item) {
                $videoUrls[] = 'https://www.youtube.com/watch?v=' . $item['id']['videoId'];
            }

            return $videoUrls;
        }
        catch (\Exception $e) {
            return 'Unable to search videos: ' . $e->getMessage();
        }
    }

    public function getUserId()
    {
        return auth()->id();
    }

    public function checkIfWatched($userId, $movieId)
    {
        $item = Playlist::where([
            'movie_id' => $movieId,
            'user_id' => $userId
            ])->first();

        return ($item == null ? false : true);
    }
}
```
# Angular

Angularissa on todella monta tiedostoa, mutta käyn läpi tärkeimmät:

API Service:

Eli tavallaan rakentama "API backend" Angularille. Toteutus aina riippuu projektista

```ts
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
...

// Ja näitä paljon lisää
}
    
```

Auth Service:
Ehkäpä monimutkaisin osuus koko projektista, koska piti tukea JWT Authia

```ts
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

```

Routet:
Tässä olennaisena AuthGuard ja routien parametrit route/:parametri

```ts
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MovieDetailsComponent} from './movie-details/movie-details.component';
import { SearchComponent} from './search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'search/:keyword', component: SearchComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

```

Auth Guard:
Tämäkin piti implementoida itse. Eli jos ei tokenia löydy palaa /login sivulle

```ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
```
Interceptorit jotka luotu JWT Authia varten:

```ts

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}

```

```ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Add JWT and Basic Auth Headers
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization : `Basic ZW5kdW14Oll0U21DbU9wU1I=`, // This to get past Basic Auth
                    'JWT-X': `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}
```

### Componentit (esimerkit, koska näitäkin todella monta):

```ts
import {Component, OnInit} from '@angular/core';

import { Router } from '@angular/router';

import { AuthenticationService } from './../services/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ AuthenticationService ],
})
export class AppComponent implements OnInit {
  showMenu = false;

  currentUser: User;
  logged = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        console.log(this.currentUser);
    }

  ngOnInit() {
    if (localStorage.hasOwnProperty('currentUser') == true) {
      this.logged = true;
      console.log(this.logged);
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


}


```
Tässä tulee huomata se kuinka lapsi componentille voidaan asettaa property (title) jota se voi käyttää.
```html
<video ng-init="this.play()" id="background-image" #videoPlayer autoplay muted loop>
    <source src="/src/assets/login.webm" type="video/webm"/>
    <source src="/src/assets/login.mp4" type="video/mp4">
    <source src="/src/assets/login.ogv" type="video/ogg"/>   
    
</video>
<div class="page" onload>
    
    <section id="home-header">
            <img src="/src/assets/movieapptransparent.png">
        <h1 class="home-header home-header-big">See, create, watch<br><small class="home-header-hashtag">#movieapp</small></h1>
        <!--<video id="background-image" autoplay muted loop>
            <source src="../../assets/login.mp4" type="video/mp4">
                    <source src="../../assets/login.ogv" type="video/ogg"/>   
                    <source src="../../assets/login.webm" type="video/webm"/>
        </video>-->
        <p class="home-header home-header-small"><span style="color:rgb(138, 0, 0)">Create</span> your own playlist</p>
        <!--
        <iframe src="https://www.youtube.com/embed/rQb_YTLXvco" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>-->
    </section>
    
    <section id="popular-movies name-header-popular">
            <h1 class="popular-header name-header"><fa-icon class="menu-button-icon" icon="home"></fa-icon> Welcome,<span style="color:rgb(219, 0, 0)">{{ userDetails['name']}}</span></h1>       
    </section>
    <section id="popular-movies">
        <app-playlist></app-playlist>     
    </section>
    <section id="popular-movies">
        <h1 class="popular-header">Community favourites</h1>
        <app-popular></app-popular>           
    </section>
    <section id="popular-movies">
        <h1 class="popular-header" style="font-size:1rem">Search:</h1>
        <form [formGroup]="searchForm" (ngSubmit)="onSearch()">
            <input formControlName="search" type="text" placeholder="Search for a title" class="form-control search-title"/>   
            <button class="btn btn-primary">Search</button>
        </form>
    </section>
    <section id="popular-movies">
        <h1 class="popular-header">Marvel</h1>
        <app-suggested title='Marvel'></app-suggested>           
    </section>
    <section id="popular-movies">
        <h1 class="popular-header">Live long and prosper</h1>
        <app-suggested title='Star Trek'></app-suggested>           
    </section>
    <section id="popular-movies">
        <h1 class="popular-header">I am your father</h1>
        <app-suggested title='Star Wars'></app-suggested>           
    </section>
    <section id="popular-movies">
            <h1 class="popular-header">Be A Superhero</h1>
            <app-suggested title='Avengers'></app-suggested>           
        </section>
</div>

```

Ja tämä app-suggested componentti:

```ts
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ApiService } from  '../../services/api.service';
import { AuthenticationService } from '../../services/auth.service';


@Component({
  selector: 'app-suggested',
  templateUrl: './suggested.component.html',
  styleUrls: ['./suggested.component.scss']
})
export class SuggestedComponent implements OnInit {

  @Input() title:string;

  popularMovies:  Array<any> = [];
  constructor(private  apiService:  ApiService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.getMovie(this.title);
  }

  public getMovie(title){
    this.apiService.searchMovie(title).subscribe((data:  Array<any>) => {
        this.popularMovies = data;
    });
  }


}

```
