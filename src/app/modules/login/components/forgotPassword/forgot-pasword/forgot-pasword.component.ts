import { Component, Query } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Question } from 'src/app/core/models/question/question';
import { UserPassword } from 'src/app/core/models/userPassword/user-password';
import { UplayService } from 'src/app/core/services/uplay/uplay.service';

@Component({
  selector: 'app-forgot-pasword',
  templateUrl: './forgot-pasword.component.html',
  styleUrls: ['./forgot-pasword.component.css']
})
export class ForgotPaswordComponent {

  public question: Question = new Question(0, '');
  public existsQuestion: Boolean = false;
  private userEmail: string = '';

  alertMessage: string = '';
  showAlert: boolean = false;

  forgotPasswordForm: FormGroup;
  forgotPasswordAditionalForm: FormGroup;
  newPasswordControl: AbstractControl;

  constructor(private router: Router, private uplayService: UplayService,) {
    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
    });

    this.forgotPasswordAditionalForm = new FormGroup({
      'answer': new FormControl('', [Validators.required]),
      'newPassword': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'confirmPassword': new FormControl('', [Validators.required, Validators.minLength(4),
      this.passwordMatchValidator.bind(this)])
    });

    this.newPasswordControl = this.forgotPasswordAditionalForm.get('newPassword') || new FormControl('');
  }

  ngOnInit(): void {

  }

  passwordMatchValidator(control: AbstractControl) {
    const password = this.newPasswordControl?.value;
    const confirmPassword = control.value;

    if (password === confirmPassword) {
      return null;
    } else {
      return { passwordsNotMatch: true };
    }
  }

  getUserQuestion() {
    const emailUser = this.forgotPasswordForm.get('email')?.value;
    this.uplayService.getUserQuestion(emailUser)
      .then((response) => {
        if (response) {
          this.question = response;
          this.userEmail = emailUser;
          this.existsQuestion = true
        }
      })
      .catch((error: any) => {
        console.error('Error en la solicitud:', error);
        this.showAlert = true;
        this.alertMessage = 'There was a system failure, please try again later.';

        setTimeout(() => {
          this.showAlert = false;
        }, 4000);
      })
  }

  modifyPassword() {
    const questionId = this.question.id;
    const email = this.userEmail;
    const answer = this.forgotPasswordAditionalForm.get('answer')?.value;
    const newPassword = this.forgotPasswordAditionalForm.get('newPassword')?.value;

    const modifyUser = new UserPassword(email, questionId, answer, newPassword);

    this.uplayService.modifyPassword(modifyUser)
      .then((response) => {
        console.log(response);
        this.router.navigate(['/']);
      })
      .catch((error: any) => {
        console.error('Error en la solicitud:', error);
        this.showAlert = true;
        if(error === 404){
          this.alertMessage = 'Check the answer entered.';
        }else{
          this.alertMessage = 'There was a system failure, please try again later.';
        }
  
        setTimeout(() => {
          this.showAlert = false;
        }, 4000);
      })
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  get email() {
    return this.forgotPasswordForm.get('email') as FormControl;
  }

  get answer() {
    return this.forgotPasswordAditionalForm.get('answer') as FormControl;
  }

  get password() {
    return this.forgotPasswordAditionalForm.get('newPassword') as FormControl;
  }

  get confirmPassword() {
    return this.forgotPasswordAditionalForm.get('confirmPassword') as FormControl;
  }

}
