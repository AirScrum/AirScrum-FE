import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userRedux";

export default configureStore({
  reducer: {
    loginState: userSlice
  }
});
