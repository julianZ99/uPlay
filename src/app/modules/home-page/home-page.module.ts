import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { SharedCoinService } from 'src/app/core/services/shared-coin/shared-coin.service';

import { HomePageComponent } from './components/home-page/home-page.component';
import { AnimationComponent } from './components/animation/animation.component';
import { CoinPageComponent } from '../coin-page/coin-page.component';
import { GamesPageComponent } from '../games-page/components/games-page.component';
import { RankingPageComponent } from './components/ranking-page/ranking-page.component';



@NgModule({
  declarations: [HomePageComponent, AnimationComponent, CoinPageComponent, GamesPageComponent, RankingPageComponent],
  imports: [
    CommonModule,
    CoreModule,
    HomePageRoutingModule,
    SharedModule
  ],
  providers: [SharedCoinService],
})
export class HomePageModule { }
