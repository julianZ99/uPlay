import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UplayService {

  private apiUplayURL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    const url = `${this.apiUplayURL}/users/login`;

    return this.http.post(url, { username, password }).pipe(
      map((data: any) => data)
    );
  }

  registration(user: User): Observable<any>{
    const url = `${this.apiUplayURL}/users/register`;

    return this.http.post(url, user).pipe(
      map((data: any) => data)
    );
  }

}
