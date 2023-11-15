import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStatusService } from 'src/app/core/services/auth-status/auth-status.service';
import { UplayService } from 'src/app/core/services/uplay/uplay.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        "./login.component.css",
    ],

})
export class LoginComponent {

    showAlert: boolean = false;
    alertMessage: string = 'Verifica los datos ingresados';
    loginForm: FormGroup;

    constructor(private router: Router, private uplayService: UplayService, private authStatusService: AuthStatusService) {
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
        this.router.navigate(['/registration']);
    }

    navigateToMainPage() {
        let username = this.loginForm.get('username')?.value;
        let password = this.loginForm.get('password')?.value;

        this.uplayService.login(username, password)
            .then((response) => {
                if (response && response.name) {
                    console.log("Login successful. Navigating to main page.");
                    this.authStatusService.setAuthenticatedUser(response);
                    this.router.navigate(['/']);
                } else {
                    console.log("Login unsuccessful. Showing alert.");
                    this.loginForm.reset();
                    this.showAlert = true;
                }
            })
            .catch((error: any) => {
                this.alertMessage = "Hubo un error en el sistema, intente más tarde.";
                this.showAlert = true;
                console.error('Error en la solicitud:', error);
            });
    }

    get username() {
        return this.loginForm.get('username') as FormControl;
    }

    get password() {
        return this.loginForm.get('password') as FormControl;
    }

}
