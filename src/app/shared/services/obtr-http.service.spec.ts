import { TestBed, inject } from '@angular/core/testing';

import { ObtrHttpService } from './obtr-http.service';

describe('ObtrHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObtrHttpService]
    });
  });

  it('should be created', inject([ObtrHttpService], (service: ObtrHttpService) => {
    expect(service).toBeTruthy();
  }));
});
