import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainPageRoutingModule } from './main-page-routing.module';

import { MainPageComponent } from './components/main-page.component';


@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    CoreModule,
    MainPageRoutingModule, 
    SharedModule,
  ]
})
export class MainPageModule { }
