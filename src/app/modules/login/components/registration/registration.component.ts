import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UplayService } from 'src/app/core/services/uplay/uplay.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  registrationForm: FormGroup;

  constructor(
    private router: Router,
    private uplayService: UplayService
  ) {
    this.registrationForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'lastname': new FormControl('', [Validators.required]),
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
      'confirmationPassword': new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  
  }

  navigateToHome() {
    this.router.navigate(['/']);
}

}
