import { Component, OnInit } from '@angular/core';
import { Carro } from './carros';

@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.scss']
})
export class CarrosComponent implements OnInit {

  newCarroName = '';
  newCarroYear = new Date().getFullYear();
  updatedCarroName = '';
  updatedCarroYear?: number;
  carros: Carro[] = [];
  carroToUpdate: any;
  showPopup = false;

  constructor() { }

  ngOnInit() {
    const dbRequest = indexedDB.open('movementDatabase', 1);
    dbRequest.onupgradeneeded = event => {
    };
    dbRequest.onsuccess = event => {
    };

    this.fetchCarrosFromDB();
  }
  addCarro(name: string, year: number) {
    const newCarro = new Carro(name, year);
    this.carros.push(newCarro);
  }

  addCarroToDB(name: string) {
  }

  updateCarroInDB(id: number, newName: string) {
  }

  deleteCarroFromDB(id: number) {
  }

  fetchCarrosFromDB() {
  }

  createCarro() {
    if (this.newCarroName.trim() && this.newCarroYear) {
      const newCarro = new Carro(this.newCarroName, this.newCarroYear);
      this.carros.push(newCarro);
      this.newCarroName = '';
      this.newCarroYear = new Date().getFullYear();
    }
  }
  
  openUpdatePopup(carro: Carro) {
    this.carroToUpdate = carro;
    this.updatedCarroName = carro.name;
    this.updatedCarroYear = carro.year;
    this.showPopup = true;
  }  

  updateCarro() {
    if (this.carroToUpdate) {
      this.carroToUpdate.name = this.updatedCarroName;
      this.carroToUpdate.year = this.updatedCarroYear;
      this.showPopup = false;
      this.updatedCarroName = '';
      this.updatedCarroYear = undefined;
      this.carroToUpdate = null;
    }
  }
  

  cancelUpdate() {
    this.showPopup = false;
    this.carroToUpdate = null;
    this.updatedCarroName = '';
    this.updatedCarroYear = undefined;
  }
  
  deleteCarro(id: number) {
    this.carros = this.carros.filter(carro => carro.id !== id);
  }  
}
