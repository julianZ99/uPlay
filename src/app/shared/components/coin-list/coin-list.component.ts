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

  isLoggedIn: boolean = false;

  constructor(private coingeckoService: CoingeckoService) {}

  ngOnInit() {
    this.getCryptocurrencyList();
    this.isLoggedIn=true;   //FALTA LOGICA DE VERIFICACION USUARIO LOGUEADO
    console.log('usuario logueado', this.isLoggedIn);
  }

  onRowClick(coin: any) {
    console.log('Row clicked:', coin);
  };

  getCryptocurrencyList() {
    const observer: Observer<any[]> = {
      next: (data: any[]) => {
        this.coinList = data;
      },
      error: (error) => {
        console.error('Error fetching cryptocurrency data:', error);
      },
      complete: () => {

      },
    };



    this.coingeckoService.getCryptocurrencyList().subscribe(observer);
    
  }
}