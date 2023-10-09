export class Carro {
  id: number;
  name: string;
  year: number;

  constructor(name: string, year: number) {
    this.id = Math.floor(Math.random() * 100000);
    this.name = name;
    this.year = year;
  }
}
