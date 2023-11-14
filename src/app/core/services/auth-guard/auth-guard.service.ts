import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStatusService } from '../auth-status/auth-status.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authStatusService: AuthStatusService, private router: Router) {}

  canActivate(): boolean {
    if (this.authStatusService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}