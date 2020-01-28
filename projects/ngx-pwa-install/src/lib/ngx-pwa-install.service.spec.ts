import { TestBed } from '@angular/core/testing';

import { NgxPwaInstallService } from './ngx-pwa-install.service';

describe('NgxPwaInstallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxPwaInstallService = TestBed.get(NgxPwaInstallService);
    expect(service).toBeTruthy();
  });
});
