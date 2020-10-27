import { TestBed } from '@angular/core/testing';

import { SavedWorkoutsService } from './saved-workouts.service';

describe('SavedWorkoutsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SavedWorkoutsService = TestBed.get(SavedWorkoutsService);
    expect(service).toBeTruthy();
  });
});
