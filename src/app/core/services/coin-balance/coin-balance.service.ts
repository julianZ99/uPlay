import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoinBalanceService {
  private coinBalanceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  coinBalance$: Observable<number> = this.coinBalanceSubject.asObservable();

  updateCoinBalance(newBalance: number): void {
    this.coinBalanceSubject.next(newBalance);
  }

  getCoinBalance(): number {
    return this.coinBalanceSubject.value;
  }
}