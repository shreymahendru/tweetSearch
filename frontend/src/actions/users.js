import api from "./../api";
import { userLoggedIn } from "./auth";


const signup = (creds) => (dispatch) =>
    api.user.signup(creds).then(user => {
        localStorage.tweetSearchToken = user.token;
        dispatch(userLoggedIn(user));
    });

export default signup;