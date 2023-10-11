import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Livro } from 'src/app/models/livros/livros';
import { LivroService } from 'src/app/services/livros/livros.service';

@Component({
  selector: 'app-livroslist',
  templateUrl: './livroslist.component.html',
  styleUrls: ['./livroslist.component.scss']
})
export class LivroslistComponent {

  lista: Livro[] = [];
  isValidTitulo: boolean = true;
  isValidAutor: boolean = true;

  livroSelecionadoParaEdicao: Livro = new Livro();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  livroService = inject(LivroService);

  constructor() {
    this.listAll();
  }

  listAll() {
    this.livroService.listAll().subscribe({
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
    this.livroSelecionadoParaEdicao = new Livro();
    this.modalService.open(modal, { size: 'sm' });
  }

  editar(modal: any, livro: Livro, indice: number) {
    this.livroSelecionadoParaEdicao = Object.assign({}, livro);
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: 'sm' });
  }

  addOuEditarLivro(livro: Livro) {
    this.validateTitulo(livro.titulo);
    this.validateAutor(livro.autor);

    if (!this.isValidTitulo || !this.isValidAutor) {
      alert('Por favor, insira dados válidos.');
      return;
    }

    if (livro.id) {
      this.livroService.edit(livro).subscribe({
        next: editedLivro => {
          this.lista[this.indiceSelecionadoParaEdicao] = editedLivro;
          alert('Livro editado com sucesso!');
        },
        error: erro => {
          alert('Ocorreu um erro ao tentar editar o livro.');
          console.error(erro);
        }
      });
    } else {
      this.livroService.save(livro).subscribe({
        next: savedLivro => {
          this.lista.push(savedLivro);
          alert('Livro adicionado com sucesso!');
        },
        error: erro => {
          alert('Ocorreu um erro ao tentar adicionar o livro.');
          console.error(erro);
        }
      });
    }

    this.modalService.dismissAll();
  }

  delete(id: number, index: number) {
    if (confirm('Você tem certeza que deseja deletar este livro?')) {
      this.livroService.delete(id).subscribe({
        next: () => {
          this.lista.splice(index, 1);
          alert('Livro deletado com sucesso!');
        },
        error: erro => {
          alert('Ocorreu um erro ao tentar deletar o livro.');
          console.error(erro);
        }
      });
    }
  }

  validateTitulo(titulo: string): void {
    this.isValidTitulo = !!titulo;
  }

  validateAutor(autor: string): void {
    this.isValidAutor = !!autor;
  }
}
