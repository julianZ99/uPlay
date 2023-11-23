import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CoinPageComponent } from '../coin-page/coin-page.component';
import { ExchangePageComponent } from '../exchange-page/components/exchange-page.component';
import { AuthGuard } from 'src/app/core/auth/auth-guard/auth-guard.service';

const homePageRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: 'coins', component: CoinPageComponent },
      { path: 'exchange', component: ExchangePageComponent, canActivate: [AuthGuard] },
      { path: 'games', loadChildren: () => import('../games-page/games-page.module').then((m) => m.GamesPageModule), canActivate: [AuthGuard] },
      { path: '', redirectTo: 'coins', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(homePageRoutes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }