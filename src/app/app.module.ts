import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilm, faHome, faCog } from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor'; 

import { AuthenticationService } from '../services/auth.service';
import { PopularComponent } from './popular/popular.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { RegisterComponent } from './register/register.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SuggestedComponent } from './suggested/suggested.component';
import { SearchComponent } from './search/search.component';

library.add(faFilm, faHome, faCog );

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PopularComponent,
    MovieDetailsComponent,
    RegisterComponent,
    PlaylistComponent,
    SuggestedComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragScrollModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
