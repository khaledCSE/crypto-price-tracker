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
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.favorites.subscribe(data => this.favorites = data)
  }

  removeFavorite(asset_id: string) {
    const copied = [...this.favorites]
    const index = copied.findIndex(el => el.asset_id === asset_id)
    console.log(index);

    const newArr = [
      ...copied.slice(0, index),
      ...copied.slice(index + 1)
    ]
    this.favorites = newArr
    this.dataService.updateFavorites(newArr)
  }
}
