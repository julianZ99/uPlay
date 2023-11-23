import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutModalComponent } from './components/about-modal/about-modal.component';
import { ExchangePageComponent } from './components/exchange-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionPageComponent } from './components/transaction-page/transaction-page.component';


@NgModule({
  declarations: [ExchangePageComponent, AboutModalComponent, TransactionPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExchangePageModule { }
