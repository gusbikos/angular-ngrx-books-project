import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { invokeBooksAPI } from '../store/books.action';
import { selectBooks } from '../store/books.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private store: Store) {} // inject store in constructor

  books$ = this.store.pipe(select(selectBooks))
  // any variable finishing with a $ is called an observable variable
  // select function is for listening for any changes in the store, and we inject the selector name variable 
  // any change in the store gets pushed to the observable variable books$
  // we use the books$ observable variable to render in our html file

  ngOnInit(): void {
      // on component load we want to invoke API call in ngOnInit function
      this.store.dispatch(invokeBooksAPI())
      // dispatch function invokes a action
  }

}
