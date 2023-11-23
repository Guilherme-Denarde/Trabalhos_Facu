// import { Token } from '@angular/compiler';
// import { CanActivateFn } from '@angular/router';
// import { jwtDecode } from 'jwt-decode';

// export const AuthGuard: CanActivateFn = (route, state) => {
//   const isAuthenticated = () => {
//     const token = localStorage.getItem('authToken');
//     return !!token;
//   }

//   const getDecodedAccessToken = (token: string) => {
//     try {
//       return jwtDecode(token);
//     } catch( Erro) {
//       return Erro;
//     }
//   }

//   if (!isAuthenticated()) {
//     return false;
//   }
//   let newToken =localStorage.getItem('authToken');
//   console.log(getDecodedAccessToken(newToken as string));
  
//   return true;
// };
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('authToken');

    if (!token) {
      this.router.navigate(['/login']); 
      return false;
    }

    try {
      const decodedToken = jwtDecode(token) as any; // Replace 'any' with a specific type if possible

      // Check if the route is restricted by role
      if (route.data['roles'] && !route.data['roles'].includes(decodedToken.role)) {
        this.router.navigate(['/']); // Redirect to home or 'access denied' page
        return false;
      }

      return true;
    } catch (error) {
      localStorage.removeItem('authToken'); // Clear invalid token
      this.router.navigate(['/login']);
      return false;
    }
  }
}
