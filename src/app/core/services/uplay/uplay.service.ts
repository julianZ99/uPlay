import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user';
import { tap } from 'rxjs/operators';
import { AuthStatusService } from '../auth-status/auth-status.service';

@Injectable({
  providedIn: 'root'
})
export class UplayService {

  private apiUplayURL = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authStatusService: AuthStatusService) { }

  login(username: string, password: string): Observable<User> {
    const url = `${this.apiUplayURL}/users/login`;

    return this.http.post<User>(url, { username, password }).pipe(
      tap((user: User) => {
        this.authStatusService.setAuthenticatedUser(user);//autentico el user
        console.log('Login successful:', user);
      })
    );
  }

  registration(user: User): Observable<any> {
    const url = `${this.apiUplayURL}/users/register`;

    return this.http.post(url, user);
  }
}