import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  roteador = inject(Router);

  constructor(private router:Router) {}
  
  token = jwtDecode(localStorage.getItem('authToken') as string);
    
  getUserRole(): string {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token) as any; 
      return decodedToken.role;
    }
    return '';
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']); 
  }
}
