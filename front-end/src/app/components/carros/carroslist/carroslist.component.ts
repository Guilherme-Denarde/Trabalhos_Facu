import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Carro } from 'src/app/models/carros/carros';
import { CarroService } from 'src/app/services/carros/carros.service';

@Component({
  selector: 'app-carroslist',
  templateUrl: './carroslist.component.html',
  styleUrls: ['./carroslist.component.scss']
})
export class CarroslistComponent {

  lista: Carro[] = [];
  isValidMarca: boolean = true;
  isValidAno: boolean = true;

  carroSelecionadoParaEdicao: Carro = new Carro();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  carroService = inject(CarroService);

  constructor() {
    this.listAll();
  }

  listAll() {
    this.carroService.listAll().subscribe({
      next: lista => {
        this.lista = lista;
      },
      error: erro => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });
  }

  adicionar(modal: any) {
    this.carroSelecionadoParaEdicao = new Carro();
    this.modalService.open(modal, { size: 'sm' });
  }

  editar(modal: any, carro: Carro, indice: number) {
    this.carroSelecionadoParaEdicao = Object.assign({}, carro);
    this.indiceSelecionadoParaEdicao = indice;
    this.modalService.open(modal, { size: 'sm' });
  }

  addOuEditarCarro(carro: Carro) {
    this.validateMarca(carro.marca);
    this.validateAno(carro.ano);

    if (!this.isValidMarca || !this.isValidAno) {
      alert('Por favor, insira dados válidos.');
      return;
    }

    if (carro.id) { 
      this.carroService.edit(carro).subscribe({
          next: editedCarro => {
              this.lista[this.indiceSelecionadoParaEdicao] = editedCarro;
              alert('Carro editado com sucesso!');
          },
          error: erro => {
              alert('Ocorreu um erro ao tentar editar o carro.');
              console.error(erro);
          }
      });
    } else {
      this.carroService.save(carro).subscribe({
          next: savedCarro => {
              this.lista.push(savedCarro);
              alert('Carro adicionado com sucesso!');
          },
          error: erro => {
              alert('Ocorreu um erro ao tentar adicionar o carro.');
              console.error(erro);
          }
      });
    }

    this.modalService.dismissAll();
  }

  delete(id: number, index: number) {
    if (confirm('Você tem certeza de que deseja deletar este carro?')) {
      this.carroService.delete(id).subscribe({
        next: () => {
          this.lista.splice(index, 1);
          alert('Carro deletado com sucesso!');
        },
        error: erro => {
          alert('Ocorreu um erro ao tentar deletar o carro.');
          console.error(erro);
        }
      });
    }
  }

  validateMarca(marca: string): void {
    this.isValidMarca = !!marca; 
  }
  
  validateAno(ano: number): void {
    this.isValidAno = ano > 0; 
  }

}
