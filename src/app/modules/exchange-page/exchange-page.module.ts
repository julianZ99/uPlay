import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutModalComponent } from './components/about-modal/about-modal.component';
import { ExchangePageComponent } from './components/exchange-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionPageComponent } from './components/transaction-page/transaction-page.component';
import { WalletModalComponent } from './components/wallet-modal/wallet-modal.component';


@NgModule({
  declarations: [ExchangePageComponent, AboutModalComponent, TransactionPageComponent, WalletModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExchangePageModule { }
