import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStatusService {
  private authenticatedUser: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  isLoggedIn(): boolean {
    return !!this.authenticatedUser.value;
  }

  setAuthenticatedUser(user: any): void {
    this.authenticatedUser.next(user);
  }

  getAuthenticatedUser(): Observable<any | null> {
    return this.authenticatedUser.asObservable();
  }
  //para logout
  clearAuthenticatedUser(): void {
    this.authenticatedUser.next(null);
  }
}