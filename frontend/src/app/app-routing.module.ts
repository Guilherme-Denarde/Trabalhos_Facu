import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/sistema/login/login.component';
import { IndexComponent } from './components/layout/index/index.component';
import { ProdutoslistComponent } from './components/produtos/produtoslist/produtoslist.component';
import { PedidoslistComponent } from './components/pedidos/pedidoslist/pedidoslist.component';
import { AuthGuard } from './guards/auth.guard'; 

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  {
    path: "admin", 
    canActivate: [AuthGuard], 
    data: { roles: ['ADMIN'] }, 
    component: IndexComponent, 
    children: [
      { path: "produtos", component: ProdutoslistComponent },
    ]
  },
  {
    path: "usuario", 
    canActivate: [AuthGuard],
    data: { roles: ['USER'] },
    component: IndexComponent, 
    children: [
      { path: "pedidos", component: PedidoslistComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
