import axios from "axios";

const version = "/api/v1/";

export default {
    user: {
        login: (creds) => axios.post(`${version}login`, { email: creds.email, password: creds.password }).then(res => res.data),
        signup: (userInfo) => axios.post(`${version}signup`, { 
            name: userInfo.name,
            email: userInfo.email,
            password: userInfo.password
         }).then(res => res.data),
        confirm: confirmationToken => axios.post(`${version}confirmation_email`, { confirmationToken }).then(res => res.data),
        resetPasswordRequest: email => axios.post(`${version}reset_password_request`, { email }),
        validateToken: token => axios.post(`${version}validate_token`, { token }), 
        resetPassword: data => axios.post(`${version}reset_password`, { newPassword: data.newPassword, token: data.token })
    },
    tweet: {
        search: (text) => axios.get(`${version}tweet/search?$search=${encodeURIComponent(text)}`).then(res => { console.log(res.data); return res.data}), 
        mostSearched: (n) => axios.get(`${version}tweet/most_searched?$count=${n}`).then(res => res.data),
        userHistory: (userId) => axios.get(`${version}tweet/search_history?$user_id=${userId}`).then(res => res.data)
    }
}   