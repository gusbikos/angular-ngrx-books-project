import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { BooksService } from "../books.service";
import { booksFetchAPISuccess, invokeBooksAPI } from "./books.action";

@Injectable()
export class BooksEffects {
    constructor(private actions$:Actions, private bookService:BooksService) { }

    loadAllBooks$ = createEffect(() => 
        this.actions$.pipe(
            ofType(invokeBooksAPI),
            switchMap(() => {
                return this.bookService.get()
                .pipe(
                    map((data) => booksFetchAPISuccess({allBooks: data}))
                    // in order to execute and see this data we have to register the EffectModule module -- go to books.module.ts to see
                )
            })
        )
    )
}

// Inside home component I am invoking the invokeBooksAPI that is created in the actions file.  Therefore since its in the ngOnInit
// function it will trigger this action and make the api call which will trigger the effect. 