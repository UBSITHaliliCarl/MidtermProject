import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { KioskService } from '../kiosk';

@Component({
  selector: 'app-kiosk-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './kiosk-nav.html',
  styleUrl: './kiosk-nav.css'
})
export class KioskNav {
  readonly service = inject(KioskService);
}
