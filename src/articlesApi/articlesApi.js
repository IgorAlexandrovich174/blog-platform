import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const urlApi = "https://blog-platform.kata.academy/api/";

export const articlesApi = createApi({
    reducerPath: "articlesApi",
    tagTypes: ['User', 'Article', 'Feed'],
    baseQuery: fetchBaseQuery({
        baseUrl: urlApi,
        prepareHeaders: (headers, {getState}) => {
            const token = getState().auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),

    endpoints: (build) => ({
        fetchArticles: build.query({
            query: (page = 1) => `articles?offset=${page === 1 ? 0 : (page - 1) * 20}`,
        }),
        fetchArticleBySlug: build.query({
            query: (slug) => `articles/${slug}`,
        }),
        fetchCurrentUser: build.query({
            query: () => "user/",
            providesTags: ["User"],
        }),
        registerUser: build.mutation({
            query: (body) => ({
                url: "users",
                method: "POST",
                body,
            }),
        }),
        login: build.mutation({
            query: (body) => ({
                url: "users/login",
                method: "POST",
                body,
            }),
            invalidatesTags: ['User'],
        }),
        updateUserProfile: build.mutation({
            query: (body) => ({
                url: "user",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useFetchArticlesQuery,
    useFetchArticleBySlugQuery,
    useRegisterUserMutation,
    useLoginMutation,
    useFetchCurrentUserQuery,
    useUpdateUserProfileMutation,
} = articlesApi;