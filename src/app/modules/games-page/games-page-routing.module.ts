import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesPageComponent } from './components/games-page.component';
import { SlotComponent } from './components/games/slot/slot.component';
import { RouletteComponent } from './components/games/roulette/roulette.component';
import { CoinFlipComponent } from './components/games/coin-flip/coin-flip.component';

const routes: Routes = [
  {
    path: '', component: GamesPageComponent,
    children: [
      { path: 'slots', component: SlotComponent },
      { path: 'roulette', component: RouletteComponent },
      { path: 'flip', component: CoinFlipComponent },
      { path: '', redirectTo: 'slots', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesPageRoutingModule { }