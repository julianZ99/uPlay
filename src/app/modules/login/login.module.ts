import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/login.component';

@NgModule({
  declarations: [LoginComponent],
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
