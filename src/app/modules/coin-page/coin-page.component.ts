import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStatusService } from 'src/app/core/services/auth-status/auth-status.service';


@Component({
  selector: 'app-coin-page',
  templateUrl: './coin-page.component.html',
  styleUrls: ['./coin-page.component.css'],
})
export class CoinPageComponent {
  isLoggedIn: boolean = false;

  constructor(
    private authStatusService: AuthStatusService,
  ) {
    this.isLoggedIn = this.authStatusService.isLoggedIn();
  }

}
