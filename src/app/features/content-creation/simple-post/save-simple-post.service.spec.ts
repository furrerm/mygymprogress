import { TestBed } from '@angular/core/testing';

import { SaveSimplePostService } from './save-simple-post.service';

describe('SaveSimplePostService', () => {
  let service: SaveSimplePostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveSimplePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
