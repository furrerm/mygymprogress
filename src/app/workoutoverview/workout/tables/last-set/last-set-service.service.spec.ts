import { TestBed } from '@angular/core/testing';

import { LastSetServiceService } from './last-set-service.service';

describe('LastSetServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LastSetServiceService = TestBed.get(LastSetServiceService);
    expect(service).toBeTruthy();
  });
});
