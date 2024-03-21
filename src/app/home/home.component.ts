import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  isResultLoaded= false
  StudentArray :any[]=[];
  studentData:any;

  constructor(private http: HttpClient, private router:Router, private toast:NgToastService){}

  ngOnInit() {
   this.getAllStudent()
  }

  getAllStudent() {
    const token = sessionStorage.getItem('token'); // Retrieve token from sessionStorage
    console.log("tokenauth", token)

    if (!token) {
        // Handle case where token is not available
        console.log('No token found. User is not authenticated.');
        return;
    }

    const headers = new HttpHeaders({
        'Authorization':  token
    });
    console.log("headers", headers)
    this.http
        .get('http://localhost:3000/protected/studentslist', { headers })
        .subscribe((res: any) => {
            this.isResultLoaded = true;
            console.log('list =>', res);
            this.StudentArray = res.data;
            console.log("student array", this.StudentArray);
        }, (error) => {
            // Handle HTTP request errors here
            console.error('Error fetching student list:', error);
            // You can set a flag or handle error UI here if needed
        });
}

setUpdate(){
  console.log("update called");
}

setDelete(){
  console.log("delete called");
}
logout(){
  sessionStorage.clear();
  this.router.navigate(['/signin']);
  this.toast.success({detail:"Success Message",summary:"Logout Successfully"})
}
}
