import Axios from "axios";

export function loginUser(dataToSubmit){
    console.log("지금 어디?")
    const request = Axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)
    console.log("리퀘스트 바등ㅁ")
    return {
        type: "login_user",
        payload: request
    }
  }
  