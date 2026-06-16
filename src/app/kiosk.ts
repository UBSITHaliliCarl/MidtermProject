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
  // Signals: Centralized database containing exactly 15 coffee shop products
  readonly menu = signal<MenuItemData[]>([
    { id: 1, name: 'Espresso Shot', price: 2.50, description: 'Rich and bold single shot', category: 'Espresso' },
    { id: 2, name: 'Americano', price: 3.50, description: 'Espresso over hot water', category: 'Espresso' },
    { id: 3, name: 'Caffè Latte', price: 4.50, description: 'Espresso with steamed milk & microfoam', category: 'Espresso' },
    { id: 4, name: 'Cappuccino', price: 4.50, description: 'Equal parts espresso, milk, and foam', category: 'Espresso' },
    { id: 5, name: 'Caramel Macchiato', price: 5.25, description: 'Espresso with vanilla and caramel drizzle', category: 'Espresso' },
    { id: 6, name: 'Classic Cold Brew', price: 4.25, description: 'Steeped for 20 hours in cool water', category: 'Cold Brew' },
    { id: 7, name: 'Nitro Cold Brew', price: 5.00, description: 'Infused with nitrogen for a creamy head', category: 'Cold Brew' },
    { id: 8, name: 'Vanilla Sweet Cream', price: 4.75, description: 'Cold brew topped with sweet cream', category: 'Cold Brew' },
    { id: 9, name: 'Matcha Green Tea Latte', price: 4.85, description: 'Organic matcha with steamed milk', category: 'Tea & Latte' },
    { id: 10, name: 'Chai Tea Latte', price: 4.85, description: 'Spiced black tea blend with milk', category: 'Tea & Latte' },
    { id: 11, name: 'Iced Peach Green Tea', price: 3.95, description: 'Green tea shaken with peach juice', category: 'Tea & Latte' },
    { id: 12, name: 'Butter Croissant', price: 3.50, description: 'Flaky, golden classic pastry', category: 'Pastries' },
    { id: 13, name: 'Chocolate Muffin', price: 3.75, description: 'Rich muffin with real chocolate chunks', category: 'Pastries' },
    { id: 14, name: 'Cinnamon Roll', price: 4.25, description: 'Warm roll topped with cream cheese icing', category: 'Pastries' },
    { id: 15, name: 'Blueberry Scone', price: 3.50, description: 'Traditional scone bursting with berries', category: 'Pastries' }
  ]);

  // Signals: State tracker holding active kiosk order items
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
