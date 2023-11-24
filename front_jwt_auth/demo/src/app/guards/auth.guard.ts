import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('authToken');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decodedToken = jwtDecode(token) as any;
      const userRole = decodedToken.role;

      // Check if route is restricted by role
      if (route.data['roles'] && route.data['roles'].indexOf(userRole) === -1) {
        // Role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }

      return true;
    } catch (error) {
      localStorage.removeItem('authToken');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
