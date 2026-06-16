import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KioskNav } from './kiosk-nav/kiosk-nav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, KioskNav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
