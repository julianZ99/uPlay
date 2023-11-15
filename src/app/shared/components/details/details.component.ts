import { Component, OnInit } from '@angular/core';
import { SharedCoinService } from 'src/app/core/services/shared-coin/shared-coin.service';
import { CoingeckoService } from 'src/app/core/services/coingecko/coingecko.service';
import { switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  coinDetails!: any;

  constructor(
    private sharedCoinService: SharedCoinService,
    private coingeckoService: CoingeckoService
  ) {}

  ngOnInit() {
    console.log(this.sharedCoinService.selectedCoin$);
    this.sharedCoinService.selectedCoin$.pipe(
      filter(selectedCoin => !!selectedCoin),
      
      switchMap((selectedCoin) => this.coingeckoService.getCryptocurrencyDetails(selectedCoin.id))
    ).subscribe(
      (details: any) => {
        this.coinDetails = details;
      },
      (error) => {
        console.error('Error fetching coin details:', error);
      }
    );
  }
}
