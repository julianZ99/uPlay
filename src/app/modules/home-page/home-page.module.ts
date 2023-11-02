import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomePageComponent } from './components/home-page/home-page.component';
import { AnimationComponent } from './components/animation/animation.component';


@NgModule({
  declarations: [HomePageComponent, AnimationComponent],
  imports: [
    CommonModule,
    CoreModule,
    HomePageRoutingModule,
    SharedModule
  ]
})
export class HomePageModule { }
