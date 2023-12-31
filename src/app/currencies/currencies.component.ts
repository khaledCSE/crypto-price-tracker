import { Component, OnInit } from '@angular/core';
import { ICrypto } from '../types';
import { currencies } from '../seed/currency.seed'
import { DataService } from '../services/data.service';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {
  list: ICrypto[] = [];
  searchTerm: string = '';
  filteredList: ICrypto[];
  coinsLoading = true

  constructor(private dataService: DataService, private apiService: ApiService) {
    this.filteredList = this.list;
  }

  ngOnInit(): void {
    this.dataService.list.subscribe(data => {
      this.filteredList = data
      this.list = data
    })
    this.list.forEach((el) => {
      if (el.favorite) {
        this.apiService.getRates(el.asset_id).subscribe((data) => {
          const index = this.filteredList.findIndex(item => item.asset_id === el.asset_id)
          const copied = [...this.filteredList]
          copied[index].rates = data.rates
          this.filteredList = [
            ...this.filteredList.slice(0, index),
            { ...this.filteredList[index], rates: data.rates, favorite: true },
            ...this.filteredList.slice(index + 1),
          ]
        }, (err) => {
          console.log(err);

        })
      };
    })

    // Making the API call
    this.apiService.getCoins().subscribe((data) => {
      // Too large a request, many of those don't even have information. Had to trim down for simplicity
      const updated = data.filter((curr) => curr.type_is_crypto === 1).map((curr) => ({ ...curr, favorite: false })).slice(0, 100)
      this.dataService.updateList(updated)
      this.coinsLoading = false
    })
  }

  filter() {
    console.log({ search: this.searchTerm });

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
