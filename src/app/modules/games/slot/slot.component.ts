import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


import { AuthStatusService } from 'src/app/core/services/auth-status/auth-status.service';
import { UplayService } from 'src/app/core/services/uplay/uplay.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';


@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css'],
  animations: [
    trigger('cardSpinner', [
      state('in', style({ transform: 'translateY(100%)' })),
      state('out', style({ display: 'none', transform: 'translateY(-100%)' })),
      transition('* => out', [
        style({ transform: 'translateY(100%)' }),
        animate('0.5s', style({ transform: 'translateY(-100%)' })),
      ]),
      transition('* => in', [
        style({ transform: 'translateY(-100%)' }),
        animate('0.5s', style({ transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
})

export class SlotComponent implements OnInit, OnDestroy {
  authenticatedUser: any | null;
  coinBalance!: number;
  playCost: number = 100;
  rewardCoins: number = 50;
  isWinner: boolean | null = null;

  currentIndex = 0;
  isEnded = false;
  intervalInstance: any;

  cards = [
    { value: 0, state: 'out', color: '#ffffff', transform: null },
    { value: 1, state: 'out', color: '#ffffff', transform: null },
    { value: 2, state: 'out', color: '#ffffff', transform: null },
    { value: 3, state: 'out', color: '#ffffff', transform: null },
    { value: 4, state: 'out', color: '#ffffff', transform: null },
    { value: 5, state: 'out', color: '#ffffff', transform: null },
    { value: 5, state: 'out', color: '#ffffff', transform: null },
    { value: 5, state: 'out', color: '#ffffff', transform: null },
    { value: 6, state: 'out', color: '#ffffff', transform: null },
    { value: 7, state: 'out', color: '#ffffff', transform: null },
    { value: 8, state: 'out', color: '#ffffff', transform: null },
    { value: 9, state: 'out', color: '#ffffff', transform: null },
  ];

  private authSubscription: Subscription = new Subscription();

  constructor(
    private authStatusService: AuthStatusService,
    private uplayService: UplayService,
  ) { }



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
      this.isWinner = Math.random() < 0.5;

      if (this.isWinner) {
        this.coinBalance += this.rewardCoins;
      } else {
        this.coinBalance -= this.playCost;
      }

      // Trigger the animation
      this.animateSpin();

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

  animateSpin() {
    this.isEnded = false;
    this.cards.forEach((card) => (card.state = 'out'));
    this.currentIndex = 0;
    this.cards[this.currentIndex].state = 'in';

    this.intervalInstance = setInterval(() => {
      this.currentIndex++;
      if (this.currentIndex === this.cards.length) {
        this.currentIndex = 0;
      }
      if (this.currentIndex !== 0) {
        this.cards[this.currentIndex - 1].state = 'out';
      } else {
        this.cards[this.cards.length - 1].state = 'out';
      }
      this.cards[this.currentIndex].state = 'in';
    }, 1000);

    const itemIndex = 5;
    // Math.floor(
    // Math.random() * (this.cards.length * 5 - this.cards.length) +
    //   this.cards.length
    // );

    console.log(itemIndex);
    setTimeout(() => {
      clearInterval(this.intervalInstance);
      const randomCard = this.cards.filter((card) => card.state === 'in');
      this.isEnded = true;
      console.log(randomCard);
    }, itemIndex * 1000);
  }
}



