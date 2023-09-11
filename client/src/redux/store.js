import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

// configureStore combine les reducers pour former le store global.
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
