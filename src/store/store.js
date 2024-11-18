import { configureStore } from "@reduxjs/toolkit";
import {articlesApi} from "../articlesApi/articlesApi.js";
import authSliceReducer from "../authSlice/authSlice.js";

export const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        [articlesApi.reducerPath]: articlesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
})
