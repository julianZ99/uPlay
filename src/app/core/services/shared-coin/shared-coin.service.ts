import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedCoinService {
  private selectedCoinSource = new BehaviorSubject<any | null>(null);
  selectedCoin$ = this.selectedCoinSource.asObservable();

  constructor() {
    this.setSelectedCoin({ id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' });
    console.log('selected bitcoin on service start')
  }

  setSelectedCoin(coin: any | null) {
    this.selectedCoinSource.next(coin);
  }
}
