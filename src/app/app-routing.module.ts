import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrenciesComponent } from './currencies/currencies.component';

const routes: Routes = [
  { path: '', redirectTo: 'currencies', pathMatch: 'full' },
  { path: 'currencies', component: CurrenciesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
