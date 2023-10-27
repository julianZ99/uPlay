import { Component, OnInit } from '@angular/core';
import { CoingeckoService } from 'src/app/services/coingecko.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {
  coinList: any[] = [];

  constructor(private coingeckoService: CoingeckoService) {}

  ngOnInit() {
    this.getCryptocurrencyList();
  }

  getCryptocurrencyList() {
    this.coingeckoService.getCryptocurrencyList()
      .subscribe(
        (data: any[]) => {
          this.coinList = data;
        },
        (error) => {
          console.error('Error fetching cryptocurrency data:', error);
        }
      );
  }
  
}