import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgToastService} from 'ng-angular-popup';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toast:NgToastService
  ) {}
  // loginForm!: FormGroup;
  errorMessage: any;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {
  
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = {
      username: this.loginForm.get('username')!.value,
      password: this.loginForm.get('password')!.value,
    };

    this.http
      .post<any>('http://localhost:3000/auth/login', loginData)
      .subscribe(
        (response) => {
          if (response.token) {
            sessionStorage.setItem('token', response.token);
            this.toast.success({detail:"Success Message",summary:"Login Successfully"})
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = 'Enter Valid credentials...';
            
          }
        },
        (error) => {
          console.error('Error logging in:', error);
          this.toast.error({detail:" Error Message",summary:"enter valid credentials"})
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      );
  }

  onSignup() {
    this.router.navigate(['/signup']); // Redirect to signup component
  }
}
