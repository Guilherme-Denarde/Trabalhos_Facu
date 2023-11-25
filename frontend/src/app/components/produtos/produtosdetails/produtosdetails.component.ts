import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-produtosdetails',
  templateUrl: './produtosdetails.component.html',
  styleUrls: ['./produtosdetails.component.scss']
})
export class ProdutosdetailsComponent implements OnInit {

  @Input() produto: Produto = new Produto();
  @Output() retorno = new EventEmitter<Produto>();

  private produtosService: ProdutosService;

  constructor(produtosService: ProdutosService) {
    this.produtosService = produtosService;
  }

  ngOnInit(): void {
  }

  salvar() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found');
      return;
    }

    this.produtosService.save(this.produto, token).subscribe({
      next: produto => { 
        this.retorno.emit(produto);
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });
  }
}
