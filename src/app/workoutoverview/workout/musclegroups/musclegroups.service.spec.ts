import { TestBed } from '@angular/core/testing';

import { MusclegroupsService } from './musclegroups.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MusclegroupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: MusclegroupsService = TestBed.get(MusclegroupsService);
    expect(service).toBeTruthy();
  });
});
