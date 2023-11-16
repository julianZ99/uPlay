import { TestBed } from '@angular/core/testing';

import { DolaritoService } from './dolarito.service';

describe('DolaritoService', () => {
  let service: DolaritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DolaritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
