import { TestBed } from '@angular/core/testing';

import { WorkoutOverviewPicturesService } from './workout-overview-pictures.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('WorkoutpreviewpicturesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: WorkoutOverviewPicturesService = TestBed.inject(WorkoutOverviewPicturesService);
    expect(service).toBeTruthy();
  });
});
