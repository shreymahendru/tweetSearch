import { USER_LOGGED_IN, USER_LOGGED_OUT } from "./../types";
import api from "../api";
import addAuthorizationHeader from "./../utils/addAuthorizationHeader";

export const userLoggedIn = (user) => ({
    type: USER_LOGGED_IN,
    user
});

export const login = (userInfo) => (dispatch) =>
    api.user.login(userInfo).then(user => {
        localStorage.tweetSearchToken = user.token;
        addAuthorizationHeader(localStorage.tweetSearchToken);
        dispatch(userLoggedIn(user))
    });
   
export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
})    
    
export const logout = () => (dispatch) => {
    localStorage.removeItem("tweetSearchToken");
    addAuthorizationHeader(); // remove auth token from axios
    dispatch(userLoggedOut());   
};       

export const confirm = token => dispatch =>
    api.user.confirm(token).then(user => {
        localStorage.tweetSearchToken = user.token;
        dispatch(userLoggedIn(user));
    });

export const resetPasswordRequest = ({ email }) => () => api.user.resetPasswordRequest(email);

export const validateToken = token => () => api.user.validateToken(token);

export const resetPassword = data => () => api.user.resetPassword(data); 