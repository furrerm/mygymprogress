import { TestBed } from '@angular/core/testing';

import { SavedWorkoutsService } from './saved-workouts.service';

describe('SavedWorkoutsService', () => {
  let service: SavedWorkoutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedWorkoutsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
