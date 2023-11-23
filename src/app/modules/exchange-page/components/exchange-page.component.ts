import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthGuard } from 'src/app/core/auth/auth-guard/auth-guard.service';
import { UplayService } from 'src/app/core/services/uplay/uplay.service';
import { CoingeckoService } from 'src/app/core/services/coingecko/coingecko.service';
import { DolaritoService } from 'src/app/core/services/dolarito/dolarito.service';
import { ExchangeRequest } from 'src/app/core/models/ExchangeRequest/exchange-request';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange-page.component.html',
  styleUrls: ['./exchange-page.component.css']
})
export class ExchangePageComponent implements OnInit {
  exchangeForm!: FormGroup;
  coinBalance: number = 0;
  dolarBlueValueArs: number = 0;
  bitcoinValue: number = 0;
  moneroValue: number = 0;
  ethereumValue: number = 0;

  inputValue: number = 0;

  btctoExchange: number = 0;
  ethtoExchange: number = 0;
  xmrtoExchange: number = 0;

  constructor(
    private fb: FormBuilder,
    private authGuard: AuthGuard,
    private dolaritoService: DolaritoService,
    private coingeckoService: CoingeckoService,
    private uplayService: UplayService,
  ) {}

  ngOnInit() {
    this.fetchDolarValue();
    this.fetchCryptoValues();
    this.exchangeForm = this.fb.group({
      inputValue: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.max(this.coinBalance)]
      ]
    });

    this.exchangeForm.get('inputValue')?.valueChanges.subscribe(() => {
      this.updateCardTitles();
    });

    if (this.authGuard.canActivate()) {
      this.uplayService.getCoinBalance().subscribe((balance) => {
        this.coinBalance = balance;
        console.log(this.coinBalance);

        this.setValidatorsForInput();

        this.exchangeForm.get('inputValue')?.valueChanges.subscribe(() => {
          this.updateCardTitles();
        });
      });
    }
  }

  updateCriptoValues(){
    this.btctoExchange = this.inputValue / this.dolarBlueValueArs / this.bitcoinValue;
    this.ethtoExchange = this.inputValue / this.dolarBlueValueArs / this.moneroValue;
    this.xmrtoExchange = this.inputValue / this.dolarBlueValueArs / this.ethereumValue;
  }

  resetCriptoValues(){
    this.btctoExchange = 0;
    this.ethtoExchange = 0;
    this.xmrtoExchange = 0;
  }

  updateCardTitles() {
    const inputValueControl = this.exchangeForm.get('inputValue');

    if (inputValueControl !== null && inputValueControl !== undefined) {
      if (inputValueControl.valid) {
        this.inputValue = inputValueControl.value;
        this.updateCriptoValues();
      } else {
        this.resetCriptoValues();
      }
    }
  }

  private async fetchDolarValue(): Promise<void> {
    try {
      const dolarValues = await this.dolaritoService.getConvertedDolarValues();
      this.dolarBlueValueArs = dolarValues.dolarBlueValue;
    } catch (error) {
      console.error('Error fetching Dolar values:', error);
    }
  }

  private async fetchCryptoValues(): Promise<void>{
    try {
      const cryptoIds = ['bitcoin', 'monero', 'ethereum'];
      this.coingeckoService.fetchExchangeValues(cryptoIds).subscribe((values) => {
        this.bitcoinValue = values[0]?.current_price || 0;
        this.moneroValue = values[1]?.current_price || 0;
        this.ethereumValue = values[2]?.current_price || 0;
      });
    } catch (error) {
      console.error('Error fetching Dolar values:', error);
    }
  }

  openModal() {
    const modal = document.querySelector('.modal');
    modal?.classList.toggle('show');
  }

  exchange2btc(){
    this.performCoinExchange("bitcoin", this.bitcoinValue, this.btctoExchange);
  }

  exchange2eth(){
    this.performCoinExchange("ethereum", this.ethereumValue, this.ethtoExchange);
  }

  exchange2xmr(){
    this.performCoinExchange("monero", this.moneroValue, this.xmrtoExchange);
  }

  performCoinExchange(crypto: string, cryptoValue: number, convertedAmount: number) {
    const userData = localStorage.getItem('userData');
    if(userData){
    const user = JSON.parse(userData);
    const exchangeRequest: ExchangeRequest = {
      userId: user.id,
      amount: this.inputValue,
      cryptocurrency: crypto,
      currentCryptoValue: cryptoValue,
      currentDollarBlueValue: this.dolarBlueValueArs,
      cryptoAmount: convertedAmount
    };
    console.log(exchangeRequest);
    this.uplayService.exchangeCoins(exchangeRequest).subscribe(
      (response) => {
        console.log('Coin exchange successful:', response);
        const newBalance = this.coinBalance - this.inputValue;
    
        if (!isNaN(newBalance) && newBalance >= 0) {
          this.uplayService.updateCoinBalance(newBalance).subscribe(
            () => {
              console.log('UTN coin balance updated successfully');
              this.coinBalance = newBalance;
              this.setValidatorsForInput();
              this.exchangeForm.reset();
            },
            (error) => {
              console.error('Failed to update UTN coin balance:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Coin exchange failed:', error);
      }
    );
  }
}

private setValidatorsForInput() {
  this.exchangeForm
    .get('inputValue')
    ?.setValidators([Validators.required, Validators.pattern(/^[0-9]+$/), Validators.max(this.coinBalance)]);
  this.exchangeForm.get('inputValue')?.updateValueAndValidity();
}

}

