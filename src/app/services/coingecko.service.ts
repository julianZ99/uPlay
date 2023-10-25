import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Coin } from 'src/app/models/coin'


@Injectable({
  providedIn: 'root'
})
export class CoingeckoService {
  private apiURL = "https://api.coingecko.com/api/v3"
  constructor(private http: HttpClient) { }

  getAll(): Promise<any> {
    return this.http.get(this.apiURL+'/coins/list')
      .toPromise();
  }


}

