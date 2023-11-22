import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user/user';
import { Question } from '../../models/question/question';
import { UserResgistration } from '../../models/userResgistration/user-resgistration';
import { UserPassword } from '../../models/userPassword/user-password';



@Injectable({
  providedIn: 'root'
})
export class UplayService {

  private apiUplayURL = 'http://localhost:8080/api';
  private userId!: number;

  constructor(private http: HttpClient) {
  }

  registration(user: UserResgistration): Promise<any> {
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

  getQuestion(): Promise<Question[]>{
    const url = `${this.apiUplayURL}/questions/getQuestions`;

    return new Promise<any>((resolve, reject) => {
      this.http.get(url).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getUserQuestion(userEmail: string): Promise<Question>{
    const url = `${this.apiUplayURL}/questions/getUserQuestion`
  
    return new Promise<any>((resolve,reject) => {

      this.http.post(url, userEmail).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyPassword(user: UserPassword): Promise<User>{
    const url = `${this.apiUplayURL}/users/modifyPassword`;

    return new Promise<any>((resolve,reject) => {
      this.http.put(url, user).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getCoinBalance(): Observable<number> {
    return new Observable<number>((observer) => {
      this.getUserId().then(() => {
        const url = `${this.apiUplayURL}/users/coin-balance/${this.userId}`;
        this.http.get<number>(url).subscribe(
          (data) => {
            observer.next(data);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      });
    });
  }

  updateCoinBalance(newBalance: number): Observable<any> {
    return new Observable<any>((observer) => {
      this.getUserId().then(() => {
        const url = `${this.apiUplayURL}/users/update-coin-balance/${this.userId}`;
        const params = { newCoinBalance: newBalance.toString() };
        this.http.put(url, null, { params }).subscribe(
          () => {
            observer.next();
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      });
    });
  }

  getUserId(): Promise<void> {
    return new Promise<void>((resolve) => {

      const userData = localStorage.getItem('userData');
  
      if (userData) {
        const user = JSON.parse(userData);
        this.userId = user.id;
        console.log('this.userId:', this.userId);
      }
  
      resolve();
    });
}
}
