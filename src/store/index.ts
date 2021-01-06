import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../slices/index";

export const initializeStore = (preloadedState: any = {}) => {
  return configureStore({ reducer: rootReducer, preloadedState });
};

export default initializeStore();
