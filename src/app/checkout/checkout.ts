import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KioskService, OrderItem } from '../kiosk';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  private readonly kioskService = inject(KioskService);

  kioskHeading = input<string>('🛒 Your Kiosk Order Summary');
  orderStatusChange = output<string>();

  readonly order = this.kioskService.order;
  readonly orderTotal = this.kioskService.orderTotal;

  formatPrice(value: number): string {
    return value.toFixed(2);
  }

  incrementItem(item: OrderItem): void {
    this.kioskService.updateQuantity(item.id, 1);
    this.orderStatusChange.emit(`➕ Added 1x more ${item.name} to your tray.`);
  }

  decrementItem(item: OrderItem): void {
    this.kioskService.updateQuantity(item.id, -1);
    this.orderStatusChange.emit(`➖ Reduced quantity or cleared ${item.name} from tray.`);
  }

  clearAll(): void {
    this.kioskService.clearOrder();
    this.orderStatusChange.emit('❌ Order has been completely cleared.');
  }

  processPayment(): void {
    const finalBill = this.orderTotal();
    alert(`🎉 Transaction Complete!\nYour receipt totals: $${finalBill}\nThank you for choosing Coffee Oasis!`);
    this.kioskService.clearOrder();
    this.orderStatusChange.emit('✨ Registered checkout complete! Tray is cleared.');
  }
}
