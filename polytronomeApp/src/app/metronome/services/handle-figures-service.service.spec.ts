import { TestBed } from '@angular/core/testing';

import { HandleFiguresServiceService } from './handle-figures-service.service';

describe('HandleFiguresServiceService', () => {
  let service: HandleFiguresServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleFiguresServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
