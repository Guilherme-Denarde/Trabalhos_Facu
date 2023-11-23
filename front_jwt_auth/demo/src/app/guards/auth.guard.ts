import { Token } from '@angular/compiler';
import { CanActivateFn } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  const getDecodedAccessToken = (token: string) => {
    try {
      return jwtDecode(token);
    } catch( Erro) {
      return Erro;
    }
  }

  if (!isAuthenticated()) {
    return false;
  }
  let newToken =localStorage.getItem('authToken');
  console.log(getDecodedAccessToken(newToken as string));
  
  return true;
};
