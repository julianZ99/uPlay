import { Component, OnInit } from '@angular/core';
import { CoingeckoService } from 'src/app/core/services/coingecko/coingecko.service';
import { SharedCoinService } from 'src/app/core/services/shared-coin/shared-coin.service';
import { AuthGuard } from 'src/app/core/auth/auth-guard/auth-guard.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {
  coinList: any[] = [];
  isLoggedIn: boolean = false;


  constructor(
    private coingeckoService: CoingeckoService,
    private authGuard: AuthGuard,
    private sharedCoinService: SharedCoinService
  ) { }

  ngOnInit() {
    this.checkLoginStatus();
    this.getCryptocurrencyList();
  }

  onRowClick(coin: any) {
    console.log('Row clicked:', coin);
    this.sharedCoinService.setSelectedCoin(coin);
  }

  getCryptocurrencyList() {
    this.coingeckoService.getCryptocurrencyList()
      .then((data) => {
        this.coinList = data;
      })
      .catch((error: any) => {
        console.error('Error fetching cryptocurrency data:', error);
      });
  }

  checkLoginStatus() {
  this.isLoggedIn=this.authGuard.canActivate();
  }
}
