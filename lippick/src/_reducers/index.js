import { combineReducers } from "redux";
import user from "./user_reducers";
import {
    reducer2,
    reducer3,
    reducer4,
    reducer5,
    reducer6,
    reducer7,
    reducer8,
    reducer9,
    reducer10,
    reducer11,
  } from "./store";

const rootReducer = combineReducers({
    user,
    reducer2,
    reducer3,
    reducer4,
    reducer5,
    reducer6,
    reducer7,
    reducer8,
    reducer9,
    reducer10,
    reducer11,
})

export default rootReducer;