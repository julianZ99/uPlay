import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStatusService } from 'src/app/core/services/auth-status/auth-status.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private authStatusService: AuthStatusService
  ) { }

  isLoggedIn: boolean = false;

  ngOnInit() {
    this.checkLoginStatus();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
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
