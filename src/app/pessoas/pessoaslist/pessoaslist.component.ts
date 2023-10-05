import { Component } from '@angular/core';
import { Pessoa } from '../pessoa';

@Component({
  selector: 'app-pessoaslist',
  templateUrl: './pessoaslist.component.html',
  styleUrls: ['./pessoaslist.component.scss']
})
export class PessoaslistComponent {

  lista: Pessoa[] = [];


  constructor(){

    this.lista.push(new Pessoa("Wellington", 33));
    this.lista.push(new Pessoa("Wellington", 29));
    this.lista.push(new Pessoa("Wellington", 35));
    this.lista.push(new Pessoa("Wellington", 60));
    this.lista.push(new Pessoa("Wellington", 10));
    this.lista.push(new Pessoa("Wellington", 40));

  }


}
