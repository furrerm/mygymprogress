import { TestBed } from '@angular/core/testing';

import { SaveProfileDataService } from './save-profile-data.service';

describe('SaveProfileDataService', () => {
  let service: SaveProfileDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveProfileDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
