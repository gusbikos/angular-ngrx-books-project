import { createReducer, on } from "@ngrx/store";
import { Book } from "./book";
import { booksFetchAPISuccess } from "./books.action";

export const initialState: ReadonlyArray<Book> = [
]

export const bookReducer = createReducer(
    initialState,
    // here we register our action in order to change the state of the store
    on(booksFetchAPISuccess, (state, { allBooks }) => { // allBooks is the payload data we are sending to the action
        return allBooks
        }
    )
    // First parameter we pass in the action that will trigger the state change which is booksFetchAPISuccess.
    // The second property we pass is "state" which is originally initialState and the data thats already in the current state.
    // The payload that we are sending to the action is allBooks.  That object should be the 3rd parameter.
    //  Then we return the new state of allBooks.  And it gets pushed in as the new state.
    // Associates actions with a given state change function. A state change function must be provided as the last parameter.
)
