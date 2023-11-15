import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinFlipComponent } from './coin-flip.component';

describe('CoinFlipComponent', () => {
  let component: CoinFlipComponent;
  let fixture: ComponentFixture<CoinFlipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoinFlipComponent]
    });
    fixture = TestBed.createComponent(CoinFlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
