import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICrypto } from '../types';
import { currencies } from '../seed/currency.seed';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private favoritesData = new BehaviorSubject<ICrypto[]>([])
  private listData = new BehaviorSubject<ICrypto[]>(currencies.map((curr) => ({ ...curr, favorite: false })))
  favorites = this.favoritesData.asObservable()
  list = this.listData.asObservable()

  constructor() { }

  updateFavorites(payload: ICrypto[]) {
    this.favoritesData.next(payload.filter(item => item.favorite))
  }
  updateList(payload: ICrypto[]) {
    this.listData.next(payload)
  }
}
