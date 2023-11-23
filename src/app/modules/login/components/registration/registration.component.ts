import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { last } from 'rxjs';
import { Question } from 'src/app/core/models/question/question';
import { User } from 'src/app/core/models/user/user';
import { UserResgistration } from 'src/app/core/models/userResgistration/user-resgistration';
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

  questions: Question[] = [];

  constructor(
    private router: Router,
    private uplayService: UplayService
  ) {
    this.registrationForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern(/^[\w',.\-]{4,25}$/)]),
      'lastname': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern(/^[\w',.\-]{4,25}$/)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phonenumber': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]{10}$/)]),
      'username': new FormControl('', [Validators.required, Validators.minLength(6), Validators.minLength(4), Validators.maxLength(25), Validators.pattern(/^[\w',.\-]{4,25}$/)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'confirmationPassword': new FormControl('', [Validators.required, Validators.minLength(4),
      this.passwordMatchValidator.bind(this)]),
      'question': new FormControl('', [Validators.required]),
      'answer': new FormControl('', [Validators.required]),
    });

    this.passwordControl = this.registrationForm.get('password') || new FormControl('');
  }

  ngOnInit(): void {
    this.getQuestions();
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

  userResgitration() {
    const name = this.registrationForm.get('name')?.value;
    const lastName = this.registrationForm.get('lastname')?.value;
    const email = this.registrationForm.get('email')?.value;
    const password = this.registrationForm.get('password')?.value;
    const userName = this.registrationForm.get('username')?.value;
    const phoneNumber = this.registrationForm.get('phonenumber')?.value;
    const questionId = this.registrationForm.get('question')?.value;
    const answer = this.registrationForm.get('answer')?.value;

    const user = new UserResgistration(userName, email, password, name, lastName, phoneNumber, questionId, answer);
    this.uplayService.registration(user)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
        this.showAlert = true;
        if (error.status === 409) {
          this.alertMessage = 'The username and/or email already exists. Try a different one please';
        } else {
          this.alertMessage = 'There was a system failure, please try again later.';
        }
        setTimeout(() => {
          this.showAlert = false;
        }, 4000);
      });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  getQuestions() {
    this.uplayService.getQuestion()
      .then((data) => {
        this.questions = data;
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

  get phoneNumber() {
    return this.registrationForm.get('phonenumber') as FormControl;
  }

  get userName() {
    return this.registrationForm.get('username') as FormControl;
  }

  get password() {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmationPassword() {
    return this.registrationForm.get('confirmationPassword') as FormControl;
  }

  get question() {
    return this.registrationForm.get('question') as FormControl;
  }

  get answer() {
    return this.registrationForm.get('answer') as FormControl;
  }

}
