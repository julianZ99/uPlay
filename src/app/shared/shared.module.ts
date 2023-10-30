import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SnowflakesComponent } from './components/snowflakes/snowflakes.component';
import { CoinListComponent } from './components/coin-list/coin-list.component';
import { FloatingLogoComponent } from './components/floating-logo/floating-logo.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SnowflakesComponent,
    CoinListComponent,
    FloatingLogoComponent
  ],
  imports: [CommonModule],
  exports: [
    NavbarComponent,
    FooterComponent,
    SnowflakesComponent,
    CoinListComponent,
    FloatingLogoComponent
  ]
})
export class SharedModule { }