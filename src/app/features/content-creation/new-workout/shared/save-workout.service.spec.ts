import { TestBed } from '@angular/core/testing';

import { SaveWorkoutService } from './save-workout.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SaveWorkoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: SaveWorkoutService = TestBed.get(SaveWorkoutService);
    expect(service).toBeTruthy();
  });
});
