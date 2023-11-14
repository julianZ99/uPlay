import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthStatusService } from 'src/app/core/services/auth-status/auth-status.service';
import { UplayService } from 'src/app/core/services/uplay/uplay.service'; 

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.css']
})
export class RouletteComponent implements OnInit, OnDestroy {
  authenticatedUser: any | null;
  coinBalance!: number;
  playCost: number = 100; 
  rewardCoins: number = 50; 
  isWinner: boolean | null = null;

  private authSubscription: Subscription = new Subscription();

  constructor(
    private authStatusService: AuthStatusService,
    private uplayService: UplayService 
  ) {}

  ngOnInit() {
    this.authSubscription = this.authStatusService.getAuthenticatedUser().subscribe((user) => {
      this.authenticatedUser = user;
      if (user) {
        this.uplayService.getCoinBalance(user.id).subscribe((balance) => {
          this.coinBalance = balance;
          console.log(this.coinBalance);
        });
      }
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  isLoggedIn(): boolean {
    return this.authStatusService.isLoggedIn();
  }

  playRoulette(): void {
    if (this.coinBalance >= this.playCost) {
      // LOGICA SIMPLE
      this.isWinner = Math.random() < 0.5; // 50% chances
      if (this.isWinner) {
        this.coinBalance += this.rewardCoins;
      } else {
        this.coinBalance -= this.playCost;
      }

      // ActualizoDB
      this.uplayService.updateCoinBalance(this.authenticatedUser.id, this.coinBalance).subscribe(
        () => {
          console.log('Coin balance updated successfully.');
        },
        (error) => {
          console.error('Error updating coin balance:', error);
        }
      );
    } else {
      console.log('Insufficient coins to play.');
    }
  }
}
