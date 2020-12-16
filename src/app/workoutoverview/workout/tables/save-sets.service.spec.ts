import { TestBed } from '@angular/core/testing';

import { SaveSetsService } from './save-sets.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SaveSetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: SaveSetsService = TestBed.get(SaveSetsService);
    expect(service).toBeTruthy();
  });
});
