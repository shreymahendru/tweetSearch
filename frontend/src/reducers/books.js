import { createSelector } from "reselect";

export default function books(state = {}, action = {}) {
    switch (action.type) {
        
        default: return state
    }
}


// Selctors

export const booksSelector = state => state.books;


export const allBooksSelector = createSelector(
    booksSelector, 
    (booksHash) => Object.values(booksHash)
);