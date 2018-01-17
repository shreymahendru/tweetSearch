import api from "./../api";

export const searchBook = (text) => () =>
    api.books.searchBook(text).then(books => books);

export const fetchPages = (id) => () =>
    api.books.fetchPages(id).then(pages => pages);