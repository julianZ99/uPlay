import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth-service/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        "./login.component.css",
    ],

})
export class LoginComponent {

    showAlert: boolean = false;
    alertMessage: string = 'Verify the data entered';
    loginForm: FormGroup;

    constructor(private router: Router, private authService: AuthService) {
        this.loginForm = new FormGroup({
            'username': new FormControl('', [Validators.required]),
            'password': new FormControl('', [Validators.required]),
        });
    }

    ngOnInit(): void {
    }

    navigateToHome() {
        this.router.navigate(['/']);
    }

    navigateToRegistration() {
        this.router.navigate(['/login/registration']);
    }

    navigateToForgotPassword(){
        this.router.navigate(['/login/forgotPassword']);
    }

    navigateToMainPage() {
        let username = this.loginForm.get('username')?.value;
        let password = this.loginForm.get('password')?.value;
      
        this.authService.login(username, password)
          .subscribe(
            (response) => {
              console.log("Login successful. Navigating to main page.");
              this.router.navigate(['']);
            },
            (error) => {
              console.error('Login error:', error);
              this.loginForm.reset();
              this.showAlert = true;
              setTimeout(() => {
                this.showAlert = false;
              }, 4000);
            }
          );
      }

    get username() {
        return this.loginForm.get('username') as FormControl;
    }

    get password() {
        return this.loginForm.get('password') as FormControl;
    }

}
