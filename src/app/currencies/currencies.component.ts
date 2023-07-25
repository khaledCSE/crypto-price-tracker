import { Component, OnInit } from '@angular/core';
import { ICrypto } from '../types';
import { currencies } from '../seed/currency.seed'
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {
  list: ICrypto[] = currencies.map((curr) => ({ ...curr, favorite: false }));
  searchTerm: string = '';
  filteredList: ICrypto[];

  constructor(private dataService: DataService) {
    this.filteredList = this.list;
  }

  ngOnInit(): void {
  }

  filter() {
    this.filteredList = this.list.filter(item => item.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
  markAsFavorite(asset_id: string) {
    const index = this.filteredList.findIndex((el) => el.asset_id === asset_id)
    this.filteredList[index].favorite = true
    const cloned = [...this.filteredList]
    cloned[index].favorite = true
    this.dataService.updateFavorites(cloned)
    this.dataService.updateList(cloned)
  }
}
