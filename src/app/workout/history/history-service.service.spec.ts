import { TestBed } from '@angular/core/testing';

import { HistoryServiceService } from './history-service.service';

describe('HistoryServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistoryServiceService = TestBed.get(HistoryServiceService);
    expect(service).toBeTruthy();
  });
});
