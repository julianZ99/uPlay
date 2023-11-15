import { Component } from '@angular/core';
import { CoinBalanceService } from 'src/app/core/services/coin-balance/coin-balance.service';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.css']
})
export class GamesPageComponent {
  coinBalance: number = 0;

  constructor(private coinBalanceService: CoinBalanceService) {}

  ngOnInit() {
    this.coinBalanceService.coinBalance$.subscribe((balance) => {
      this.coinBalance = balance;
    });
  }
}
