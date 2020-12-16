import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';

import { LastSetService } from './last-set.service';

describe('LastSetService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [LastSetService]
  }));

  it('should be created', () => {
    const service: LastSetService = TestBed.inject(LastSetService);
    expect(service).toBeTruthy();
  });
});
