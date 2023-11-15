import { Component, OnInit } from '@angular/core';
import { SharedCoinService } from 'src/app/core/services/shared-coin/shared-coin.service';
import { CoingeckoService } from 'src/app/core/services/coingecko/coingecko.service';
import { switchMap, filter, tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  coinDetails!: any;
  private dolarValueArs: number = 0;

  constructor(
    private sharedCoinService: SharedCoinService,
    private coingeckoService: CoingeckoService
  ) {}

  ngOnInit() {
    console.log(this.sharedCoinService.selectedCoin$);
    this.getDolarValue();
    
    this.sharedCoinService.selectedCoin$.pipe(
      filter(selectedCoin => !!selectedCoin),
      switchMap(selectedCoin => this.coingeckoService.getCryptocurrencyDetails(selectedCoin.id)),
      tap(details => this.processDetails(details)),
      catchError(error => {
        console.error('Error fetching coin details:', error);
        return throwError(error);
      })
    ).subscribe();
  }

  private processDetails(details: any): void {
    details.market_data.current_price.ars = details?.market_data?.current_price?.usd * this.dolarValueArs;
    this.coinDetails = details;
  }

  getDolarValue(): void {
    this.coingeckoService.getDolarMEPValue()
    .then((data) => {
      console.log(data);
      this.dolarValueArs = data.venta;
    })
    .catch((error: any) => {
      console.error('Error in getDolarMEPValue: ', error);
    });
  }
}
