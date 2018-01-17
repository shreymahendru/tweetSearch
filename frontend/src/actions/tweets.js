import api from "./../api";

export const searchTweet = (text) => () =>
    api.tweet.search(text).then(tweets => tweets);
    
export const nMostSearched = (n) => () =>
    api.tweet.mostSearched(n).then(terms => terms);
 
export const userHistory = (userId) => () =>
    api.tweet.userHistory(userId).then(terms => terms);