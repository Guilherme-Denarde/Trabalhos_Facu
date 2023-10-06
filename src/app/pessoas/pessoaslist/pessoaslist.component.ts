import { Component, inject } from '@angular/core';
import { Pessoa } from '../pessoa';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pessoaslist',
  templateUrl: './pessoaslist.component.html',
  styleUrls: ['./pessoaslist.component.scss']
})
export class PessoaslistComponent {

  lista: Pessoa[] = [];

  modalService = inject(NgbModal);


  constructor(){

    this.lista.push(new Pessoa("Wellington", 33));
    this.lista.push(new Pessoa("Wellington", 29));
    this.lista.push(new Pessoa("Wellington", 35));
    this.lista.push(new Pessoa("Wellington", 60));
    this.lista.push(new Pessoa("Wellington", 10));
    this.lista.push(new Pessoa("Wellington", 40));

  }


  abrirModal(abc: any){
    this.modalService.open(abc, { size: 'lg' });
  }

  addNaLista(pessoa: Pessoa){
    this.lista.push(pessoa);
    this.modalService.dismissAll();
  }


}
