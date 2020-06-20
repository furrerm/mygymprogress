import { TestBed } from '@angular/core/testing';

import { CurrentSetServiceService } from './current-set-service.service';

describe('CurrentSetServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentSetServiceService = TestBed.get(CurrentSetServiceService);
    expect(service).toBeTruthy();
  });
});
