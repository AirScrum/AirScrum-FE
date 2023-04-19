import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userRedux";
import refetchReducer from "./refetchReducer";
export default configureStore({
  reducer: {
    loginState: userSlice,
    refetchState: refetchReducer,
  },
});
