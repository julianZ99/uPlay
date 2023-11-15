import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


import { AuthStatusService } from 'src/app/core/services/auth-status/auth-status.service';
import { UplayService } from 'src/app/core/services/uplay/uplay.service';
import { CoinBalanceService } from 'src/app/core/services/coin-balance/coin-balance.service';
import { symbols } from './symbols';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css'],

})

export class SlotComponent implements OnInit, OnDestroy {
  authenticatedUser: any | null;
  coinBalance: number = 0;
  netCredits:any;
  betCredits: number = 0; // apuesta
  isWinner: boolean | null = null;

  idApuesta: number = 0;

  details:any;
  win: any;
  lost: any;

  stopSpin:any; 

  currentSym1!: symbols;//Symbol1 in the reel
  currentSym2!: symbols;//Symbol2 in the reel
  currentSym3!: symbols;//Symbol3 in the reel

  symbol1:symbols = {
    value: 7,
    symbolLink: "/assets/slots/redseven.png"
  };
  symbol2:symbols = {
    value: 2,
    symbolLink: "/assets/slots/cherry.png"
  };
  symbol3:symbols = {
    value: 3,
    symbolLink: "/assets/slots/lemon.png"
  };
  symbol4:symbols = {
    value: 4,
    symbolLink: "/assets/slots/plum.png"
  };
  symbol5:symbols = {
    value: 5,
    symbolLink: "/assets/slots/watermelon.png"
  };
  symbol6:symbols = {
    value: 6,
    symbolLink: "/assets/slots/bell.png"
  };

  symbolReel: symbols[] = [this.symbol1, this.symbol2, this.symbol3, this.symbol4, this.symbol5, this.symbol6];

  private authSubscription: Subscription = new Subscription();

  constructor(
    private authStatusService: AuthStatusService,
    private uplayService: UplayService,
    private coinBalanceService: CoinBalanceService,
  ) { }



  ngOnInit() {
    this.currentSym1 = this.symbolReel[2];
    this.currentSym2 = this.symbolReel[4];
    this.currentSym3 = this.symbolReel[5]; 
    console.log("slots init");
    this.authSubscription = this.authStatusService.getAuthenticatedUser().subscribe((user) => {
      this.authenticatedUser = user;
      if (user) {
        this.uplayService.getCoinBalance(user.id).subscribe((balance) => {
          this.coinBalance = balance;
          console.log(this.coinBalance);
          this.coinBalanceService.updateCoinBalance(this.coinBalance);
        });
      }
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  stopSpinning(){
    clearInterval(this.stopSpin);
    this.winOrLose();


  }

  spinning(){
    if(this.betCredits > 0){
    //spinning
    this.stopSpin = setInterval(()=>{this.spin()},10);
    }else{
      alert("Insufficent Credits!");
    }  
  }

  spin(){
    let randomNum1 = Math.floor(Math.random() * (this.symbolReel.length-1));
    let randomNum2 = Math.floor(Math.random() * (this.symbolReel.length-1));
    let randomNum3 = Math.floor(Math.random() * (this.symbolReel.length-1));

    this.currentSym1 = this.symbolReel[randomNum1];
    this.currentSym2 = this.symbolReel[randomNum2];
    this.currentSym3 = this.symbolReel[randomNum3];
  }
  
  betCoin(){
    if(this.coinBalance > 0){
      this.betCredits++;
      this.netCredits++;
      this.coinBalance--;
    }
    console.log("Bet Credits" + this.betCredits);
    console.log("Coins" + this.coinBalance);
  }

  betMax(){
    if (this.coinBalance > 2){
      this.betCredits += this.coinBalance;
      this.netCredits += this.coinBalance;
      this.coinBalance = 0;
    }
  }

  reset(){
    this.coinBalance += this.betCredits;
    this.betCredits = 0;
    console.log("Bet Credits" + this.betCredits);
  }


  winOrLose(){
    //boolean cy compara
    let slot1_eq_slot2: boolean = (this.currentSym1 == this.currentSym2);
    let slot2_eq_slot3: boolean = (this.currentSym2 == this.currentSym3);
    let slot1_eq_slot3: boolean = (this.currentSym1 == this.currentSym3);
    
    if(slot1_eq_slot2 || slot2_eq_slot3 || slot1_eq_slot3){
      //gana si 2 o mas son iguales, y multiplyca x el valor del slot
      if(slot1_eq_slot2){
        this.coinBalance += (this.currentSym1.value * this.betCredits);
      }else if(slot1_eq_slot3){
        this.coinBalance += (this.currentSym3.value * this.betCredits);
      }else if(slot2_eq_slot3){
        this.coinBalance += (this.currentSym2.value * this.betCredits);
      }
      this.win++;
      //settea bet=0
      this.betCredits = 0;
      alert("You WON!");
    }else{
      this.lost++;
      //settea bet=0
      this.betCredits = 0;
      alert("You have Lost!");
    }
    //update coins view
    this.coinBalanceService.updateCoinBalance(this.coinBalance);
    //carga db con coins
    this.uplayService.updateCoinBalance(this.authenticatedUser.id, this.coinBalance).subscribe(
      () => {
        console.log('Coin balance updated successfully.');
      },
      (error) => {
        console.error('Error updating coin balance:', error);
      }
    );
    
    let winAndLost ={
      idApuesta: this.idApuesta,
      matchLost: this.lost,
      matchWins: this.win
    }

    console.log(winAndLost);  
  }


}
