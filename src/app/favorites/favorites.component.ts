import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ICrypto } from '../types';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favorites: ICrypto[] = []
  list: ICrypto[] = []
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.favorites.subscribe(data => this.favorites = data)
    this.dataService.list.subscribe(data => this.list = data)
  }

  removeFavorite(asset_id: string) {
    const copied = [...this.favorites]
    const index = copied.findIndex(el => el.asset_id === asset_id)

    const newArr = [
      ...copied.slice(0, index),
      ...copied.slice(index + 1)
    ]
    this.favorites = newArr
    this.dataService.updateFavorites(newArr)

    // Update the List
    const copiedList = [...this.list]
    const listIndex = copiedList.findIndex(el => el.asset_id === asset_id)
    this.dataService.updateList([
      ...copiedList.slice(0, listIndex),
      ...copiedList.slice(index + 1)
    ])
  }
}
