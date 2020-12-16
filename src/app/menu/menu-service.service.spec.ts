import { TestBed } from '@angular/core/testing';

import { MenuServiceService } from './menu-service.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MenuServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: MenuServiceService = TestBed.get(MenuServiceService);
    expect(service).toBeTruthy();
  });
});
