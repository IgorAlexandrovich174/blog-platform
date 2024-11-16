import React from 'react';
import ArticleCard from "../../components/ArticleCard/ArticleCard.jsx";
import {Container} from "@mui/material";
import {useFetchArticlesQuery} from "../../articlesApi/articlesApi.js";
import {useParams} from "react-router-dom";

export default function ArticlePage() {
    const {slug} = useParams();
    const {data} = useFetchArticlesQuery();
    const article = data?.articles?.find((art) => art.slug === slug);
    console.log("Article", article);
    return (
        <Container className={"container"}>
            <ArticleCard article={article} isFullPage={true}/>
        </Container>
    );
}
