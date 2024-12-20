import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import {store} from "./store/store.js";
import {Provider} from "react-redux";
import ArticlePage from "./pages/ArticlePage/ArticlePage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import EditProfile from "./components/EditProfile/EditProfile.jsx";

import RequireAuth from "./components/RequireAuth/RequireAuth.jsx";
import NewArticlePage from "./pages/NewArticlePage/NewArticlePage.jsx";
import EditArticlePage from "./pages/EditArticlePage/EditArticlePage.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />}/>
            <Route path="/articles/:slug" element={<ArticlePage />}/>
            <Route path="/sign-up" element={<RegisterPage />}/>
            <Route path="/sign-in" element={<LoginPage />}/>
            <Route path="/new-article" element={
                <RequireAuth>
                    <NewArticlePage />
                </RequireAuth>} />
            <Route path="/profile" element={<EditProfile />}/>
            <Route path="/articles/:slug/edit" element={<EditArticlePage />} />
        </Route>
    )
);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </StrictMode>
)
