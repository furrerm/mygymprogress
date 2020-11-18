import { TestBed } from '@angular/core/testing';

import { SaveSetsService } from './save-sets.service';

describe('SaveSetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveSetsService = TestBed.get(SaveSetsService);
    expect(service).toBeTruthy();
  });
});
