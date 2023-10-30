import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomePageModule } from '../home-page.module';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}
