import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NotisState {
  showIndicator: boolean;
}

const initialState: NotisState = {
  showIndicator: false,
};

export const notisSlice = createSlice({
  name: "notis",
  initialState,
  reducers: {
    setShowIndicator: (state, action: PayloadAction<boolean>) => {
      state.showIndicator = action.payload;
    },
  },
});

export const { setShowIndicator } = notisSlice.actions;

export default notisSlice.reducer;
