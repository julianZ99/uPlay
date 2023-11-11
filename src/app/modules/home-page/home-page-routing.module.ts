import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CoinPageComponent } from './components/coin-page/coin-page.component';
import { RankingPageComponent } from './components/ranking-page/ranking-page.component';
import { GamesPageComponent } from './components/games-page/games-page.component';
import { AuthGuard } from 'src/app/core/services/auth-guard/auth-guard.service';

const homePageRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: 'coins', component: CoinPageComponent },
      { path: 'ranking', component: RankingPageComponent, canActivate: [AuthGuard] },
      { path: 'games', component: GamesPageComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'coins', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homePageRoutes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }