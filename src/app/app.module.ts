import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './layout/index/index.component';
import { HeaderComponent } from './layout/header/header.component';
import { PessoaslistComponent } from './pessoas/pessoaslist/pessoaslist.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PessoasdetailsComponent } from './pessoas/pessoasdetails/pessoasdetails.component';
import { LoginComponent } from './sistema/login/login.component';
import { CarrosComponent } from './layout/carros/carros.component';
import { LivrosComponent } from './layout/livros/livros.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    PessoaslistComponent,
    FooterComponent,
    PessoasdetailsComponent,
    LoginComponent,
    CarrosComponent,
    LivrosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
