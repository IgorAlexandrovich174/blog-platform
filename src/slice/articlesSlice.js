// import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
//
// const urlApi = "https://blog-platform.kata.academy/api";

// export const articlesSlice = createSlice({
//     name: "articles",
//     initialState: {
//         articles: [],
//         currentPage: 0,
//         isLoading: false,
//         error: null,
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchArticles.pending, (state) => {
//                 state.isLoading = true;
//                 state.error = null;
//             })
//             .addCase(fetchArticles.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.articles = action.payload.articles;
//                 state.currentPage += 1;
//             })
//             .addCase(fetchArticles.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.error = action.error.message;
//             });
//     },
// })
//
// export const fetchArticles = createAsyncThunk("articles/fetchArticles",
//     async (page = 1) => {
//     const response = await fetch(`${urlApi}/articles?offset=${page === 1 ? 0 : (page - 1) * 20}`);
//     if (!response.ok) throw new Error(`${response.status}`);
//     const result = await response.json();
//     console.log(result);
//     return result;
// })

//
// export default articlesSlice.reducer;
