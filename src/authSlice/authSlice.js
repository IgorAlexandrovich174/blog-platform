export const authSlice = {
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
}