import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { Loginservice } from 'src/app/services/login/loginservice.service';
import { jwtDecode } from 'jwt-decode'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login: Login = new Login();
  roteador = inject(Router);

  constructor(
    private loginService: Loginservice,
    private router: Router
  ) {}

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: (response) => {
        
        localStorage.setItem('authToken', response.token);
        console.log(response.token);
        this.navigateBasedOnRole(response.token);
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login ou senha incorretos');
      }
    });
  }

  private navigateBasedOnRole(token: string) {
    try {
      const decodedToken = jwtDecode(token) as any; 
      const userRole = decodedToken.role;

      if (userRole === 'ADMIN') {
        this.router.navigate(['/admin/produtos']);
      } else if (userRole === 'USER') {
        this.router.navigate(['/usuario/pedidos']);
      } else {
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
}
