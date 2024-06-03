import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  authStatus: "LOGGED_IN" | "LOGGED_OUT";
}

const initialState: AuthState = {
  authStatus: "LOGGED_OUT",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (
      state,
      action: PayloadAction<"LOGGED_IN" | "LOGGED_OUT">
    ) => {
      state.authStatus = action.payload;
    },
  },
});


export const {setAuthState} = authSlice.actions

export default authSlice.reducer