import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutModalComponent } from './components/about-modal/about-modal.component';
import { ExchangePageComponent } from './components/exchange-page.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ExchangePageComponent, AboutModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExchangePageModule { }
