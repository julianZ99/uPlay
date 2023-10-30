import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    "./login.component.css",
  ],

})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']); 
  }

  navigateToMainPage() {
    this.router.navigate(['/main-page']); 
  }
}
