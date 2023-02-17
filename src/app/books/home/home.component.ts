import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { invokeBooksAPI, invokeDeleteBookAPI } from '../store/books.action';
import { selectBooks } from '../store/books.selector';

declare let window: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private store: Store, private appStore: Store<Appstate>) {} // inject store in constructor

/* selectBooks: This is a selector function defined in the ngrx store. It selects a specific slice of the store, in this case, the slice of state that contains information about books.
this.store: This is an instance of the Store class in ngrx. The store is a central repository for state in an ngrx application.
select: This is a function provided by ngrx that takes a selector function as an argument and returns an observable that emits the selected state whenever the state changes.
pipe: This is a method on the Observable class that allows for the chaining of multiple operators to manipulate the data emitted by the observable.
books$: This is a variable that holds the observable that emits the selected state, in this case, the books from the store.
So, in summary, the books$ variable is an observable that emits the selected books from the ngrx store. By using the pipe method, you can chain multiple operators to transform the emitted data, such as filtering, mapping, or sorting.
*/

  books$ = this.store.pipe(select(selectBooks))
  deleteModal : any 
  idToDelete: number = 0

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById("deleteModal")
    )

    // on component load we want to invoke API call in ngOnInit function
    this.store.dispatch(invokeBooksAPI())
    // dispatch function invokes a action
  }

  openDeleteModal(id: number) { // method to open modal popup
    this.idToDelete = id
    this.deleteModal.show()
  }

  confirmDelete() {
    this.store.dispatch(invokeDeleteBookAPI({id: this.idToDelete}))
    let appStatus$ = this.appStore.pipe(select(selectAppState))
    appStatus$.subscribe((data) => {
      if (data.apiStatus === 'success') {
        this.appStore.dispatch(setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } }))
        this.deleteModal.hide()
      }
    })
  }

}
