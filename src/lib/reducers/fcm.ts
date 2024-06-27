import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: {
    fcm: string
} = {
    fcm: ""
}


export const fcmSlice = createSlice({
    name: "fcm",
    initialState,
    reducers: {
        setFCM: (state, action: PayloadAction<{
            fcm: string
        }> ) => {
            state.fcm = action.payload.fcm
        }
    }
})


export const {setFCM} = fcmSlice.actions


export default fcmSlice.reducer