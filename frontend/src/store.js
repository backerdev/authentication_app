import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { apiSlice } from "./features/apiSlice";
import screenModeReducer from "./features/screenModeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    screenMode: screenModeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
