import { configureStore } from "@reduxjs/toolkit";
import {articlesApi} from "../articlesApi/articlesApi.js";

export const store = configureStore({
    reducer: {
        [articlesApi.reducerPath]: articlesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
})
