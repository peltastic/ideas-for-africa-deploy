import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProfileState {
  profile: {
    fname: string;
    lname: string;
    email: string;
    pfp?: string;
  };
}

const initialState: ProfileState = {
  profile: {
    fname: "",
    lname: "",
    email: "",
    pfp: "",
  },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<ProfileState>) => {
      state.profile = action.payload.profile;
    },
  },
});


export const {setProfile} = profileSlice.actions

export default profileSlice.reducer