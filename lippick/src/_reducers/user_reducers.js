

export default function user(state = {}, action){
      switch (action.type) {
        case "login_user":
          console.log("login_user case")
          return { ...state, loginSuccess: action.payload }
        case "register_user":
          return { ...state, register: action.payload }
        case "auth_user":
          return { ...state, userData: action.payload }

        default:
        return state;
      }
    
   }
