import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { id: 1, isLoggedIn: false },
  reducers: {
    SwitchLogin: (state, action) => {

      state.isLoggedIn = !state.isLoggedIn
    }
  },
});

export default authSlice.reducer;
