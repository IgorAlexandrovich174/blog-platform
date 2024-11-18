import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const urlApi = "https://blog-platform.kata.academy/api/";

export const articlesApi = createApi({
    reducerPath: "articlesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: urlApi,
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            console.log(token);
            return headers;
        },}),

    endpoints: (build) => ({
        fetchArticles: build.query({
            query: (page = 1) => `articles?offset=${page === 1 ? 0 : (page - 1) * 20}`,
        }),
        fetchArticleBySlug: build.query({
            query: (slug) => `articles/${slug}`,
        }),

        fetchCurrentUser: build.query({
            query: () => "user/",
        })
        ,
        registerUser: build.mutation({
            query: (body) => ({
                url: "users",
                method: "POST",
                body,
            }),
        }),
        login: build.mutation({
            query:(body) => ({
                url: "users/login",
                method: "POST",
                body,
            })
        })
    }),
});

export const {
    useFetchArticlesQuery,
    useFetchArticleBySlugQuery,
    useRegisterUserMutation,
    useLoginMutation,
    useFetchCurrentUserQuery,
} = articlesApi;