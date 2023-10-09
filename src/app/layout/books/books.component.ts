import { Component, OnInit } from '@angular/core';
import { Book } from './books';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'] 
})
export class BooksComponent implements OnInit {

  newBookTitle = '';
  newBookAuthor = '';
  updatedBookTitle = '';
  updatedBookAuthor = '';
  books: Book[] = [];
  bookToUpdate: any;
  showPopup = false;

  constructor() { }

  ngOnInit() {
    const dbRequest = indexedDB.open('booksDatabase', 1);
    dbRequest.onupgradeneeded = event => {
    };
    dbRequest.onsuccess = event => {
    };

    this.fetchBooksFromDB();
  }

  addBook(title: string, author: string) {
    const newBook = new Book(title, author);
    this.books.push(newBook);
  }

  addBookToDB(title: string) {
  }

  updateBookInDB(id: number, newTitle: string) {
  }

  deleteBookFromDB(id: number) {
  }

  fetchBooksFromDB() {
  }

  createBook() {
    if (this.newBookTitle.trim() && this.newBookAuthor.trim()) {
      const newBook = new Book(this.newBookTitle, this.newBookAuthor);
      this.books.push(newBook);
      this.newBookTitle = '';
      this.newBookAuthor = '';
    }
  }

  openUpdatePopup(book: Book) {
    this.bookToUpdate = book;
    this.updatedBookTitle = book.title;
    this.updatedBookAuthor = book.author;
    this.showPopup = true;
  }

  updateBook() {
    if (this.bookToUpdate) {
      this.bookToUpdate.title = this.updatedBookTitle;
      this.bookToUpdate.author = this.updatedBookAuthor;
      this.showPopup = false;
      this.updatedBookTitle = '';
      this.updatedBookAuthor = '';
      this.bookToUpdate = null;
    }
  }

  cancelUpdate() {
    this.showPopup = false;
    this.bookToUpdate = null;
    this.updatedBookTitle = '';
    this.updatedBookAuthor = '';
  }

  deleteBook(id: number) {
    this.books = this.books.filter(book => book.id !== id);
  }
}
