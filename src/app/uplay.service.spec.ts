import { TestBed } from '@angular/core/testing';

import { UplayService } from './uplay.service';

describe('UplayService', () => {
  let service: UplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
