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
        resetPassword: ({newPassword, token }) => axios.post(`${version}reset_password`, { newPassword, token })
    },
    // books: {
    //     searchBook: (text) => axios.get(`/api/books/search?q=${text}`).then(res => res.data.books), 
    //     fetchPages: (id) => axios.get(`/api/books/fetchPages?goodreadsId=${id}`).then(res => res.data.pages)
    // }
}   