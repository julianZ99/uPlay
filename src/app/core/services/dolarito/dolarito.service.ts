import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dolar } from '../../models/dolar/dolar';

@Injectable({
  providedIn: 'root'
})
export class DolaritoService {
  private apiDolarUrl = "https://dolarapi.com/v1/dolares";

  constructor(private http: HttpClient) { }

  async getConvertedDolarValues(): Promise<{ dolarMEPValue: number, dolarOficialValue: number, dolarBlueValue: number }> {
    const [dolarMEP, dolarOficial, dolarBlue] = await Promise.all([
      this.getDolarMEPValue(),
      this.getDolarOficialValue(),
      this.getDolarBlueValue()
    ]);

    return {
      dolarMEPValue: dolarMEP.venta,
      dolarOficialValue: dolarOficial.venta,
      dolarBlueValue: dolarBlue.venta
    };
  }

  private getDolarMEPValue(): Promise<Dolar> {
    const url = `${this.apiDolarUrl}/bolsa`;
    return this.makeRequest(url);
  }

  private getDolarOficialValue(): Promise<Dolar> {
    const url = `${this.apiDolarUrl}/oficial`;
    return this.makeRequest(url);
  }

  private getDolarBlueValue(): Promise<Dolar> {
    const url = `${this.apiDolarUrl}/blue`;
    return this.makeRequest(url);
  }

  private makeRequest(url: string): Promise<Dolar> {
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
