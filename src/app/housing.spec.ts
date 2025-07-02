import { TestBed } from '@angular/core/testing';

import { HousingService } from './housing.service';

describe('Housing', () => {
  let service: HousingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HousingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
