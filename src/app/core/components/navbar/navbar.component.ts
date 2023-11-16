import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthStatusService } from 'src/app/core/services/auth-status/auth-status.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private authStatusService: AuthStatusService,
  ) { }

  isLoggedIn: boolean = false;
  isLoginRoute: boolean = false;
  currentRoute: string = '';


  ngOnInit() {
    this.checkLoginStatus();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
        console.log(this.currentRoute);
        this.isLoginRoute = this.currentRoute === '/login';
        console.log(this.isLoginRoute);
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/registration']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToCoins() {
    this.router.navigate(['/coins']);
  }

  navigateToGames() {
    this.router.navigate(['/games']);
  }

  navigateToRankings() {
    this.router.navigate(['/ranking']);
  }

  navigateToExchange() {
    this.router.navigate(['/exchange']);
  }

  checkLoginStatus() {
    this.authStatusService.getAuthenticatedUser().subscribe(
      (user: any | null) => {
        this.isLoggedIn = !!user;
        console.log('navbar. User is logged:', this.isLoggedIn);
      },
      (error: any) => {
        console.error('navbar. Error checking login status:', error);
      }
    );
  }
}
