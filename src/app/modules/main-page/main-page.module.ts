import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { MainPageComponent } from './components/main-page.component';


@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class MainPageModule { }
