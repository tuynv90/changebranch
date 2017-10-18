import { TestBed, inject } from '@angular/core/testing';

import { LandTransportService } from './land-transport.service';

describe('LandTransportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LandTransportService]
    });
  });

  it('should be created', inject([LandTransportService], (service: LandTransportService) => {
    expect(service).toBeTruthy();
  }));
});
