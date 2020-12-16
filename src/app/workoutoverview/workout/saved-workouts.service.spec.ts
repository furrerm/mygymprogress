import { TestBed } from '@angular/core/testing';

import { SavedWorkoutsService } from './saved-workouts.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SavedWorkoutsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: SavedWorkoutsService = TestBed.get(SavedWorkoutsService);
    expect(service).toBeTruthy();
  });
});
