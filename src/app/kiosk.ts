import { Injectable, signal, computed } from '@angular/core';

export interface MenuItemData {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface OrderItem extends MenuItemData {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class KioskService {
  readonly menu = signal<MenuItemData[]>([
    { id: 1, name: 'Espresso Shot', price: 90, description: 'Rich and bold single shot', category: 'Espresso' },
    { id: 2, name: 'Americano', price: 90, description: 'Espresso over hot water', category: 'Espresso' },
    { id: 3, name: 'Caffè Latte', price: 70, description: 'Espresso with steamed milk & microfoam', category: 'Espresso' },
    { id: 4, name: 'Cappuccino', price: 70, description: 'Equal parts espresso, milk, and foam', category: 'Espresso' },
    { id: 5, name: 'Caramel Macchiato', price: 95, description: 'Espresso with vanilla and caramel drizzle', category: 'Espresso' },
    { id: 6, name: 'Vanilla Sweet Cream', price: 75, description: 'Cold brew topped with sweet cream', category: 'Cold Brew' },
    { id: 7, name: 'Iced Chocolate', price: 75, description: 'Cocoa mixed with fresh milk', category: 'Cold Brew' },
    { id: 8, name: 'Matcha Latte', price: 85, description: 'Organic matcha with steamed milk', category: 'Tea & Latte' },
    { id: 9, name: 'Butter Croissant', price: 50, description: 'Flaky, golden classic pastry', category: 'Pastries' },
    { id: 10, name: 'Chocolate Muffin', price: 65, description: 'Rich muffin with real chocolate chunks', category: 'Pastries' },
    { id: 11, name: 'Cinnamon Roll', price: 65, description: 'Warm roll topped with cream cheese icing', category: 'Pastries' },
    { id: 12, name: 'Cupcake', price: 60, description: 'Traditional cupcake with toppings', category: 'Pastries' }
  ]);

  readonly order = signal<OrderItem[]>([]);
  
  readonly orderCount = computed(() => this.order().reduce((acc, item) => acc + item.quantity, 0));
  
  readonly orderTotal = computed(() => {
    const total = this.order().reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return total.toFixed(2);
  });

  addToOrder(item: MenuItemData): void {
    this.order.update(currentOrder => {
      const existing = currentOrder.find(o => o.id === item.id);
      if (existing) {
        return currentOrder.map(o => o.id === item.id ? { ...o, quantity: o.quantity + 1 } : o);
      }
      return [...currentOrder, { ...item, quantity: 1 }];
    });
  }

  updateQuantity(itemId: number, change: number): void {
    this.order.update(currentOrder => {
      return currentOrder.map(item => {
        if (item.id === itemId) {
          const newQty = item.quantity + change;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter((item): item is OrderItem => item !== null);
    });
  }

  clearOrder(): void {
    this.order.set([]);
  }
}
