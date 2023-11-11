import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

    constructor(private router: Router, private uplayService: UplayService) {
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
        this.uplayService.login(username, password).subscribe(
            (response) => {
                if (response && response.name) {
                    console.log("entre 200");
                    this.router.navigate(['/main-page']);
                }else{
                    console.log("entre 204");
                    this.showAlert = true;
                }
            },
            (error: HttpErrorResponse) => {
                this.alertMessage = "Hubo un error en el sistema, intente mas tarde.";
                this.showAlert = true;
                console.error('Error en la solicitud:', error);
            }
        );
    }

}
