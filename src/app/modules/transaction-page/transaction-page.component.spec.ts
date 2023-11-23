import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionPageComponent } from './transaction-page.component';

describe('RankingPageComponent', () => {
  let component: TransactionPageComponent;
  let fixture: ComponentFixture<TransactionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionPageComponent]
    });
    fixture = TestBed.createComponent(TransactionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
