import { TestBed } from '@angular/core/testing';

import { SaveWorkoutService } from './save-workout.service';

describe('SaveWorkoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveWorkoutService = TestBed.get(SaveWorkoutService);
    expect(service).toBeTruthy();
  });
});
