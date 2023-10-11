import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Carro } from 'src/app/models/carros/carros';  
import { CarroService } from 'src/app/services/carros/carros.service'; 

@Component({
  selector: 'app-carrosdetails',
  templateUrl: './carrosdetails.component.html',
  styleUrls: ['./carrosdetails.component.scss']
})
export class CarrosdetailsComponent {

  @Input() carro: Carro = new Carro();  
  @Output() retorno = new EventEmitter<Carro>(); 

  carroService = inject(CarroService);  


  constructor() {

  }

  salvar() {

    this.carroService.save(this.carro).subscribe({  
      next: carro => { 
        this.retorno.emit(carro);
      },
      error: erro => { 
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });
  }
}
