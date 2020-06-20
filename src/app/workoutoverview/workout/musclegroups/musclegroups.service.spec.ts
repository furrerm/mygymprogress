import { TestBed } from '@angular/core/testing';

import { MusclegroupsService } from './musclegroups.service';

describe('MusclegroupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MusclegroupsService = TestBed.get(MusclegroupsService);
    expect(service).toBeTruthy();
  });
});
