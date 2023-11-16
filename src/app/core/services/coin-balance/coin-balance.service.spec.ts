import { TestBed } from '@angular/core/testing';

import { CoinBalanceService } from './coin-balance.service';

describe('CoinBalanceService', () => {
  let service: CoinBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
