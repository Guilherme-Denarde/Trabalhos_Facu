import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Pedido } from 'src/app/models/pedido';
import { Produto } from 'src/app/models/produto';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-pedidosdetails',
  templateUrl: './pedidosdetails.component.html',
  styleUrls: ['./pedidosdetails.component.scss']
})
export class PedidosdetailsComponent {

  @Input() pedido: Pedido = new Pedido();
  @Output() retorno = new EventEmitter<Pedido>();

  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;

  pedidosService = inject(PedidosService);


  constructor() {

  }

  salvar() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found');
      return;
    }

    this.pedidosService.save(this.pedido, token).subscribe({
      next: (response) => {
        console.log('Pedido saved successfully', response);
        this.retorno.emit(response); 
      },
      error: (error) => {
        console.error('Error saving pedido', error);
        alert('Error saving pedido');
      }
    });
  }


  excluir(produto: Produto, indice: number) {

    this.pedido.produtos.splice(indice,1);
    
  }

  retornoProdutosList(produto: Produto) {

    if (this.pedido.produtos == null)
      this.pedido.produtos = [];

    this.pedido.produtos.push(produto);
    this.modalRef.dismiss();
}


  lancar(modal: any) {
    this.modalRef = this.modalService.open(modal, { size: 'lg' });
  }

}
