import { Component, OnInit } from '@angular/core';
import { CoingeckoService } from 'src/app/services/coingecko.service';
import { Coin } from 'src/app/models/coin';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {
  coinList: Array<Coin> = [];

  constructor(private coingeckoService: CoingeckoService) { }

  ngOnInit() {
    this.coingeckoService.getAll()
      .then(response => {
        this.coinList = response;
        console.log(this.coinList);
      })
      .catch(error => {
        console.log(error);
      }) 
  }
}