import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CoingeckoService {
  private apiURL = "https://api.coingecko.com/api/v3"
  constructor(private http: HttpClient) { }

  getCryptocurrencyList(): Observable<any[]> {
    const url = `${this.apiURL}/coins/markets`;
    const params = {
      vs_currency: 'usd',
      per_page: '100',
      page: '1' 
    };

    return this.http.get(url, { params }).pipe(
      map((data: any) => data)
    );
  }

  getCryptocurrencyDetails(cryptoId: string): Observable<any> {
    const url = `${this.apiURL}/coins/${cryptoId}`;
    return this.http.get(url);
  }

}

