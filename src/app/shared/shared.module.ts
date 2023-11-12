import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnowflakesComponent } from './components/snowflakes/snowflakes.component';
import { CoinListComponent } from './components/coin-list/coin-list.component';
import { DetailsComponent } from './components/details/details.component';
import { FloatingLogoComponent } from './components/floating-logo/floating-logo.component';

@NgModule({
  declarations: [
    SnowflakesComponent,
    CoinListComponent,
    DetailsComponent,
    FloatingLogoComponent
  ],
  imports: [CommonModule],
  exports: [
    SnowflakesComponent,
    CoinListComponent,
    DetailsComponent,
    FloatingLogoComponent
  ]
})
export class SharedModule { }