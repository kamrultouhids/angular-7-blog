import { TestBed } from '@angular/core/testing';

import { MixinsService } from './mixins.service';

describe('MixinsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MixinsService = TestBed.get(MixinsService);
    expect(service).toBeTruthy();
  });
});
