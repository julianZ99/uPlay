import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UplayService {

  private apiUplayURL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    let url = `${this.apiUplayURL}/users/login`;

    return this.http.post(url, { username, password }).pipe(
      map((data: any) => data)
    );
  }
}
