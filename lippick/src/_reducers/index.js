import { combineReducers } from "redux";
import user from "./user_reducers";
import {
    navTG,
    reducer1,
    reducer2,
    reducer3,
    reducer4,
    reducer5,
    reducer6,
    reducer7
  } from "./store";

const rootReducer = combineReducers({
    user,
    navTG,
    reducer1,
    reducer2,
    reducer3,
    reducer4,
    reducer5,
    reducer6,
    reducer7
})

export default rootReducer;