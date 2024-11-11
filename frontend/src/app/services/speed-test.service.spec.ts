import { TestBed } from '@angular/core/testing';

import { SpeedTestService } from './speed-test.service';

describe('SpeedTestService', () => {
  let service: SpeedTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeedTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
