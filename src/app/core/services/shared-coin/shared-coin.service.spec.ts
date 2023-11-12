import { TestBed } from '@angular/core/testing';

import { SharedCoinService } from './shared-coin.service';

describe('SharedCoinService', () => {
  let service: SharedCoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedCoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
