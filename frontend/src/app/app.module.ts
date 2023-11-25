import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { IndexComponent } from './components/layout/index/index.component';
import { LoginComponent } from './components/sistema/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { PedidoslistComponent } from './components/pedidos/pedidoslist/pedidoslist.component';
import { PedidosdetailsComponent } from './components/pedidos/pedidosdetails/pedidosdetails.component';
import { ProdutoslistComponent } from './components/produtos/produtoslist/produtoslist.component';
import { ProdutosdetailsComponent } from './components/produtos/produtosdetails/produtosdetails.component';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    LoginComponent,
    PedidoslistComponent,
    PedidosdetailsComponent,
    ProdutoslistComponent,
    ProdutosdetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    //colocar LoginService e o Interceptor aqui gui-humm, nop
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
