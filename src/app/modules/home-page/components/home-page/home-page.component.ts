import { Component } from '@angular/core';
import { AuthStatusService } from 'src/app/core/services/auth-status/auth-status.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  isLoggedIn: boolean = false;

  constructor(private authStatusService: AuthStatusService) {
    this.isLoggedIn = this.authStatusService.isLoggedIn();
  }
}