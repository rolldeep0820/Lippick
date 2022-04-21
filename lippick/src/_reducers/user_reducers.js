

export default function user(state = {}, action){
      switch (action.type) {
        case "login_user":
          console.log("login_user case")
          return { ...state, loginSuccess: action.payload }
        case "register_user":
          return { ...state, register: action.payload }
        case "auth_user":
          return { ...state, userData: action.payload }
        case "add_to_cart":
          return { ...state, userData: {
              ...state.userData,
              cart: action.payload
          } }
        case "get_cart_items":
          return { ... state , cartDetail: action.payload }
        case "remove_cart_item":
          return { ... state , cartDetail: action.payload.productInfo,
                  userData: {
                    ...state.userData,
                    cart: action.payload.cart
                  } }
        default:
        return state;
      }
    
   }
