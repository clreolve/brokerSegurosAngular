import { TestBed } from '@angular/core/testing';

import { DeducibleService } from './deducible.service';

describe('DeducibleService', () => {
  let service: DeducibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeducibleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
