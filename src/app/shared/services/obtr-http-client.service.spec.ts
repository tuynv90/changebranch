import { TestBed, inject } from '@angular/core/testing';

import { ObtrHttpClientService } from './obtr-http-client.service';

describe('ObtrHttpClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObtrHttpClientService]
    });
  });

  it('should be created', inject([ObtrHttpClientService], (service: ObtrHttpClientService) => {
    expect(service).toBeTruthy();
  }));
});
