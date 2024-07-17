import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RouteState {
  currentLink: string;
}

const initialState: RouteState = {
  currentLink: "",
};

export const routeSlice = createSlice({
  name: "route",
  initialState,
  reducers: {
    setCurrentLink: (state, action: PayloadAction<string>) => {
      state.currentLink = action.payload;
    },
  },
});

export const { setCurrentLink } = routeSlice.actions;

export default routeSlice.reducer;
