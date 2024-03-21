import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent  implements OnInit {

signupForm!: FormGroup;

constructor(private fb: FormBuilder, private http: HttpClient, private router:Router, private toast:NgToastService){}


  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit() {
    if (this.signupForm.valid) {
      console.log("signupform value", this.signupForm.value);
      
      const userData = {
        username: this.signupForm.get('username')!.value,
        password: this.signupForm.get('password')!.value
      };
    
      this.http.post<any>('http://localhost:3000/auth/signup', userData)
        .subscribe(
          response => {
            console.log("User Added", response);
          },
          error => {
            console.error('Error signing up:', error);
          }
        );
        this.toast.success({detail:"Success Message",summary:"Signup Successfully"})
        this.router.navigate(['/signin']);
    }
  }
  
  }
  

