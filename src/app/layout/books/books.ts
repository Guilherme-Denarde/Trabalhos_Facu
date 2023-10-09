export class Book {
    id: number;
    title: string;
    author: string;
  
    constructor(title: string, author: string) {
      this.id = Math.floor(Math.random() * 100000);
      this.title = title;
      this.author = author;
    }
  }
  