import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserDetails } from '../models/user-details.model';

@Injectable({
    'providedIn' : 'root'
})
export class AuthenticationService {
    private userSubject : BehaviorSubject<User | null>;
    private user : Observable<User | null>;
    private BASIC_URL = 'http://localhost:8081/';

    constructor (private http: HttpClient, private router: Router) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    login(userId : String, password: String) {
        const headers = {'Authorization' : 'Basic ' + window.btoa(userId+":"+password)};        
        this.http.post(this.BASIC_URL + 'login', null, {headers, withCredentials : true}).subscribe({
            next: data => {
                if (data instanceof UserDetails) {
                    /*let userDetails = new UserDetails();
                    userDetails.userId = data1.userId;
                    userDetails.firstName = data.firstName;
                    userDetails.lastName = data.lastName;
                    userDetails.companyName = data.companyName;
                    userDetails.country = data.country;
                    userDetails.streetAddress = data.streetAddress;
                    userDetails.city = data.city;
                    userDetails.zipCode = data.zipCode;
                    userDetails.emailAddress = data.emailAddress;
                    userDetails.phone = data.phone;*/
                }
                let userDetails = <UserDetails>data;                    
                sessionStorage.setItem("user-details", JSON.stringify(userDetails));
                console.log(data);
            },
            error: err => {
                console.log(err);
            }
        });
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
        
    }

}