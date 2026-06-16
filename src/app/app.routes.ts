import { Routes } from '@angular/router';
import { Menu } from './menu/menu';
import { Checkout } from './checkout/checkout';

export const routes: Routes = [
  { path: '', component: Menu },
  { path: 'checkout', component: Checkout },
  { path: '**', redirectTo: '' }
];
