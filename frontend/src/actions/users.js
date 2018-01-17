import api from "./../api";
import { userLoggedIn } from "./auth";
import addAuthorizationHeader from "./../utils/addAuthorizationHeader";


const signup = (creds) => (dispatch) =>
    api.user.signup(creds).then(user => {
        localStorage.tweetSearchToken = user.token;
        localStorage.tweetSearchId = user.id;
        addAuthorizationHeader(user.token);
        dispatch(userLoggedIn(user));
    });

export default signup;