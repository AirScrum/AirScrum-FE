import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "loginState",
  initialState: {
    loginState: false
  },
  reducers: {
    login:(state) => {
        state.loginState = true
    },
    logout:(state) => {
        state.loginState = false
    }
  }
});

// Action creators are generated for each case reducer function
export const { login,logout } = userSlice.actions;

export default userSlice.reducer;
