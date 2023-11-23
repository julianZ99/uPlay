import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { User } from '../../models/user/user';
import { Question } from '../../models/question/question';
import { UserResgistration } from '../../models/userResgistration/user-resgistration';
import { UserPassword } from '../../models/userPassword/user-password';
import { ExchangeRequest } from '../../models/ExchangeRequest/exchange-request';
import { Transaction } from '../../models/transaction/transaction';
import { Wallet } from '../../models/wallet/wallet';


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

  exchangeCoins(exchangeRequest: ExchangeRequest): Observable<string> {
    const url = `${this.apiUplayURL}/users/exchange-coins`;
    console.log('Calling exchangeCoins method');
    return this.http.post(url, exchangeRequest, { responseType: 'text' })
      .pipe(
        catchError(error => {
          console.error('Exchange Error:', error);
          throw error;
        })
      );
  }

  getUserTransactions(): Observable<Transaction[]> {
    return new Observable<Transaction[]>((observer) => {
      this.getUserId().then(() => {
        const url = `${this.apiUplayURL}/users/transactions/${this.userId}`;
        this.http.get<Transaction[]>(url).subscribe(
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

  getUserWallet(): Observable<Wallet> {
    return new Observable<Wallet>((observer) => {
      this.getUserId().then(() => {
        const url = `${this.apiUplayURL}/users/wallet/${this.userId}`;
        this.http.get<Wallet>(url).subscribe(
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
