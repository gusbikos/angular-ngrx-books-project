import { createAction, props } from "@ngrx/store";
import { Book } from "./book";


export const invokeBooksAPI = createAction(
    "[Books API] invoke books Fetch API" // invokes api call
    // "[Source ] type of the event -- standard naming convention"
)

export const booksFetchAPISuccess = createAction(
    "[Books API] books fetch API success",
    // To pass data to any action we have to use props. Can not directly pass the data so we use props method. the props is the array of books and using props is how you pass down the data.  
    // inside props I pass in a object of the data we want to pass in. That's how we pass data to the action
    props<{allBooks:Book[]}> ()
    // After the action we want to pass the data down to the array
    // We have to store the data into the reducer array. Therefore we have to invoke the reducer.
    // so in the reducer file we add another method call on() and we pass in booksFetchAPISuccess to it.
)

export const invokeSaveBookAPI = createAction(
    "[Books API] invoke save book API",
    props<{payload:Book}> ()
)

export const saveBookAPISuccess = createAction(
    "[Books API] save book API success",
    props<{response:Book}> ()
)

export const invokeUpdateBookAI = createAction(
    "[Books API] invoke update book API",
    props<{payload: Book}> ()
)

export const updateBookAPISuccess = createAction(
    "[Books API] update book API sucess",
    props<{response: Book}> ()
)

export const invokeDeleteBookAPI = createAction(
    "[Books API] invoke delete book API",
    props<{id: number}> ()
)

export const deleteBookAPISuccess = createAction(
    "[Books API] delete book API sucess",
    props<{id: number}> ()
)
