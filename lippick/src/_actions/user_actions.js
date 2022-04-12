import Axios from "axios";

export function loginUser(dataToSubmit){
    const request = Axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)
        console.log("loginUser 액션 ")
    return {
        type: "login_user",
        payload: request
    }
  }

export function registerUser(dataToSubmit){
    const request = Axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)
    return {
        type: "register_user",
        payload: request
    }
}

export function auth(){
    const request = Axios.get('/api/users/auth')
        .then(response => response.data)
    return {
        type: "auth_user",
        payload: request
    }
}
