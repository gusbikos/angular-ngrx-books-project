import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Book } from "./book";


export const selectBooks = createFeatureSelector<Book[]>("mybooks")

export const selectBookById = (bookId: number) => {
    return createSelector(selectBooks, (books:Book[]) => {// first param = feature selector, which is grabbing all the books in the Book array and injecting them into the arrow function. createSelector = selecting a specific element from state-- does no accept any input parameter but we want to filter some type of data.
        let bookById = books.filter(_ => _.id == bookId) // _ is just a placeholder
        if(bookById.length == 0) {
            return null
        }
        return bookById[0] // returns the specific id we are looking for and returning only 1 element of the book array.
    }
    )
}