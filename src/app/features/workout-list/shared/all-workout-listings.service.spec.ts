import { TestBed } from '@angular/core/testing';

import { AllWorkoutListingsService } from './all-workout-listings.service';

describe('AllWorkoutListingsService', () => {
  let service: AllWorkoutListingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllWorkoutListingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
