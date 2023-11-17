import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange-page.component.html',
  styleUrls: ['./exchange-page.component.css']
})
export class ExchangePageComponent implements OnInit {
  exchangeForm!: FormGroup;
  bitcoinValue: string = '0btc';
  moneroValue: string = '0xmr';
  ethereumValue: string = '0eth';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.exchangeForm = this.fb.group({
      inputValue: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    });

    this.exchangeForm.get('inputValue')?.valueChanges.subscribe(() => {
      this.updateCardTitles();
    });
  }

  updateCardTitles() {
    const inputValueControl = this.exchangeForm.get('inputValue');
  
    if (inputValueControl !== null && inputValueControl !== undefined) {
      if (inputValueControl.valid) {
        const inputValue = inputValueControl.value;
        this.bitcoinValue = `${inputValue}btc`;
        this.moneroValue = `${inputValue}xmr`;
        this.ethereumValue = `${inputValue}eth`;
      } else {
        this.bitcoinValue = `0btc`;
        this.moneroValue = `0xmr`;
        this.ethereumValue = `0eth`;
      }
    }
  }
}
