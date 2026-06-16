import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskNav } from './kiosk-nav';

describe('KioskNav', () => {
  let component: KioskNav;
  let fixture: ComponentFixture<KioskNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KioskNav],
    }).compileComponents();

    fixture = TestBed.createComponent(KioskNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
