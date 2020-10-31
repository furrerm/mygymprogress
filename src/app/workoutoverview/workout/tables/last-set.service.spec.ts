import { TestBed } from '@angular/core/testing';

import { LastSetService } from './last-set.service';

describe('LastSetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LastSetService = TestBed.get(LastSetService);
    expect(service).toBeTruthy();
  });
});
