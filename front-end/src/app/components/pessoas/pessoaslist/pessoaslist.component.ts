import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pessoa } from 'src/app/models/pessoa';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pessoaslist',
  templateUrl: './pessoaslist.component.html',
  styleUrls: ['./pessoaslist.component.scss']
})
export class PessoaslistComponent {

  lista: Pessoa[] = [];
  isValidNome: boolean = true;
  isValidIdade: boolean = true;

  pessoaSelecionadaParaEdicao: Pessoa = new Pessoa();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  pessoaService = inject(PessoaService);

  constructor() {

    this.listAll();
    //this.exemploErro();

  }


  listAll() {

    this.pessoaService.listAll().subscribe({
      next: lista => { // QUANDO DÁ CERTO
        this.lista = lista;
      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }

  exemploErro() {

    this.pessoaService.exemploErro().subscribe({
      next: lista => { // QUANDO DÁ CERTO
        this.lista = lista;
      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }


  adicionar(modal: any) {
    this.pessoaSelecionadaParaEdicao = new Pessoa();

    this.modalService.open(modal, { size: 'sm' });
  }

  editar(modal: any, pessoa: Pessoa, indice: number) {
    this.pessoaSelecionadaParaEdicao = Object.assign({}, pessoa); //clonando o objeto se for edição... pra não mexer diretamente na referência da lista
    this.indiceSelecionadoParaEdicao = indice;

    this.modalService.open(modal, { size: 'sm' });
  }

  addOuEditarPessoa(pessoa: Pessoa) {
    // Apply validations
    this.validateNome(pessoa.nome);
    this.validateIdade(pessoa.idade);
  
    if (!this.isValidNome || !this.isValidIdade) {
      alert('Please enter valid data.');
      return;
    }
  
    if (pessoa.id) { 
      this.pessoaService.edit(pessoa).subscribe({
          next: editedPessoa => {
              this.lista[this.indiceSelecionadoParaEdicao] = editedPessoa;
              alert('Person edited successfully!');
          },
          error: erro => {
              alert('An error occurred while trying to edit the person.');
              console.error(erro);
          }
      });
    } else {
      this.pessoaService.save(pessoa).subscribe({
          next: savedPessoa => {
              this.lista.push(savedPessoa);
              alert('Person added successfully!');
          },
          error: erro => {
              alert('An error occurred while trying to add the person.');
              console.error(erro);
          }
      });
    }
  
    this.modalService.dismissAll();
  }
  


  delete(id: number, index: number) {
    if (confirm('Are you sure you want to delete this person?')) {
      this.pessoaService.delete(id).subscribe({
        next: () => {
          this.lista.splice(index, 1);
          alert('Person deleted successfully!');
        },
        error: erro => {
          alert('An error occurred while trying to delete the person.');
          console.error(erro);
        }
      });
    }
  }
  validateNome(nome: string): void {
    this.isValidNome = !!nome; 
  }
  
  validateIdade(idade: number): void {
    this.isValidIdade = idade > 0; 
  }
  
}
