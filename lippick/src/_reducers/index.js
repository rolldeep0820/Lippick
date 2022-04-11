import { combineReducers } from "redux";
import user from "./user_reducers";
import {
    reducer1,
    reducer2,
    reducer3,
    reducer4,
    reducer5,
    reducer6,
    reducer7,
    reducer8,
    reducer9,
    reducer10,
  } from "./store";

const rootReducer = combineReducers({
    user,
    reducer1,
    reducer2,
    reducer3,
    reducer4,
    reducer5,
    reducer6,
    reducer7,
    reducer8,
    reducer9,
    reducer10,
})

export default rootReducer;