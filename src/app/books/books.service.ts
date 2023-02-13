import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Book } from './store/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http:HttpClient) { }

  get() {
    return this.http.get<Book[]>("http://localhost:3000/books")
  }
}

// in the service is where you want to create your api call