import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { last } from 'rxjs';
import { User } from 'src/app/core/models/user/user';
import { UplayService } from 'src/app/core/services/uplay/uplay.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  registrationForm: FormGroup;
  passwordControl: AbstractControl;
  alertMessage: string = '';
  showAlert: boolean = false;

  constructor(
    private router: Router,
    private uplayService: UplayService
  ) {
    this.registrationForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'lastname': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'confirmationPassword': new FormControl('', [Validators.required, Validators.minLength(4),
      this.passwordMatchValidator.bind(this)]),
    });

    this.passwordControl = this.registrationForm.get('password') || new FormControl('');
  }

  ngOnInit(): void {

  }

  passwordMatchValidator(control: AbstractControl) {
    const password = this.passwordControl?.value;
    const confirmPassword = control.value;

    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordsNotMatch: true };
    }
  }

  navigateToHome() {
    const name = this.registrationForm.get('name')?.value;
    const lastName = this.registrationForm.get('lastname')?.value;
    const email = this.registrationForm.get('email')?.value;
    const password = this.registrationForm.get('password')?.value;

    const user = new User(name, lastName, email, password);
    this.uplayService.registration(user)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
        this.alertMessage = 'Hubo un error en el sistema, intente más tarde.';
        this.showAlert = true;
      });
  }

  get name() {
    return this.registrationForm.get('name') as FormControl;
  }
  get lastname() {
    return this.registrationForm.get('lastname') as FormControl;
  }

  get email() {
    return this.registrationForm.get('email') as FormControl;
  }

  get password() {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmationPassword() {
    return this.registrationForm.get('confirmationPassword') as FormControl;
  }

}
