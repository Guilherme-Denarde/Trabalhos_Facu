import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './sistema/login/login.component';
import { IndexComponent } from './layout/index/index.component';
import { PessoaslistComponent } from './pessoas/pessoaslist/pessoaslist.component';
import { PessoasdetailsComponent } from './pessoas/pessoasdetails/pessoasdetails.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { CarrosComponent } from './layout/carros/carros.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: 'full' },
  { path: "login", component: LoginComponent},
  { path: "admin", component: IndexComponent, children: [
    { path: "pessoas", component: PessoaslistComponent},
    { path: "pessoas/novo", component: PessoasdetailsComponent},
    { path: "pessoas/editar/:id", component: PessoasdetailsComponent},
    { path: "carro", component: CarrosComponent },
  ]},
  { path: "**", component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
