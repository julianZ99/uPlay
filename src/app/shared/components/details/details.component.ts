import { Component, OnInit } from '@angular/core';
import { SharedCoinService } from 'src/app/core/services/shared-coin/shared-coin.service';
import { CoingeckoService } from 'src/app/core/services/coingecko/coingecko.service';
import { DolaritoService } from 'src/app/core/services/dolarito/dolarito.service';
import { switchMap, filter, tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  coinDetails!: any;
  private dolarOficialValueArs: number = 0;
  private dolarMEPValueArs: number = 0;
  private dolarBlueValueArs: number = 0;

  private criptoValueMEP: number =0;
  private criptoValueBlue: number =0;

  get dolarOficial(): number {
    return this.dolarOficialValueArs;
  }

  get dolarMEP(): number {
    return this.dolarMEPValueArs;
  }

  get dolarBlue(): number {
    return this.dolarBlueValueArs;
  }

  get criptoMEP(): number {
    return this.criptoValueMEP;
  }

  get criptoBlue(): number {
    return this.criptoValueBlue;
  }

  constructor(
    private sharedCoinService: SharedCoinService,
    private coingeckoService: CoingeckoService,
    private dolaritoService: DolaritoService
  ) {}

  ngOnInit() {
    console.log(this.sharedCoinService.selectedCoin$);
    this.fetchDolarValues();
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
    details.market_data.current_price.ars = details?.market_data?.current_price?.usd * this.dolarOficialValueArs;
    this.criptoValueMEP = details?.market_data?.current_price?.usd * this.dolarMEPValueArs;
    this.criptoValueBlue = details?.market_data?.current_price?.usd * this.dolarBlueValueArs;
    this.coinDetails = details;
  }

  private async fetchDolarValues(): Promise<void> {
    try {
      const dolarValues = await this.dolaritoService.getConvertedDolarValues();
      this.dolarMEPValueArs = dolarValues.dolarMEPValue;
      this.dolarOficialValueArs = dolarValues.dolarOficialValue;
      this.dolarBlueValueArs = dolarValues.dolarBlueValue;
    } catch (error) {
      console.error('Error fetching Dolar values:', error);
    }
  }

}
