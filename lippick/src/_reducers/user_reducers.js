

export default function user(state = {}, action){
      switch (action.type) {
        case "login_user":
          return { ...state, loginSuccess: action.payload }
        case "register_user":
          return { ...state, register: action.payload }

        default:
        return state;
      }
    
   }
