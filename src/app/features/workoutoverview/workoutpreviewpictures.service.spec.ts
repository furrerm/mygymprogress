import { TestBed } from '@angular/core/testing';

import { WorkoutpreviewpicturesService } from './workoutpreviewpictures.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('WorkoutpreviewpicturesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: WorkoutpreviewpicturesService = TestBed.get(WorkoutpreviewpicturesService);
    expect(service).toBeTruthy();
  });
});
