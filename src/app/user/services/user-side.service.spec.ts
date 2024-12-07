import { TestBed } from '@angular/core/testing';

import { UserSideService } from './user-side.service';

describe('UserSideService', () => {
  let service: UserSideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
