import { TestBed } from '@angular/core/testing';

import { AllExercisesService } from './all-exercises.service';

describe('AllExercisesService', () => {
  let service: AllExercisesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllExercisesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
