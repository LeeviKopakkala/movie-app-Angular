import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../services/auth.service';

@Component({templateUrl: 'register.component.html',  styleUrls: ['register.component.scss'],} )
export class RegisterComponent implements OnInit {


  @ViewChild('videoPlayer') videoplayer: HTMLVideoElement;
  item = <HTMLVideoElement>document.getElementById("background-image");
  

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            name: ['', Validators.required]
        });
        
    }

    // Get form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.register(this.f.name.value, this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                  console.log(data);
                  window.location.href = '/';
                },
                error => {
                  console.log(error);
                  this.loading = false;
                });
    }
}