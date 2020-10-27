import { TestBed } from '@angular/core/testing';

import { WorkoutpreviewpicturesService } from './workoutpreviewpictures.service';

describe('WorkoutpreviewpicturesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkoutpreviewpicturesService = TestBed.get(WorkoutpreviewpicturesService);
    expect(service).toBeTruthy();
  });
});
