

export default function user(state = {}, action){
      switch (action.type) {
        case "login_user":
          console.log("login_user")
        return { ...state, loginSuccess: action.payload }

        default:
        return state;
      }
    
   }
