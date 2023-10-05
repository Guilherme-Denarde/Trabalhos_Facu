import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './sistema/login/login.component';
import { IndexComponent } from './layout/index/index.component';
import { PessoaslistComponent } from './pessoas/pessoaslist/pessoaslist.component';
import { PessoasdetailsComponent } from './pessoas/pessoasdetails/pessoasdetails.component';
import { AppComponent } from './app.component';
import { CarrosComponent } from './layout/carros/carros.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: 'full' },
  { path: "login", component: LoginComponent},
  { path: "admin", component: IndexComponent, children: [
    { path: "pessoas", component: PessoaslistComponent},
    { path: "pessoas/novo", component: PessoasdetailsComponent},
    { path: "pessoas/editar/:id", component: PessoasdetailsComponent},
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    CarrosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, 
  ],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
