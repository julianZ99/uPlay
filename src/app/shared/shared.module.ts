import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnowflakesComponent } from './components/snowflakes/snowflakes.component';
import { CoinListComponent } from './components/coin-list/coin-list.component';
import { FloatingLogoComponent } from './components/floating-logo/floating-logo.component';

@NgModule({
  declarations: [
    SnowflakesComponent,
    CoinListComponent,
    FloatingLogoComponent
  ],
  imports: [CommonModule],
  exports: [
    SnowflakesComponent,
    CoinListComponent,
    FloatingLogoComponent
  ]
})
export class SharedModule { }