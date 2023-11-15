import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dolar } from '../../models/dolar/dolar';
import { Coin } from '../../models/coin/coin';

@Injectable({
  providedIn: 'root'
})
export class CoingeckoService {
  private apiURL = "https://api.coingecko.com/api/v3";
  private apiKey = 'CG-96rk9R1Rk8GNats2evanpBka ';

  private apiDolarUrl = "https://dolarapi.com/v1/dolares";

  constructor(private http: HttpClient) { }

  getCryptocurrencyList(): Promise<Coin[]> {
    const url = `${this.apiURL}/coins/markets`;
    const headers = new HttpHeaders().set('x-cg-demo-api-key', this.apiKey);
    const params = new HttpParams()
      .set('vs_currency', 'usd')
      .set('per_page', '100')
      .set('page', '1');

    return new Promise<Coin[]>((resolve, reject) => {
      this.http.get<Coin[]>(url, { headers, params }).subscribe(
        (data) => {
          resolve(this.transformDataArray(data));
        },
        (error) => {
          console.error('Error: ', error);
          reject(error);
        }
      );
    });
  }

  transformDataArray(coingeckoData: any[]): Coin[] {
    return coingeckoData.map(data => new Coin(data));
}

  getCryptocurrencyDetails(cryptoId: string): Observable<any> {
    const url = `${this.apiURL}/coins/${cryptoId}`;
    const headers = new HttpHeaders().set('x-cg-demo-api-key', this.apiKey);

    return this.http.get(url, { headers });
  }

  getDolarMEPValue(): Promise<Dolar> {
    const url = `${this.apiDolarUrl}/bolsa`;
    
    return new Promise<Dolar>((resolve, reject) => {
      this.http.get<any>(url).subscribe(
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

  getDolarOficialValue(): Promise<Dolar> {
    const url = `${this.apiDolarUrl}/oficial`;
    
    return new Promise<Dolar>((resolve, reject) => {
      this.http.get<any>(url).subscribe(
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

}