import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || null,
    },
    reducers: {
        logIn: (state, action) => {
            state.token = action.payload;
        },
        logOut: (state) => {
          state.token = null;
        }
    }
})

export const {logIn, logOut} = authSlice.actions;
export default authSlice.reducer;
