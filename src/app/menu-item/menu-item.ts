import { Component, input, output } from '@angular/core';
import { MenuItemData } from '../kiosk';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.css'
})
export class MenuItem {
  item = input.required<MenuItemData>();

  itemSelected = output<MenuItemData>();

  formatPrice(value: number): string {
    return value.toFixed(2);
  }

  onAddButtonClick(event: Event): void {
    event.stopPropagation();
    this.itemSelected.emit(this.item());
  }
}
