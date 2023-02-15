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

  books$ = this.store.pipe(select(selectBooks))
  // any variable finishing with a $ is called an observable variable
  // select function is for listening for any changes in the store, and we inject the selector name variable 
  // any change in the store gets pushed to the observable variable books$
  // we use the books$ observable variable to render in our html file
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
