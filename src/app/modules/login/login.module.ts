import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPaswordComponent } from './components/forgotPassword/forgot-pasword/forgot-pasword.component';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent, ForgotPaswordComponent],
  imports: [
    CommonModule,
    CoreModule,
    LoginRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class LoginModule {

}
