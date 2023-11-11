import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomePageComponent } from './components/home-page/home-page.component';
import { AnimationComponent } from './components/animation/animation.component';
import { CoinPageComponent } from './components/coin-page/coin-page.component';
import { GamesPageComponent } from './components/games-page/games-page.component';
import { RankingPageComponent } from './components/ranking-page/ranking-page.component';


@NgModule({
  declarations: [HomePageComponent, AnimationComponent, CoinPageComponent, GamesPageComponent, RankingPageComponent],
  imports: [
    CommonModule,
    CoreModule,
    HomePageRoutingModule,
    SharedModule
  ]
})
export class HomePageModule { }
