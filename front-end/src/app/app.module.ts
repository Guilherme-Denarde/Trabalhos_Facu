import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PessoaslistComponent } from './components/pessoas/pessoaslist/pessoaslist.component';
import { PessoasdetailsComponent } from './components/pessoas/pessoasdetails/pessoasdetails.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { IndexComponent } from './components/layout/index/index.component';
import { LoginComponent } from './components/sistema/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CarrosdetailsComponent } from './components/carros/carrosdetails/carrosdetails.component';
import { LivrosdetailsComponent } from './components/livros/livrosdetails/livrosdetails.component';
import { LivroslistComponent } from './components/livros/livroslist/livroslist.component';
import { CarroslistComponent } from './components/carros/carroslist/carroslist.component';

@NgModule({
  declarations: [
    AppComponent,
    PessoaslistComponent,
    PessoasdetailsComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    LoginComponent,
    CarroslistComponent,
    CarrosdetailsComponent,
    LivrosdetailsComponent,
    LivroslistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
