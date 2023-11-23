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
import { RankingPageComponent } from '../ranking-page/ranking-page.component';
import { ExchangePageComponent } from '../exchange-page/components/exchange-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExchangePageModule } from '../exchange-page/exchange-page.module';



@NgModule({
  declarations: [HomePageComponent, AnimationComponent, CoinPageComponent, GamesPageComponent, RankingPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    HomePageRoutingModule,
    ExchangePageModule,
    SharedModule
  ],
  providers: [SharedCoinService],
})
export class HomePageModule { }
