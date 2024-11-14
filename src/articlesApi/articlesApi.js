import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query";

const urlApi = "https://blog-platform.kata.academy/api/";

export const articlesApi = createApi({
    reducerPath: "articlesApi",
    baseQuery: fetchBaseQuery({baseUrl: urlApi}),
    endpoints: (build) => ({
        fetchArticles: build.query({
            query: (page = 1) => `articles?offset=${page === 1 ? 0 : (page - 1) * 20}`,
        }),
    }),
});

export const { useFetchArticlesQuery } = articlesApi;