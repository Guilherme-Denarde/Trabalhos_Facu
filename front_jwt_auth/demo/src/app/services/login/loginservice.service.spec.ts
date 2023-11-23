import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { Loginservice } from './loginservice.service';

describe('LoginserviceService', () => {
  let service: Loginservice;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Loginservice],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    service = TestBed.inject(Loginservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
