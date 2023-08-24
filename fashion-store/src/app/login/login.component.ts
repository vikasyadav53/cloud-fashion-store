import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms' ;
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userId : new FormControl(''),
    password : new FormControl('')
  });

  constructor(private authService : AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  collectAndValidateUser() {
    this.authService.login(this.loginForm.value.userId as String, this.loginForm.value.password as String);  
    this.router.navigate(['/']);
  }

}
