import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.scss']
})
export class CarrosComponent {
  @Input() nome: string = '';
  @Input() ano: number = 0;

  @Output() nomeChange = new EventEmitter<string>();
  @Output() anoChange = new EventEmitter<number>();

  onNomeChange(newValue: string) {
    this.nome = newValue;
    this.nomeChange.emit(this.nome);
  }

  onAnoChange(newValue: number) {
    this.ano = newValue;
    this.anoChange.emit(this.ano);
  }
}
