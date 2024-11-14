import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import {store} from "./store/store.js";
import {Provider} from "react-redux";
import ArticlePage from "./pages/ArticlePage/ArticlePage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/articles/:slug" element={<ArticlePage />} />
        </Route>
    )
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </StrictMode>
)
