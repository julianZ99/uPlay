import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth-service/auth.service';
import { UserFullData } from 'src/app/core/models/user/user';
import { UplayService } from 'src/app/core/services/uplay/uplay.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {

  dataForm: FormGroup;
  alertMessage: string = '';
  showAlert: boolean = false;

  constructor(private router: Router, private uplayService: UplayService) {
    this.dataForm = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern(/^[\w',.\-]{4,25}$/)]),
      'lastname': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern(/^[\w',.\-]{4,25}$/)]),
      'username': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern(/^[\w',.\-]{4,25}$/)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phonenumber': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern(/^[0-9]{10}$/)])
    });
  }

  ngOnInit(): void {
    this.getUserData();
  }

  editProfile() {
    const name = this.dataForm.get('name')?.value;
    const lastName = this.dataForm.get('lastname')?.value;
    const email = this.dataForm.get('email')?.value;
    const userName = this.dataForm.get('username')?.value;
    const phoneNumber = this.dataForm.get('phonenumber')?.value;


    const user = new UserFullData(name, lastName, userName, email, phoneNumber);
    this.uplayService.updateUser(user)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
        this.getUserData();
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

  getUserData() {
    this.uplayService.getUserData()
      .then((data) => {
        console.log(data);
        this.dataForm.controls['name'].setValue(data.name);
        this.dataForm.controls['lastname'].setValue(data.lastname);
        this.dataForm.controls['username'].setValue(data.username);
        this.dataForm.controls['email'].setValue(data.email);
        this.dataForm.controls['phonenumber'].setValue(data.phonenumber);
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
        this.showAlert = true;
        this.alertMessage = 'There was a system failure, please try again later.';

        setTimeout(() => {
          this.showAlert = false;
        }, 4000);
      })
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  get name() {
    return this.dataForm.get('name') as FormControl;
  }
  get lastname() {
    return this.dataForm.get('lastname') as FormControl;
  }

  get email() {
    return this.dataForm.get('email') as FormControl;
  }

  get phoneNumber() {
    return this.dataForm.get('phonenumber') as FormControl;
  }

  get userName() {
    return this.dataForm.get('username') as FormControl;
  }

}
