import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap } from "rxjs";
import { setAPIStatus } from "src/app/shared/store/app.action";
import { Appstate } from "src/app/shared/store/appstate";
import { BooksService } from "../books.service";
import { booksFetchAPISuccess, deleteBookAPISuccess, invokeBooksAPI, invokeDeleteBookAPI, invokeSaveBookAPI, invokeUpdateBookAI, saveBookAPISuccess, updateBookAPISuccess } from "./books.action";

@Injectable()
export class BooksEffects {
    constructor(private actions$: Actions, private bookService: BooksService, private appStore: Store<Appstate>) { } // private appStore of type AppState is using global state in the child module.

    loadAllBooks$ = createEffect(() => 
        this.actions$.pipe(
            ofType(invokeBooksAPI),
            switchMap(() => {
                return this.bookService.get()
                .pipe(map((data) => booksFetchAPISuccess({allBooks: data})) // in order to execute and see this data we have to register the EffectModule module -- go to books.module.ts to see
                )
            })
        )
    )

    saveNewBook$ = createEffect(() => 
        this.actions$.pipe(
            ofType(invokeSaveBookAPI),
            switchMap((action) => {
                this.appStore.dispatch(setAPIStatus({apiStatus: { apiResponseMessage:'', apiStatus: '' }}))
                return this.bookService
                .create(action.payload)
                .pipe(map((data) => {
                    this.appStore.dispatch(setAPIStatus({apiStatus: { apiResponseMessage:'', apiStatus: 'success' }}))
                    return saveBookAPISuccess({ response: data })
                }))
            })
        )
    )

    updateBook$ = createEffect(() => 
        this.actions$.pipe(
            ofType(invokeUpdateBookAI),
            switchMap((action) => {
                this.appStore.dispatch(setAPIStatus({apiStatus: { apiResponseMessage:'', apiStatus: '' }}))
                return this.bookService
                .update(action.payload)
                .pipe(map((data) => {
                    this.appStore.dispatch(setAPIStatus({apiStatus: { apiResponseMessage:'', apiStatus: 'success' }}))
                    return updateBookAPISuccess ({ response: data })
                }))
            })
        )
    )

    deleteBook$ = createEffect(() => 
        this.actions$.pipe(
            ofType(invokeDeleteBookAPI),
            switchMap((action) => {
                this.appStore.dispatch(setAPIStatus({apiStatus: { apiResponseMessage:'', apiStatus: '' }}))
                return this.bookService
                .delete(action.id)
                .pipe(map((data) => {
                    this.appStore.dispatch(setAPIStatus({apiStatus: { apiResponseMessage:'', apiStatus: 'success' }}))
                    return deleteBookAPISuccess ({ id: action.id })
                }))
            })
        )
    )
}

// Inside home component I am invoking the invokeBooksAPI that is created in the actions file.  Therefore since its in the ngOnInit
// function it will trigger this action and make the api call which will trigger the effect. 