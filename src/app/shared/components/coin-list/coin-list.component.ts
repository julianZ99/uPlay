import { Component, OnInit } from '@angular/core';
import { CoingeckoService } from 'src/app/core/services/coingecko/coingecko.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {
  coinList: any[] = [];

  constructor(private coingeckoService: CoingeckoService) { }

  ngOnInit() {
    this.getCryptocurrencyList();
  }

  getCryptocurrencyList() {
    const observer: Observer<any[]> = {
      next: (data: any[]) => {
        this.coinList = data;
      },
      error: (error) => {
        console.error('Error fetching cryptocurrency data:', error);
      },
      complete: () => {
        console.log('Criptocurrency prices list obtained successfully');
      },
    };

    this.coingeckoService.getCryptocurrencyList().subscribe(observer);
  }
}