import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard = TestBed.inject(AuthGuard);
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule], //SE O COMPONENTE INVOCA ALGUM SERVICE, INCLUÍMOS ESSA DEPENDÊNCIA DE HTTP DE TESTE
      declarations: [AuthGuard],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        AuthGuard, 
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to login if not authenticated', fakeAsync(() => {
    localStorage.removeItem('authToken'); 
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    // canActivate might be async, so wrap in fakeAsync
    const result = guard.canActivate(route, state);
    tick(); // Simulate passage of time for async operations

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));

});
