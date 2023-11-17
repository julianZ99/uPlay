import { Component } from '@angular/core';

@Component({
  selector: 'app-exchange-page',
  templateUrl: './exchange-page.component.html',
  styleUrls: ['./exchange-page.component.css']
})
export class ExchangePageComponent {
  inputValue: string = '';
  bitcoinValue: string = '0btc';
  moneroValue: string = '0xmr';
  ethereumValue: string = '0eth';

  updateCardTitles() {
    // Validate the input (you may want to add more validation)
    if (!this.inputValue || isNaN(Number(this.inputValue))) {
      alert('Please enter a valid numeric value for UTNcoin.');
      return;
    }

    // Update the card titles with the exchanged values
    this.bitcoinValue = `${this.inputValue.toLowerCase()}btc`;
    this.moneroValue = `${this.inputValue.toLowerCase()}xmr`;
    this.ethereumValue = `${this.inputValue.toLowerCase()}eth`;
  }
}
