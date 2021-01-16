import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlices";
import dataReducer from "./dataSlices";

export default combineReducers({
  user: userReducer,
  data: dataReducer,
});
