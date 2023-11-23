import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { UserPageRoutingModule } from './user-page-routing.module';

import { UserPageComponent } from './components/user-page.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserPageComponent],
  imports: [
    CommonModule,
    CoreModule,
    UserPageRoutingModule, 
    SharedModule,
    ReactiveFormsModule
  ]
})
export class UserPageModule { }
