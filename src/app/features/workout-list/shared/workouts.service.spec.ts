import { TestBed } from '@angular/core/testing';

import { WorkoutsService } from './workouts.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('WorkoutsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: WorkoutsService = TestBed.get(WorkoutsService);
    expect(service).toBeTruthy();
  });
});
