import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { of, tap } from 'rxjs';
import { ICrypto, IExchange } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // All Coins
  private coinsUrl = 'https://rest.coinapi.io/v1/assets'
  private coinsCache = new Map<string, ICrypto[]>()

  // Coin Details
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

  getCoins() {
    const cachedResponse = this.coinsCache.get(this.coinsUrl)

    if (cachedResponse) {
      return of(cachedResponse)
    }

    const res = this.http.get<ICrypto[]>(this.coinsUrl, {
      params: {
        apikey: 'BF22C406-7DC8-4E82-A7E3-ADA55BA263BA',
      }
    })
    return res.pipe(tap((res) => this.coinsCache.set(this.coinsUrl, res)))
  }
}
