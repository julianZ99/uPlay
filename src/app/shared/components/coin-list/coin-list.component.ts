import { Component, OnInit } from '@angular/core';
import { CoingeckoService } from 'src/app/core/services/coingecko/coingecko.service';
import { Observer } from 'rxjs';
import { AuthStatusService } from 'src/app/core/services/auth-status/auth-status.service';
import { SharedCoinService } from 'src/app/core/services/shared-coin/shared-coin.service';

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
    private authStatusService: AuthStatusService,
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
        console.log(data);
        this.coinList = data;
      })
      .catch((error: any) => {
        console.error('Error fetching cryptocurrency data:', error);
      });
  }

  checkLoginStatus() {
    this.authStatusService.getAuthenticatedUser().subscribe(
      (user: any | null) => {
        this.isLoggedIn = !!user;
        console.log('coinlist. User is logged:', this.isLoggedIn);
      },
      (error: any) => {
        console.error('coinlist. Error checking login status:', error);
      }
    );
  }
}
