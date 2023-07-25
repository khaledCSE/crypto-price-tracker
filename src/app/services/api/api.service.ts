import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { of, tap } from 'rxjs';
import { IExchange } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private exchangeUrl = 'https://rest.coinapi.io/v1/exchangerate'
  private exchangeCache = new Map<string, IExchange>()
  constructor(private http: HttpClient) { }

  getRates(asset_id: string) {
    const cachedResponse = this.exchangeCache.get(this.exchangeUrl)

    if (cachedResponse) {
      return of(cachedResponse)
    }

    const res = this.http.get<IExchange>(`${this.exchangeUrl}/${asset_id}`, {
      params: {
        filter_asset_id: 'GBP,USD,EUR,CAD',
        invert: 'false',
        apikey: 'BF22C406-7DC8-4E82-A7E3-ADA55BA263BA',
      }
    })
    return res.pipe(tap((res) => this.exchangeCache.set(this.exchangeUrl, res)))
  }
}
