import { createReducer, on } from "@ngrx/store";
import { Book } from "./book";
import { booksFetchAPISuccess, deleteBookAPISuccess, saveBookAPISuccess, updateBookAPISuccess } from "./books.action";

export const initialState: ReadonlyArray<Book> = [  // read only array so i dont change the values directly.
]

export const bookReducer = createReducer(
    initialState, // takes in the intial state which is the array of books
    
    // here we register our action in order to change the state of the store
    on(booksFetchAPISuccess, (state, { allBooks }) => { // allBooks is the payload data we are sending to the action
        return allBooks
        }
    ),
    // First parameter we pass in the action that will trigger the state change which is booksFetchAPISuccess.
    // The second property we pass is "state" which is originally initialState and the data thats already in the current state.
    // The payload that we are sending to the action is allBooks.  That object should be the 3rd parameter.
    //  Then we return the new state of allBooks.  And it gets pushed in as the new state.
    // Associates actions with a given state change function. A state change function must be provided as the last parameter.
    on(saveBookAPISuccess, (state, {response}) => {
        let newState = [...state]
        newState.unshift(response)
        return newState
        // in this on method I am taking the successful book addition and updating it with the current state.  Then I push in the newly created book at the beginning of my new array and returning the new state.
    }),
    on(updateBookAPISuccess, (state, {response}) => {
        let newState = state.filter(_ => _.id !== response.id)
        newState.unshift(response)
        return newState
    }),
    on(deleteBookAPISuccess, (state, {id}) => {
        let newState = state.filter(_ => _.id !== id)
        return newState
    })
)
