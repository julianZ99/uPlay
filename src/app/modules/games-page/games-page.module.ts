import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GamesPageRoutingModule } from './games-page-routing.module'; 


import { SlotComponent } from './components/games/slot/slot.component';
import { RouletteComponent } from './components/games/roulette/roulette.component';
import { CoinFlipComponent } from './components/games/coin-flip/coin-flip.component';


@NgModule({
  declarations: [ SlotComponent, RouletteComponent, CoinFlipComponent],
  imports: [CommonModule, RouterModule, GamesPageRoutingModule],
})
export class GamesPageModule {}