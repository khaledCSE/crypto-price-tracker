import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {
  list: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  searchTerm: string = '';
  filteredList: string[];

  constructor() {
    this.filteredList = this.list;
  }

  ngOnInit(): void {
  }

  filter() {
    this.filteredList = this.list.filter(item => item.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
}
