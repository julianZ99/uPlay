import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user';


@Injectable({
  providedIn: 'root'
})
export class UplayService {

  private apiUplayURL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Promise<User> {
    const url = `${this.apiUplayURL}/users/login`;

    return new Promise<User>((resolve, reject) => {
      this.http.post<User>(url, { username, password }).subscribe(
        (response) => {
          return resolve(response);
        },
        (error) => {
          console.error('Error: ', error);
          reject(error);
        }
      );
    });
  }

  registration(user: User): Promise<any> {
    const url = `${this.apiUplayURL}/users/register`;

    return new Promise<any>((resolve, reject) => {
      this.http.post(url, user).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          console.error('Error: ', error);
          reject(error);
        }
      );
    });
  }

  getCoinBalance(userId: number): Observable<number> {
    const url = `${this.apiUplayURL}/users/coin-balance/${userId}`;

    return this.http.get<number>(url);
  }

  updateCoinBalance(userId: number, newBalance: number): Observable<any> {
    const url = `${this.apiUplayURL}/users/update-coin-balance/${userId}`;
    const params = { newCoinBalance: newBalance.toString() };

    return this.http.put(url, null, { params });
  }
}
