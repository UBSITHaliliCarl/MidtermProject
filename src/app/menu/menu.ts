import { Component, inject } from '@angular/core';
import { KioskService, MenuItemData } from '../kiosk';
import { MenuItem } from '../menu-item/menu-item';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuItem],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  private readonly kioskService = inject(KioskService);
  
  readonly menuItems = this.kioskService.menu;

  handleAddItem(item: MenuItemData): void {
    this.kioskService.addToOrder(item);
  }
}
