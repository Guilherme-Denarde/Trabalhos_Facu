import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { Loginservice } from 'src/app/services/login/loginservice.service';

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
    private router:Router
    ) {}

  // logar() {
  //   if (this.login.username == 'admin' && this.login.password == 'admin') {
  //     localStorage.setItem('authToken', 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW5cbiIsIm91dHJhY29pc2EiOiJ0ZXN0ZSIsImlkIjoiMSIsInVzZXJuYW1lIjoiYWRtaW4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcwMDY5NDE0MywiZXhwIjoxNzAwNjk3NzQzfQ.Q0C90dXmS7gaA8kAYwwd8P6f8vTtCMrq69ezjlUfI8o');
  //     this.roteador.navigate(['admin/produtos']);
  //   } else {
  //     alert('login ou senha incorretos');
  //   }
  // }

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: (response) => {
        localStorage.setItem('authToken', response.token); 
        this.router.navigate(['admin/produtos']);
        console.log('Token: ',response.token);
        
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login ou senha incorretos');
      }
    });
  }
}
