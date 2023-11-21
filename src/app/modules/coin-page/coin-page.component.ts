import { Component } from '@angular/core';
import { AuthGuard } from 'src/app/core/auth/auth-guard/auth-guard.service';

@Component({
  selector: 'app-coin-page',
  templateUrl: './coin-page.component.html',
  styleUrls: ['./coin-page.component.css'],
})
export class CoinPageComponent {
  isLoggedIn: boolean = false;

  constructor(
    private authGuard: AuthGuard,
  ) {
    this.isLoggedIn = this.authGuard.canActivate();
  }

}
