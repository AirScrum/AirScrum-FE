import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const refetchSlice = createSlice({
  name: "refetch",
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
  },
});

export const { increment, decrement, incrementByAmount } = refetchSlice.actions;
export default refetchSlice.reducer;
