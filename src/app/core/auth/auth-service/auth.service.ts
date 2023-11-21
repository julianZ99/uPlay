import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = undefined;

  private apiUplayURL = 'http://localhost:8080/api';

  constructor (private http: HttpClient){

  }

  login(username: string, password: string): Promise<User> {
    const url = `${this.apiUplayURL}/users/login`;

    return new Promise<User>((resolve, reject) => {
      this.http.post<any>(url, { username, password }).subscribe(
        (response) => {
          if (response && response.token) {
            this.token = response['jwt'];
            localStorage.setItem('token', response.token);
            console.log(response.token);
            console.log(response);
          }
        },
        (error) => {
          console.error('Error: ', error);
          reject(error);
        }
      );
    });
  }

  logout(): void{
    localStorage.removeItem('token');
  }
}