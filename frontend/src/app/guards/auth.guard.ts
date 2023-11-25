import { CanActivateFn, Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

export const AuthGuard = (router: Router): CanActivateFn => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  };

  const redirectToPathBasedOnRole = (role: string) => {
    if (role === 'ADMIN') {
      router.navigate(['/admin/produtos']);
    } else if (role === 'USER') {
      router.navigate(['/usuario/pedidos']);
    }
  };

  return (route, state) => {
    if (!isAuthenticated()) {
      router.navigate(['/login']);
      return false;
    }

    const token = localStorage.getItem('authToken');
    try {
      const decodedToken = jwtDecode<any>(token as string); 
      console.log(decodedToken);

      redirectToPathBasedOnRole(decodedToken.role);
      return true;
    } catch (error) {
      localStorage.removeItem('authToken');
      router.navigate(['/login']);
      return false;
    }
  };
};