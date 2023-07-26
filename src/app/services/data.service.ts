import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICrypto } from '../types';
import { currencies } from '../seed/currency.seed';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private favoritesData = new BehaviorSubject<ICrypto[]>([])
  private listData = new BehaviorSubject<ICrypto[]>([])
  favorites = this.favoritesData.asObservable()
  list = this.listData.asObservable()


  updateFavorites(payload: ICrypto[]) {
    this.favoritesData.next(payload.filter(item => item.favorite))
  }
  updateList(payload: ICrypto[]) {
    this.listData.next(payload)
  }
}
