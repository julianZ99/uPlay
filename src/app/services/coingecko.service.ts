import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoingeckoService {
  private apiURL = "https://api.coingecko.com/api/v3";
  private apiKey = 'CG-96rk9R1Rk8GNats2evanpBka ';

  constructor(private http: HttpClient) { }

  getCryptocurrencyList(): Observable<any[]> {
    const url = `${this.apiURL}/coins/markets`;
    const headers = new HttpHeaders().set('x-cg-demo-api-key', this.apiKey);
    const params = new HttpParams()
      .set('vs_currency', 'usd')
      .set('per_page', '100')
      .set('page', '1');

    return this.http.get(url, { headers, params }).pipe(
      map((data: any) => data)
    );
  }

  getCryptocurrencyDetails(cryptoId: string): Observable<any> {
    const url = `${this.apiURL}/coins/${cryptoId}`;
    const headers = new HttpHeaders().set('x-cg-demo-api-key', this.apiKey);

    return this.http.get(url, { headers });
  }
}